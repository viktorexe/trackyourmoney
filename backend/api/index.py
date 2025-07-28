from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET', 'dev-jwt-secret-change-in-production')
MONGODB_URI = os.environ.get('MONGODB_URI', 'mongodb+srv://financeuser:SecurePass2024@financetracker.mongodb.net/finance?retryWrites=true&w=majority')

# MongoDB connection
try:
    client = pymongo.MongoClient(MONGODB_URI)
    db = client['finance']
    users_collection = db['users']
    print("Connected to MongoDB")
except Exception as e:
    print(f"MongoDB connection error: {e}")

# Auth decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = users_collection.find_one({'username': data['username']})
            if not current_user:
                return jsonify({'message': 'Invalid token'}), 401
        except:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'message': 'Username and password required'}), 400
        
        if len(username) < 3:
            return jsonify({'message': 'Username must be at least 3 characters'}), 400
        
        if len(password) < 6:
            return jsonify({'message': 'Password must be at least 6 characters'}), 400
        
        # Check if user exists
        if users_collection.find_one({'username': username}):
            return jsonify({'message': 'Username already exists'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Create user
        user_data = {
            'username': username,
            'password': hashed_password,
            'created_at': datetime.utcnow(),
            'settings': {
                'language': 'en',
                'currency': 'INR'
            }
        }
        
        users_collection.insert_one(user_data)
        
        # Create user's transaction collection
        user_collection_name = f"user_{username}_transactions"
        db.create_collection(user_collection_name)
        
        return jsonify({'message': 'User created successfully'}), 201
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'message': 'Username and password required'}), 400
        
        # Find user
        user = users_collection.find_one({'username': username})
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Generate token
        token = jwt.encode({
            'username': username,
            'exp': datetime.utcnow() + timedelta(days=30)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'username': username,
                'settings': user.get('settings', {})
            }
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

@app.route('/api/verify', methods=['GET'])
@token_required
def verify_token(current_user):
    return jsonify({
        'user': {
            'username': current_user['username'],
            'settings': current_user.get('settings', {})
        }
    }), 200

@app.route('/api/transactions', methods=['GET'])
@token_required
def get_transactions(current_user):
    try:
        user_collection_name = f"user_{current_user['username']}_transactions"
        user_collection = db[user_collection_name]
        
        transactions = list(user_collection.find({}, {'_id': 0}).sort('date', -1))
        
        return jsonify({'transactions': transactions}), 200
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

@app.route('/api/transactions', methods=['POST'])
@token_required
def add_transaction(current_user):
    try:
        data = request.get_json()
        
        # Validate data
        transaction_type = data.get('type')
        amount = data.get('amount')
        description = data.get('description', '').strip()
        
        if transaction_type not in ['income', 'expense']:
            return jsonify({'message': 'Invalid transaction type'}), 400
        
        if not amount or amount <= 0:
            return jsonify({'message': 'Amount must be greater than 0'}), 400
        
        if not description:
            return jsonify({'message': 'Description is required'}), 400
        
        # Create transaction
        transaction = {
            'type': transaction_type,
            'amount': float(amount),
            'description': description,
            'date': data.get('date', datetime.utcnow().isoformat()),
            'created_at': datetime.utcnow()
        }
        
        # Save to user's collection
        user_collection_name = f"user_{current_user['username']}_transactions"
        user_collection = db[user_collection_name]
        user_collection.insert_one(transaction.copy())
        
        # Remove MongoDB _id for response
        transaction.pop('created_at', None)
        
        return jsonify({'transaction': transaction}), 201
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

@app.route('/api/stats', methods=['GET'])
@token_required
def get_stats(current_user):
    try:
        user_collection_name = f"user_{current_user['username']}_transactions"
        user_collection = db[user_collection_name]
        
        # Calculate stats
        income_pipeline = [
            {'$match': {'type': 'income'}},
            {'$group': {'_id': None, 'total': {'$sum': '$amount'}}}
        ]
        
        expense_pipeline = [
            {'$match': {'type': 'expense'}},
            {'$group': {'_id': None, 'total': {'$sum': '$amount'}}}
        ]
        
        income_result = list(user_collection.aggregate(income_pipeline))
        expense_result = list(user_collection.aggregate(expense_pipeline))
        
        total_income = income_result[0]['total'] if income_result else 0
        total_expense = expense_result[0]['total'] if expense_result else 0
        balance = total_income - total_expense
        
        return jsonify({
            'income': total_income,
            'expense': total_expense,
            'balance': balance
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True)