import React, { useState, useEffect, useRef } from 'react';
import {
  Zap, Search, User, Menu, X, Home, Music,
  Package, Headphones, ShoppingCart, ChevronDown, LogIn, LogOut
} from 'lucide-react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef(null);

  // Simulate checking authentication (replace with your actual logic)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://waslerrfields-backend.vercel.app/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const result = await response.json();
        const userData = result.data;

        setUser({
          id: userData._id,
          name: userData.name || 'User',
          email: userData.email || '',
          role: userData.role || 'user'
        });
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setActiveDropdown(null);
    // Redirect to home page
    window.location.href = '/';
  };

  const handleLogin = () => {
    setIsSidebarOpen(false);
    window.location.href = '/auth';
  };

  const handleProfileClick = () => {
    setActiveDropdown(null);
    setIsSidebarOpen(false);
    window.location.href = '/profile';
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setIsSidebarOpen(false);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);

  const navigationItems = [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      path: '#',
      active: currentPage === 'home'
    },
    {
      id: 'music',
      name: 'Music',
      icon: Music,
      path: '#'
    },
    {
      id: 'orders',
      name: 'Orders',
      icon: Package,
      path: '#'
    },
    {
      id: 'support',
      name: 'Support',
      icon: Headphones,
      path: '#'
    }
  ];

  const handleNavClick = (item) => {
    setCurrentPage(item.id);
    setIsSidebarOpen(false);
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Waslerrfields
              </span>
            </div>
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Demo Controls */}

      {/* Desktop Navbar */}
      {isDesktop && (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-900/80 border-b border-gray-800/50 backdrop-blur-xl">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo on left */}
              <div className="flex items-center">
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Waslerrfields
                </span>
              </div>

              {/* Centered Navigation */}
              <div className="flex-1 flex justify-center px-20">
                <div className="flex space-x-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${item.active
                        ? 'text-white bg-gray-800/50 shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                        }`}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right side icons */}
              <div className="flex items-center space-x-4 ml-auto">
                <button className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-full transition-all duration-200">
                  <ShoppingCart className="w-6 h-6" />
                </button>

                {/* Authentication Section - This is the key part! */}
                {isAuthenticated ? (
                  // Show Profile Dropdown when logged in
                  <div className="relative">
                    <button
                      className="flex items-center text-sm rounded-full focus:outline-none hover:bg-gray-800/30 p-2 transition-all duration-200"
                      onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="ml-2 text-gray-300 font-medium">{user?.name}</span>
                      <ChevronDown className={`ml-1 w-4 h-4 text-gray-300 transition-transform duration-200 ${activeDropdown === 'user' ? 'rotate-180' : ''
                        }`} />
                    </button>

                    {activeDropdown === 'user' && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 z-50">
                        <div className="py-1">
                          <div className="px-4 py-2 border-b border-gray-700/50">
                            <p className="text-sm font-medium text-white">{user?.name}</p>
                            <p className="text-xs text-gray-400">{user?.email}</p>
                            <p className="text-xs text-purple-400 capitalize">{user?.role}</p>
                          </div>
                          <button
                            onClick={handleProfileClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white flex items-center"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Your Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white flex items-center"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Show Sign In Button when not logged in
                  <button
                    onClick={handleLogin}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Navbar */}
      {!isDesktop && (
        <>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-800">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo on left */}
                <div className="flex items-center">
                  <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Waslerrfields
                  </span>
                </div>

                {/* Hamburger menu on right */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-gray-300 hover:text-white" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Sidebar */}
          <div
            className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          <div
            ref={sidebarRef}
            className={`fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-800 z-50 shadow-2xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Waslerrfields</h1>
                  <p className="text-xs text-gray-400">Premium Audio</p>
                </div>
              </div>

              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-300 hover:text-white" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="px-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${item.active
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 shadow-lg'
                      : 'hover:bg-gray-800'
                      }`}
                  >
                    <item.icon className={`w-5 h-5 ${item.active ? 'text-purple-400' : 'text-gray-400'}`} />
                    <span className={`font-medium ${item.active ? 'text-white' : 'text-gray-300'}`}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Mobile Authentication Section */}
              <div className="border-t border-gray-800 mt-6 mx-4 pt-4">
                {isAuthenticated ? (
                  // Show Profile Info when logged in
                  <>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/30 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400 capitalize">{user?.role} • {user?.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-200 mb-2"
                    >
                      <User className="w-5 h-5 text-purple-400" />
                      <span className="font-medium text-purple-400">View Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5 text-red-400" />
                      <span className="font-medium text-red-400">Sign Out</span>
                    </button>
                  </>
                ) : (
                  // Show Sign In Button when not logged in
                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
                  >
                    <LogIn className="w-5 h-5 text-purple-400" />
                    <span className="font-medium text-white">Sign In</span>
                  </button>
                )}
              </div>

              {/* Cart and Search */}
              <div className="border-t border-gray-800 mt-4 mx-4 pt-4">
                <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-800 transition-all duration-200">
                  <span className="font-medium text-gray-300">Cart</span>
                  <ShoppingCart className="w-5 h-5 text-gray-400" />
                </button>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;