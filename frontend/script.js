// Global variables
let currentUser = null;
let currentLanguage = 'en';
let currentTheme = 'light';
let transactions = [];
let currentFilter = 'all';

// API Base URL
const API_BASE = '/api';

// Language translations
const translations = {
    en: {
        navTitle: 'TrackYourMoney',
        pageTitle: 'TrackYourMoney - Personal Finance Tracker',
        mainTitle: 'TrackYourMoney',
        loginTitle: 'Welcome Back',
        signupTitle: 'Create Account',
        noAccountText: "Don't have an account?",
        haveAccountText: 'Already have an account?',
        signupLink: 'Sign Up',
        loginLink: 'Login',
        loginBtn: 'Login',
        signupBtn: 'Create Account',
        authSubtitle: 'Secure • Simple • Smart',
        
        // Navigation
        navDashboard: 'Dashboard',
        navTransactions: 'Transactions',
        navSafety: 'Safety Tips',
        logoutBtn: 'Logout',
        userStatus: 'Active',
        
        // Dashboard
        dashboardTitle: 'Financial Dashboard',
        dashboardSubtitle: 'Your complete financial overview',
        balanceTitle: 'Current Balance',
        balanceSubtitle: 'Total available funds',
        incomeTitle: 'Total Income',
        incomeSubtitle: 'Money earned',
        expenseTitle: 'Total Expenses',
        expenseSubtitle: 'Money spent',
        quickActionsTitle: 'Quick Actions',
        addIncomeBtn: 'Add Income',
        addExpenseBtn: 'Add Expense',
        
        // Transactions
        transactionsTitle: 'Transaction Management',
        transactionsSubtitle: 'Add and manage your financial transactions',
        addTransactionTitle: 'Add New Transaction',
        typeLabel: 'Transaction Type',
        amountLabel: 'Amount (₹)',
        descriptionLabel: 'Description',
        incomeOption: 'Income',
        expenseOption: 'Expense',
        addBtn: 'Add Transaction',
        recentTransactionsTitle: 'Recent Transactions',
        recentActivityTitle: 'Recent Activity',
        viewAllText: 'View All',
        fabIncome: 'Income',
        fabExpense: 'Expense',
        balanceStatusText: 'Financial health looks good',
        filterAll: 'All',
        filterIncome: 'Income',
        filterExpense: 'Expenses',
        
        // Safety
        safetyTitle: 'Financial Safety Guide',
        safetySubtitle: 'Essential tips to protect yourself from financial scams',
        tip1Title: 'Protect Your Credentials',
        tip1Desc: 'Never share your login details with anyone. Legitimate services will never ask for your password.',
        tip2Title: 'Verify Investment Schemes',
        tip2Desc: 'Research thoroughly before investing. Be skeptical of promises of unrealistic returns.',
        tip3Title: 'Use Official Apps Only',
        tip3Desc: 'Download apps from official stores only. Check reviews and developer credentials carefully.',
        tip4Title: 'Monitor Your Accounts',
        tip4Desc: 'Regularly check your bank statements and report any suspicious activity immediately.',
        
        // Modal
        modalTitle: 'Add Transaction',
        modalAmountLabel: 'Amount (₹)',
        modalDescriptionLabel: 'Description',
        
        // Placeholders
        usernamePlaceholder: 'Username',
        passwordPlaceholder: 'Password',
        amountPlaceholder: '0.00',
        descriptionPlaceholder: 'Enter transaction details',
        
        // Loading
        loadingText: 'Loading...',
        loggingIn: 'Logging in...',
        signingUp: 'Creating account...',
        addingTransaction: 'Adding transaction...',
        loadingData: 'Loading your data...',
        footerCredits: 'Made with ❤️ by <strong>viktorexe</strong> & <strong>vansszh</strong>',
        privacyLink: 'Privacy Policy',
        termsLink: 'Terms of Service',
        privacyTitle: 'Privacy Policy',
        termsTitle: 'Terms of Service'
    },
    hi: {
        navTitle: 'ट्रैकयोरमनी',
        pageTitle: 'ट्रैकयोरमनी - व्यक्तिगत वित्त ट्रैकर',
        mainTitle: 'ट्रैकयोरमनी',
        loginTitle: 'वापस स्वागत है',
        signupTitle: 'खाता बनाएं',
        noAccountText: 'खाता नहीं है?',
        haveAccountText: 'पहले से खाता है?',
        signupLink: 'साइन अप करें',
        loginLink: 'लॉगिन',
        loginBtn: 'लॉगिन',
        signupBtn: 'खाता बनाएं',
        authSubtitle: 'सुरक्षित • सरल • स्मार्ट',
        
        // Navigation
        navDashboard: 'डैशबोर्ड',
        navTransactions: 'लेन-देन',
        navSafety: 'सुरक्षा सुझाव',
        logoutBtn: 'लॉगआउट',
        userStatus: 'सक्रिय',
        
        // Dashboard
        dashboardTitle: 'वित्तीय डैशबोर्ड',
        dashboardSubtitle: 'आपका संपूर्ण वित्तीय अवलोकन',
        balanceTitle: 'वर्तमान बैलेंस',
        balanceSubtitle: 'कुल उपलब्ध धन',
        incomeTitle: 'कुल आय',
        incomeSubtitle: 'कमाई गई राशि',
        expenseTitle: 'कुल खर्च',
        expenseSubtitle: 'खर्च की गई राशि',
        quickActionsTitle: 'त्वरित कार्य',
        addIncomeBtn: 'आय जोड़ें',
        addExpenseBtn: 'खर्च जोड़ें',
        
        // Transactions
        transactionsTitle: 'लेन-देन प्रबंधन',
        transactionsSubtitle: 'अपने वित्तीय लेन-देन जोड़ें और प्रबंधित करें',
        addTransactionTitle: 'नया लेन-देन जोड़ें',
        typeLabel: 'लेन-देन प्रकार',
        amountLabel: 'राशि (₹)',
        descriptionLabel: 'विवरण',
        incomeOption: 'आय',
        expenseOption: 'खर्च',
        addBtn: 'लेन-देन जोड़ें',
        recentTransactionsTitle: 'हाल के लेन-देन',
        recentActivityTitle: 'हाल की गतिविधि',
        viewAllText: 'सभी देखें',
        fabIncome: 'आय',
        fabExpense: 'खर्च',
        balanceStatusText: 'वित्तीय स्वास्थ्य अच्छा लग रहा है',
        filterAll: 'सभी',
        filterIncome: 'आय',
        filterExpense: 'खर्च',
        
        // Safety
        safetyTitle: 'वित्तीय सुरक्षा गाइड',
        safetySubtitle: 'वित्तीय घोटालों से खुद को बचाने के लिए आवश्यक सुझाव',
        tip1Title: 'अपनी साख सुरक्षित रखें',
        tip1Desc: 'अपने लॉगिन विवरण किसी के साथ साझा न करें। वैध सेवाएं कभी आपका पासवर्ड नहीं मांगेंगी।',
        tip2Title: 'निवेश योजनाओं की जांच करें',
        tip2Desc: 'निवेश से पहले पूरी तरह से शोध करें। अवास्तविक रिटर्न के वादों पर संदेह करें।',
        tip3Title: 'केवल आधिकारिक ऐप्स का उपयोग करें',
        tip3Desc: 'केवल आधिकारिक स्टोर से ऐप्स डाउनलोड करें। समीक्षाओं और डेवलपर की साख की जांच करें।',
        tip4Title: 'अपने खातों की निगरानी करें',
        tip4Desc: 'नियमित रूप से बैंक स्टेटमेंट की जांच करें और संदिग्ध गतिविधि की तुरंत रिपोर्ट करें।',
        
        // Modal
        modalTitle: 'लेन-देन जोड़ें',
        modalAmountLabel: 'राशि (₹)',
        modalDescriptionLabel: 'विवरण',
        
        // Placeholders
        usernamePlaceholder: 'उपयोगकर्ता नाम',
        passwordPlaceholder: 'पासवर्ड',
        amountPlaceholder: '0.00',
        descriptionPlaceholder: 'लेन-देन विवरण दर्ज करें',
        
        // Loading
        loadingText: 'लोड हो रहा है...',
        loggingIn: 'लॉगिन हो रहा है...',
        signingUp: 'खाता बनाया जा रहा है...',
        addingTransaction: 'लेन-देन जोड़ा जा रहा है...',
        loadingData: 'आपका डेटा लोड हो रहा है...',
        footerCredits: '<strong>viktorexe</strong> और <strong>vansszh</strong> द्वारा ❤️ के साथ बनाया गया',
        privacyLink: 'गोपनीयता नीति',
        termsLink: 'सेवा की शर्तें',
        privacyTitle: 'गोपनीयता नीति',
        termsTitle: 'सेवा की शर्तें'
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    setLanguage(savedLang);
    setTheme(savedTheme);
    checkAuthStatus();
    initializeNavigation();
});

