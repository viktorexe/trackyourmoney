# TrackYourMoney - Personal Finance Tracker

🚀 **Live Demo**: [trackyourmoney.vercel.app](https://trackyourmoney.vercel.app)

A modern, bilingual (Hindi/English) personal finance tracker built with HTML, CSS, JavaScript frontend and Python Flask backend. Track your income, expenses, and financial health with an intuitive, mobile-friendly interface.

## ✨ Features

- 🌐 **Bilingual Support**: Switch between Hindi and English
- 👴 **Elder-Friendly UI**: Large fonts, clear design, simple navigation
- 🔐 **Secure Authentication**: Simple username/password login system
- 💰 **Transaction Management**: Add income and expenses with ease
- 📊 **Real-time Dashboard**: Track current balance, total income, and expenses
- ☁️ **Cross-device Sync**: MongoDB database for data persistence
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🎨 **Modern UI**: Dark/Light theme with floating action buttons
- 🛡️ **Safety Tips**: Built-in financial security guidance
- ⚡ **Fast & Lightweight**: Optimized performance

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python Flask
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal-finance-tracker
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file with your MongoDB connection string
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend:
```bash
python backend/api/index.py
```

5. Open `frontend/index.html` in your browser

## Environment Variables

Create a `.env` file in the root directory with:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
3. Deploy automatically with `vercel.json` configuration

### Environment Variables Setup

**For Vercel:**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string

**For MongoDB Atlas:**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Replace `<username>`, `<password>`, and `<cluster>` in the URI

## Database Structure

- **Database**: `finance`
- **Collections**: 
  - `users`: User authentication data
  - `user_{username}_transactions`: Individual user transaction collections

## 🚀 Usage

1. **Sign Up**: Create account with username and password
2. **Login**: Access your personal dashboard
3. **Language**: Toggle between Hindi and English
4. **Add Transactions**: Record income and expenses using FAB or forms
5. **View Stats**: Monitor balance, progress bars, and transaction history
6. **Safety**: Learn financial security tips

## 🎯 SEO Optimized

- Comprehensive meta tags for search engines
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for rich snippets
- Sitemap and robots.txt included
- Optimized for keywords: finance tracker, money management, expense tracker

## 👨‍💻 Developers

Made with ❤️ by **viktorexe** & **vansszh**