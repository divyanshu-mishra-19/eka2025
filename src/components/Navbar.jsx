import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Mail, Info, Sparkles, Award, Users, Moon, Sun, Heart, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Fun emoji decorations
const emojis = ['🎉','✨','🎨','🎤','🎭','🎪','🥁','🎸','🎯','🎊','🌈','🎠','🎡','🎢','🦄','🍭','🎈','🎀'];
const randomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Highlights', icon: Sparkles, path: '/highlights' },
    { name: 'Gallery', icon: Award, path: '/gallery' },
    { name: 'Team', icon: Users, path: '/team' },
    { name: 'Playground', icon: Award, path: '/playground' },
    { name: 'Sponsors', icon: Heart, path: '/sponsors' },
    { name: 'About', icon: Info, path: '/about' },
    { name: 'Contact', icon: Mail, path: '/contact' }
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
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 md:bg-gray-900/80 backdrop-blur-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            {/* Logo - Simplified for mobile */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/" className="flex items-center">
                <motion.span 
                  className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent"
                  whileHover={{ 
                    textShadow: ['0 0 10px rgba(253, 224, 71, 0.5)', '0 0 20px rgba(236, 72, 153, 0.7)'],
                    transition: { duration: 1, repeat: Infinity, repeatType: 'reverse' }
                  }}
                >
                  <span className="text-yellow-300 animate-bounce inline-block">🎪</span>
                  <span className="hidden xs:inline">Ekarikthin</span>
                  <span className="xs:hidden">EK26</span>
                  <span className="text-pink-200 animate-pulse inline-block">✨</span>
                </motion.span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div 
                    key={item.path}
                    className="relative group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative">
                      <Link
                        to={item.path}
                        className={`px-3 py-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                          isActive ? 'text-emerald-400' : 'text-white/90 hover:text-white'
                        }`}
                      >
                        <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-1.5 ${isActive ? 'text-emerald-400' : 'text-gray-300'}`} />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                      {isActive && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                          layoutId="activeNav"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:hidden">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
                ) : (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-white shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <motion.span
                  className="block relative w-5 h-5 sm:w-6 sm:h-6"
                  animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-full h-full" />
                  ) : (
                    <>
                      <span className="block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out"></span>
                      <span className="block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out mt-1.5"></span>
                      <span className="block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out mt-3"></span>
                    </>
                  )}
                </motion.span>
              </motion.button>
            </div>
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
              className="fixed top-0 right-0 h-full w-[85%] max-w-xs bg-gray-900/95 backdrop-blur-lg z-50 overflow-y-auto shadow-2xl border-l border-white/10"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 sm:p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 bg-clip-text text-transparent">
                      Menu
                    </span>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                    </button>
                  </div>
                </div>
                
                <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        whileTap={{ scale: 0.98 }}
                        className="px-1"
                      >
                        <Link
                          to={item.path}
                          className={`group flex items-center px-3 py-3.5 sm:py-4 text-base sm:text-sm font-medium rounded-lg mx-1 transition-colors duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-400/10 text-white border-l-4 border-emerald-400 pl-4'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent pl-4'
                          }`}
                        >
                          <item.icon
                            className={`mr-3 h-5 w-5 flex-shrink-0 ${
                              isActive ? 'text-emerald-400' : 'text-gray-400 group-hover:text-gray-300'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                          {isActive && (
                            <span className="ml-auto inline-block h-2 w-2 rounded-full bg-emerald-400" />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                
                <div className="p-6 border-t border-white/10">
                  <div className="text-center text-sm text-gray-400">
                    <p>Ekarikthin 2026</p>
                    <p className="mt-1">Celebrating Creativity & Innovation</p>
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
