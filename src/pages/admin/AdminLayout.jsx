import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Calendar, Users, Settings, User, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AdminLayout = ({ onLogout, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check authentication and get user data
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token) {
      // No token found, redirect to login
      navigate('/admin/login', { replace: true });
      return;
    }
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid user data and redirect to login
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login', { replace: true });
      }
    } else {
      // No user data found, redirect to login
      localStorage.removeItem('adminToken');
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Call the onLogout callback if provided
    if (onLogout) {
      onLogout();
    }
    
    // Redirect to login
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/admin/events', icon: <Calendar className="w-5 h-5" />, label: 'Events' },
    { to: '/admin/members', icon: <Users className="w-5 h-5" />, label: 'Members' },
    { to: '/admin/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out z-40`}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Ekarikthin
          </h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>
        
        {/* User profile */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                location.pathname === item.to
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen bg-gray-900">
        <div className="p-4 sm:p-6">
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  onLogout: PropTypes.func,
  children: PropTypes.node
};

export default AdminLayout;
