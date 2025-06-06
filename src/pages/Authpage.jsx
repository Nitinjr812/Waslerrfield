import React, { useState, useCallback, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Music, ArrowRight, Shield, Heart, X, CheckCircle, AlertCircle } from 'lucide-react';

// Toast Component
const Toast = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500/20 border-green-500/50' :
        type === 'error' ? 'bg-red-500/20 border-red-500/50' :
            'bg-blue-500/20 border-blue-500/50';

    const textColor = type === 'success' ? 'text-green-300' :
        type === 'error' ? 'text-red-300' :
            'text-blue-300';

    const Icon = type === 'success' ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} backdrop-blur-sm animate-slide-in max-w-sm`}>
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-auto text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// Axios replacement for API calls
const apiClient = {
    baseURL: 'https://waslerrfields-backend.vercel.app/api/auth',

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (config.method !== 'GET' && options.data) {
            config.body = JSON.stringify(options.data);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            data,
            ...options
        });
    }
};

// Memoized Input Component
const InputField = React.memo(({
    icon: Icon,
    type,
    name,
    value,
    placeholder,
    required,
    showToggle,
    showState,
    onToggle,
    onChange
}) => {
    const inputRef = useRef(null);

    return (
        <div className="relative group">
            <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
            <input
                ref={inputRef}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder={placeholder}
                required={required}
            />
            {showToggle && (
                <button
                    type="button"
                    onClick={() => {
                        onToggle();
                        setTimeout(() => inputRef.current?.focus(), 0);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                    {showState ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
        </div>
    );
});

// Login Page Component
const LoginPage = React.memo(({
    formData,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleSubmit,
    loading,
    switchPage
}) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 animate-gradient-shift"></div>

        {[...Array(8)].map((_, i) => (
            <div
                key={`note-${i}`}
                className="absolute text-purple-400/20 text-4xl animate-float"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 10 + 10}s`
                }}
            >
                {['♪', '♫', '♩', '♬'][i % 4]}
            </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none opacity-20">
            <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-600/30 blur-xl animate-pulse-slow"></div>
                {[0, 1, 2].map((i) => (
                    <div
                        key={`ring-${i}`}
                        className="absolute inset-0 rounded-full border-[1px] border-purple-400/30 animate-spin"
                        style={{
                            transform: `scale(${1 + i * 0.2}) rotateZ(${i * 20}deg)`,
                            animationDuration: `${8 + i * 4}s`,
                            boxShadow: `0 0 15px rgba(192, 132, 252, ${0.2 - i * 0.05})`,
                        }}
                    ></div>
                ))}
            </div>
        </div>

        <div className="relative mt-15 z-10 w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2 ">
                    <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                        Welcome Back
                    </span>
                </h1>
                <p className="text-gray-400 text-lg">Sign in to your music world</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 rounded-3xl backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                        <InputField
                            icon={Mail}
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                        <InputField
                            icon={Lock}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Enter your password"
                            required
                            showToggle
                            showState={showPassword}
                            onToggle={() => setShowPassword(!showPassword)}
                            onChange={handleInputChange}
                        />
                    </div>



                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                        {loading ? (
                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 -z-10 blur-md group-hover:animate-pulse-slow transition-all duration-500"></span>
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <button
                            onClick={() => switchPage('register')}
                            className="text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 hover:underline"
                        >
                            Sign up here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
));