// Theme functions
function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    document.body.className = theme + '-theme';
    
    const themeIcon = document.querySelector('#theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    localStorage.setItem('theme', theme);
}

// Language functions
function setLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(lang + '-btn').classList.add('active');
    
    updateAllText();
    localStorage.setItem('language', lang);
}

function updateAllText() {
    const t = translations[currentLanguage];
    
    // Update all elements with IDs
    const elements = {
        'nav-title': t.navTitle,
        'page-title': t.pageTitle,
        'main-title': t.mainTitle,
        'login-title': t.loginTitle,
        'signup-title': t.signupTitle,
        'no-account-text': t.noAccountText,
        'have-account-text': t.haveAccountText,
        'signup-link': t.signupLink,
        'login-link': t.loginLink,
        'login-btn': t.loginBtn,
        'signup-btn': t.signupBtn,
        'auth-subtitle': t.authSubtitle,
        'nav-dashboard': t.navDashboard,
        'nav-transactions': t.navTransactions,
        'nav-safety': t.navSafety,
        'logout-btn': t.logoutBtn,
        'user-status': t.userStatus,
        'dashboard-title': t.dashboardTitle,
        'dashboard-subtitle': t.dashboardSubtitle,
        'balance-title': t.balanceTitle,
        'balance-subtitle': t.balanceSubtitle,
        'income-title': t.incomeTitle,
        'income-subtitle': t.incomeSubtitle,
        'expense-title': t.expenseTitle,
        'expense-subtitle': t.expenseSubtitle,
        'quick-actions-title': t.quickActionsTitle,
        'add-income-btn': t.addIncomeBtn,
        'add-expense-btn': t.addExpenseBtn,
        'transactions-title': t.transactionsTitle,
        'transactions-subtitle': t.transactionsSubtitle,
        'add-transaction-title': t.addTransactionTitle,
        'type-label': t.typeLabel,
        'amount-label': t.amountLabel,
        'description-label': t.descriptionLabel,
        'income-option': t.incomeOption,
        'expense-option': t.expenseOption,
        'add-btn': t.addBtn,
        'recent-transactions-title': t.recentTransactionsTitle,
        'recent-activity-title': t.recentActivityTitle,
        'view-all-text': t.viewAllText,
        'fab-income': t.fabIncome,
        'fab-expense': t.fabExpense,
        'balance-status-text': t.balanceStatusText,
        'filter-all': t.filterAll,
        'filter-income': t.filterIncome,
        'filter-expense': t.filterExpense,
        'safety-title': t.safetyTitle,
        'safety-subtitle': t.safetySubtitle,
        'tip1-title': t.tip1Title,
        'tip1-desc': t.tip1Desc,
        'tip2-title': t.tip2Title,
        'tip2-desc': t.tip2Desc,
        'tip3-title': t.tip3Title,
        'tip3-desc': t.tip3Desc,
        'tip4-title': t.tip4Title,
        'tip4-desc': t.tip4Desc,
        'modal-title': t.modalTitle,
        'modal-amount-label': t.modalAmountLabel,
        'modal-description-label': t.modalDescriptionLabel,
        'loading-text': t.loadingText,
        'footer-credits': t.footerCredits,
        'privacy-link': t.privacyLink,
        'terms-link': t.termsLink,
        'privacy-title': t.privacyTitle,
        'terms-title': t.termsTitle
    };
    
    Object.entries(elements).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = text;
    });
    
    // Update placeholders
    const placeholders = {
        'login-username': t.usernamePlaceholder,
        'login-password': t.passwordPlaceholder,
        'signup-username': t.usernamePlaceholder,
        'signup-password': t.passwordPlaceholder,
        'amount': t.amountPlaceholder,
        'description': t.descriptionPlaceholder,
        'modal-amount': t.amountPlaceholder,
        'modal-description': t.descriptionPlaceholder
    };
    
    Object.entries(placeholders).forEach(([id, placeholder]) => {
        const element = document.getElementById(id);
        if (element) element.placeholder = placeholder;
    });
}

