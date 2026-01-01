import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Mail, Info, Sparkles, Award, Users, Moon, Sun, Heart, X, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const emojis = ['🎉', '✨', '🎨', '🎤', '🎭', '🎪', '🥁', '🎸', '🎯', '🎊', '🌈', '🎠', '🎡', '🎢', '🦄', '🍭', '🎈', '🎀'];
const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Highlights', path: '/highlights', icon: Sparkles },
    { name: 'Gallery', path: '/gallery', icon: Award },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Sponsors', path: '/sponsors', icon: Heart },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  // Close menu when clicking outside or when route changes
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
        navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    // Add both mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled
          ? 'bg-white/95 dark:bg-black/90 backdrop-blur-xl shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-white dark:bg-black backdrop-blur-none'
          } transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
            {/* Logo - Simplified for mobile */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/" className="flex items-center">
                <motion.span
                  className={`font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  EKARIKTHIN
                </motion.span>
                <motion.span
                  className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 py-0.5 rounded-full font-bold tracking-wider ml-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  2026
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center transition-all duration-300 ${location.pathname === item.path
                      ? 'text-cyan-600 dark:text-cyan-400 bg-gradient-to-r from-cyan-100/50 to-blue-100/50 dark:from-cyan-900/30 dark:to-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/30'
                      }`}
                  >
                    <item.icon className="w-4 h-4 mr-2 text-current" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/30 transition-all duration-200 backdrop-blur-sm"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.div
              className="md:hidden flex items-center"
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:outline-none transition-all duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-xs bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg z-50 overflow-y-auto shadow-2xl border-l border-gray-200 dark:border-white/10"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-yellow-200 dark:via-pink-300 dark:to-purple-400 bg-clip-text text-transparent">
                      Menu
                    </span>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/20 transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-2"
                    >
                      <Link
                        to={item.path}
                        className={`group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${location.pathname === item.path
                          ? 'bg-gradient-to-r from-cyan-100/50 to-blue-100/50 dark:from-cyan-900/30 dark:to-blue-900/20 text-cyan-600 dark:text-cyan-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                          }`}
                      >
                        <item.icon className="w-5 h-5 mr-3 text-current" />
                        <span>{item.name}</span>
                        {location.pathname === item.path && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-cyan-600 dark:bg-cyan-400" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="p-6 border-t border-gray-200 dark:border-white/10 mt-auto">
                  <div className="text-center">
                    <motion.button
                      onClick={toggleTheme}
                      className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="w-5 h-5 mr-2" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5 mr-2" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </motion.button>
                    <p className="mt-4 text-sm text-gray-500">Ekarikthin 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
