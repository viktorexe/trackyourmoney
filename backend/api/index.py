from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pymongo
import bcrypt
import os
from datetime import datetime
from functools import wraps
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = 'simple-session-key'
MONGODB_URI = os.environ.get('MONGODB_URI')

if not MONGODB_URI:
    raise ValueError("MONGODB_URI environment variable is required")

# MongoDB connection
try:
    client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
    # Test connection
    client.server_info()
    db = client['finance']
    users_collection = db['users']
    print("Connected to MongoDB successfully")
except Exception as e:
    print(f"MongoDB connection error: {e}")
    raise e

# Auth decorator
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        username = session.get('username')
        if not username:
            return jsonify({'message': 'Login required'}), 401
        
        current_user = users_collection.find_one({'username': username})
        if not current_user:
            return jsonify({'message': 'Invalid session'}), 401
        
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
        
        # Set session
        session['username'] = username
        
        return jsonify({
            'user': {
                'username': username,
                'settings': user.get('settings', {})
            }
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

@app.route('/api/verify', methods=['GET'])
@login_required
def verify_session(current_user):
    return jsonify({
        'user': {
            'username': current_user['username'],
            'settings': current_user.get('settings', {})
        }
    }), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/transactions', methods=['GET'])
@login_required
def get_transactions(current_user):
    try:
        user_collection_name = f"user_{current_user['username']}_transactions"
        user_collection = db[user_collection_name]
        
        transactions = list(user_collection.find({}, {'_id': 0}).sort('date', -1))
        
        return jsonify({'transactions': transactions}), 200
        
    except Exception as e:
        return jsonify({'message': 'Server error'}), 500

@app.route('/api/transactions', methods=['POST'])
@login_required
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
@login_required
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
    try:
        # Test MongoDB connection
        client.server_info()
        return jsonify({
            'status': 'healthy',
            'mongodb': 'connected',
            'database': 'finance'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'mongodb': 'disconnected',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)