// Navigation
function initializeNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            showSection(section);
            
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            setFilter(filter);
            
            document.querySelectorAll('.filter-btn').forEach(f => f.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function showSection(sectionName) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName + '-section').classList.add('active');
}

function setFilter(filter) {
    currentFilter = filter;
    renderTransactions();
}

// Auth functions
function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
}

function showSignup() {
    document.getElementById('signup-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
}

async function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-btn');
    
    setButtonLoading(loginBtn, true);
    showLoading(translations[currentLanguage].loggingIn);
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            currentUser = data.user;
            localStorage.setItem('token', data.token);
            hideLoading();
            showApp();
            loadUserData();
        } else {
            hideLoading();
            showNotification(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        hideLoading();
        showNotification('Network error. Please try again.', 'error');
    } finally {
        setButtonLoading(loginBtn, false);
    }
}

async function signup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const signupBtn = document.getElementById('signup-btn');
    
    setButtonLoading(signupBtn, true);
    showLoading(translations[currentLanguage].signingUp);
    
    try {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            hideLoading();
            showNotification('Account created successfully! Please login.', 'success');
            showLogin();
        } else {
            hideLoading();
            showNotification(data.message || 'Signup failed', 'error');
        }
    } catch (error) {
        hideLoading();
        showNotification('Network error. Please try again.', 'error');
    } finally {
        setButtonLoading(signupBtn, false);
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('token');
    document.getElementById('auth-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
    showLogin();
}

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        verifyToken(token);
    } else {
        showLogin();
    }
}