// Register Page Component
const RegisterPage = React.memo(({
    formData,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleInputChange,
    handleSubmit,
    loading,
    switchPage
}) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 animate-gradient-shift"></div>

        {[...Array(12)].map((_, i) => (
            <div
                key={`star-${i}`}
                className="absolute text-yellow-400/20 text-xl animate-twinkle"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 5 + 5}s`
                }}
            >
                ★
            </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0 pointer-events-none opacity-20">
            <div className="relative w-96 h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-600/30 blur-xl animate-pulse-slow"></div>
                {[0, 1, 2].map((i) => (
                    <div
                        key={`ring-${i}`}
                        className="absolute inset-0 rounded-full border-[1px] border-purple-400/30"
                        style={{
                            transform: `scale(${1 + i * 0.2}) rotateZ(${i * 20}deg)`,
                            animation: `spin ${8 + i * 4}s linear infinite reverse`,
                            boxShadow: `0 0 15px rgba(192, 132, 252, ${0.2 - i * 0.05})`,
                        }}
                    ></div>
                ))}
            </div>
        </div>

        <div className="relative z-10 w-full max-w-md">
            <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-slow">
                    <User className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                        Join the Beat
                    </span>
                </h1>
                <p className="text-gray-400 text-lg">Create your music account</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 rounded-3xl backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                        <InputField
                            icon={User}
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your full name"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                        <InputField
                            icon={Mail}
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="Enter your email"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                        <InputField
                            icon={Lock}
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            placeholder="Create a password"
                            required
                            showToggle
                            showState={showPassword}
                            onToggle={() => setShowPassword(!showPassword)}
                            onChange={handleInputChange}
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>

                    <div className="group">
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
                        <InputField
                            icon={Shield}
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            placeholder="Confirm your password"
                            required
                            showToggle
                            showState={showConfirmPassword}
                            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                            onChange={handleInputChange}
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                        {loading ? (
                            <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
                            </>
                        )}
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 -z-10 blur-md group-hover:animate-pulse-slow transition-all duration-500"></span>
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <button
                            onClick={() => switchPage('login')}
                            className="text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 hover:underline"
                        >
                            Sign in here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
));

// Main App Component
const AuthPages = () => {
    const [currentPage, setCurrentPage] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Toast helper functions
    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 5000);
    }, []);

    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Client-side validation
            if (currentPage === 'register') {
                if (!formData.name.trim()) {
                    throw new Error('Name is required');
                }
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                if (formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters long');
                }
            }

            if (!formData.email.trim()) {
                throw new Error('Email is required');
            }
            if (!formData.password.trim()) {
                throw new Error('Password is required');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            // Make API call to your backend
            const response = await apiClient.post(
                currentPage === 'login' ? '/login' : '/register',
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
            );

            if (response.success) {
                const { token, user } = response;
                showToast(response.message, 'success');

                // Store token and user data
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Redirect after successful login
                window.location.href = '/';
            }
            console.log('Full API Response:', response);

            // Handle successful response - check multiple possible response structures
            let userData = null;
            let token = null;
            let message = '';

            // ... (your existing response structure checks)

            // Show success toast
            showToast(message, 'success');

            if (token && userData) {
                console.log('Authentication successful!');
                console.log('User data:', userData);
                console.log('Token:', token);

                // PASTE THE CODE HERE - START
                // Store token in localStorage
                localStorage.setItem('token', token);

                // Store basic user info if needed
                localStorage.setItem('user', JSON.stringify({
                    id: userData.id || userData._id,
                    name: userData.name,
                    email: userData.email
                }));

                // Redirect to home page after successful login
                window.location.href = '/';
                // Here you can store user data in context/state or redirect
                // For demo purposes, we'll show another success message
                setTimeout(() => {
                    showToast(
                        `Welcome ${userData.name || userData.email}! Login successful.`,
                        'success'
                    );
                }, 1000);
            }

            // Clear form
            setFormData({ name: '', email: '', password: '', confirmPassword: '' });

        } catch (err) {
            console.error('Authentication error:', err);
            const errorMessage = err.message || 'An error occurred. Please check if your backend server is running.';
            showToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }

    }, [currentPage, formData, showToast]);

    const switchPage = useCallback((page) => {
        setCurrentPage(page);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setShowPassword(false);
        setShowConfirmPassword(false);
        hideToast();
    }, [hideToast]);

    return (
        <div>
            {/* Toast notifications */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}

            {currentPage === 'login' ? (
                <LoginPage
                    formData={formData}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    switchPage={switchPage}
                />
            ) : (
                <RegisterPage
                    formData={formData}
                    showPassword={showPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowPassword={setShowPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    switchPage={switchPage}
                />
            )}

            <style jsx global>{`
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes pulse-slow {
                    0% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.05); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 0.7; }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes float {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.2; }
                    90% { opacity: 0.2; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
                
                @keyframes twinkle {
                    0% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.2); }
                    100% { opacity: 0.1; transform: scale(1); }
                }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slide-in {
                    from { 
                        opacity: 0; 
                        transform: translateX(100%) translateY(-50%);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0) translateY(0);
                    }
                }
                
                .animate-gradient-shift {
                    background-size: 200% 200%;
                    animation: gradient-shift 15s ease infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
                
                .animate-float {
                    animation: float linear infinite;
                }
                
                .animate-twinkle {
                    animation: twinkle ease-in-out infinite;
                }

                .animate-slide-in {
                    animation: slide-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AuthPages;