# Setup Guide

## Quick Start

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user:
   - Username: `financeuser`
   - Password: Generate a strong password
5. Add your IP to whitelist (or use 0.0.0.0/0 for all IPs)
6. Get connection string from "Connect" → "Connect your application"

### 2. Environment Variables
1. Copy `.env.example` to `.env`
2. Update with your values:
```env
SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-random
MONGODB_URI=mongodb+srv://financeuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/finance?retryWrites=true&w=majority
```

### 3. Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run backend
python backend/api/index.py

# Open frontend/index.html in browser
```

### 4. Vercel Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `SECRET_KEY`: Same as local
   - `MONGODB_URI`: Same as local
4. Deploy

## Security Notes
- Never commit `.env` file to Git
- Use strong, unique passwords
- Rotate secrets regularly
- Use different credentials for production

## Troubleshooting
- **Connection Error**: Check MongoDB URI and network access
- **Auth Error**: Verify SECRET_KEY is set
- **CORS Error**: Ensure backend is running on correct port