async function verifyToken(token) {
    try {
        const response = await fetch(`${API_BASE}/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            showApp();
            loadUserData();
        } else {
            logout();
        }
    } catch (error) {
        logout();
    }
}

// App functions
function showApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('welcome-user').textContent = currentUser.username;
}

async function loadUserData() {
    showLoading(translations[currentLanguage].loadingData);
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/transactions`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            transactions = data.transactions || [];
            updateUI();
        }
    } catch (error) {
        console.error('Error loading user data:', error);
    } finally {
        hideLoading();
    }
}

async function addTransaction(event) {
    event.preventDefault();
    
    const type = document.getElementById('transaction-type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const addBtn = document.getElementById('add-btn');
    
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    const transaction = {
        type, amount, description,
        date: new Date().toISOString()
    };
    
    setButtonLoading(addBtn, true);
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transaction)
        });
        
        if (response.ok) {
            const data = await response.json();
            transactions.unshift(data.transaction);
            updateUI();
            
            document.getElementById('amount').value = '';
            document.getElementById('description').value = '';
            
            showNotification('Transaction added successfully!', 'success');
        } else {
            const data = await response.json();
            showNotification(data.message || 'Failed to add transaction', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please try again.', 'error');
    } finally {
        setButtonLoading(addBtn, false);
    }
}

// Modal functions
function showAddTransaction(type) {
    document.getElementById('modal-type').value = type;
    document.getElementById('modal-title').textContent = 
        `${translations[currentLanguage].modalTitle} - ${type === 'income' ? translations[currentLanguage].incomeOption : translations[currentLanguage].expenseOption}`;
    document.getElementById('transaction-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('transaction-modal').classList.add('hidden');
    document.getElementById('modal-amount').value = '';
    document.getElementById('modal-description').value = '';
}

async function addTransactionModal(event) {
    event.preventDefault();
    
    const type = document.getElementById('modal-type').value;
    const amount = parseFloat(document.getElementById('modal-amount').value);
    const description = document.getElementById('modal-description').value;
    const submitBtn = document.getElementById('modal-submit');
    
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    const transaction = {
        type, amount, description,
        date: new Date().toISOString()
    };
    
    setButtonLoading(submitBtn, true);
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(transaction)
        });
        
        if (response.ok) {
            const data = await response.json();
            transactions.unshift(data.transaction);
            updateUI();
            closeModal();
            showNotification('Transaction added successfully!', 'success');
        } else {
            const data = await response.json();
            showNotification(data.message || 'Failed to add transaction', 'error');
        }
    } catch (error) {
        showNotification('Network error. Please try again.', 'error');
    } finally {
        setButtonLoading(submitBtn, false);
    }
}

function updateUI() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    document.getElementById('balance').textContent = balance.toLocaleString('en-IN');
    document.getElementById('total-income').textContent = income.toLocaleString('en-IN');
    document.getElementById('total-expense').textContent = expenses.toLocaleString('en-IN');
    
    // Update progress bars
    const maxAmount = Math.max(income, expenses) || 1;
    const incomeProgress = document.getElementById('income-progress');
    const expenseProgress = document.getElementById('expense-progress');
    
    if (incomeProgress) {
        incomeProgress.style.width = `${(income / maxAmount) * 100}%`;
    }
    if (expenseProgress) {
        expenseProgress.style.width = `${(expenses / maxAmount) * 100}%`;
    }
    
    // Update balance status
    const balanceStatus = document.getElementById('balance-status');
    const balanceStatusText = document.getElementById('balance-status-text');
    if (balanceStatus && balanceStatusText) {
        if (balance > 0) {
            balanceStatus.className = 'balance-status positive';
            balanceStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>' + translations[currentLanguage].balanceStatusText + '</span>';
        } else if (balance < 0) {
            balanceStatus.className = 'balance-status negative';
            balanceStatus.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Consider reducing expenses</span>';
        } else {
            balanceStatus.className = 'balance-status neutral';
            balanceStatus.innerHTML = '<i class="fas fa-minus-circle"></i><span>Break even point</span>';
        }
    }
    
    renderTransactions();
    renderRecentActivity();
}

function renderTransactions() {
    const container = document.getElementById('transactions-list');
    
    let filteredTransactions = transactions;
    if (currentFilter !== 'all') {
        filteredTransactions = transactions.filter(t => t.type === currentFilter);
    }
    
    if (filteredTransactions.length === 0) {
        container.innerHTML = '<div class="transaction-item"><div class="transaction-details"><span class="transaction-description">No transactions found</span></div></div>';
        return;
    }
    
    const recentTransactions = filteredTransactions.slice(0, 20);
    
    container.innerHTML = recentTransactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-details">
                <div class="transaction-type ${transaction.type}">
                    <i class="fas fa-${transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}"></i>
                    ${transaction.type === 'income' ? translations[currentLanguage].incomeOption : translations[currentLanguage].expenseOption}
                </div>
                <div class="transaction-description">${transaction.description}</div>
                <div class="transaction-date">${new Date(transaction.date).toLocaleDateString('en-IN')}</div>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toLocaleString('en-IN')}
            </div>
        </div>
    `).join('');
}

// Utility functions
function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    const text = document.getElementById('loading-text');
    text.textContent = message;
    overlay.classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('btn-loading');
        button.disabled = true;
    } else {
        button.classList.remove('btn-loading');
        button.disabled = false;
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// FAB functions
function toggleFAB() {
    const mainFab = document.querySelector('.main-fab');
    const fabMenu = document.getElementById('fab-menu');
    
    mainFab.classList.toggle('active');
    fabMenu.classList.toggle('active');
}

// Render recent activity
function renderRecentActivity() {
    const container = document.getElementById('recent-transactions');
    
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = '<div class="activity-item"><span class="activity-text">No recent activity</span></div>';
        return;
    }
    
    const recentTransactions = transactions.slice(0, 3);
    
    container.innerHTML = recentTransactions.map(transaction => `
        <div class="activity-item">
            <div class="activity-icon ${transaction.type}">
                <i class="fas fa-${transaction.type === 'income' ? 'arrow-up' : 'arrow-down'}"></i>
            </div>
            <div class="activity-details">
                <div class="activity-description">${transaction.description}</div>
                <div class="activity-date">${new Date(transaction.date).toLocaleDateString('en-IN')}</div>
            </div>
            <div class="activity-amount ${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount.toLocaleString('en-IN')}
            </div>
        </div>
    `).join('');
}

// Modal functions for privacy and terms
function openModal(type) {
    const modal = document.getElementById(type + '-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(type) {
    const modal = document.getElementById(type + '-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close FAB when clicking outside
document.addEventListener('click', (e) => {
    const floatingActions = document.querySelector('.floating-actions');
    if (floatingActions && !floatingActions.contains(e.target)) {
        const mainFab = document.querySelector('.main-fab');
        const fabMenu = document.getElementById('fab-menu');
        if (mainFab && fabMenu) {
            mainFab.classList.remove('active');
            fabMenu.classList.remove('active');
        }
    }
});