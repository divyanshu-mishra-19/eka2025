import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();
  const { isDarkMode } = useTheme();
  const intervalRef = useRef();

  useEffect(() => {
    // Loading progress animation
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      currentProgress += 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(intervalRef.current);
      }
      setProgress(currentProgress);
    }, 30);

    // Main animation sequence
    const sequence = async () => {
      await controls.start('visible');
      await new Promise(resolve => setTimeout(resolve, 1500));
      await controls.start('exit');
      setIsVisible(false);
      setTimeout(() => onComplete(), 300);
    };
    
    sequence();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [onComplete, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  // Generate random particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          exit="exit"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 opacity-90"></div>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  y: ['0%', '-100%'],
                  x: ['0%', `${Math.random() * 100 - 50}%`]
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </div>

          <motion.div className="relative z-10 text-center px-4">
            {/* Logo with Glow and Pulse */}
            <motion.div
              variants={itemVariants}
              className="relative inline-block"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl -z-10"
                variants={pulseVariants}
                initial="initial"
                animate="pulse"
              />
              <div className="w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center mx-auto relative">
                <motion.img 
                  src="assests/ekarikthin.png" 
                  alt="Ekarikthin Logo"
                  className="w-full h-auto max-h-full object-contain z-10"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10
                  }}
                />
              </div>
            </motion.div>

            {/* Title with Typing Effect */}
            <motion.div className="relative">
              <motion.h1 
                className="mt-6 text-5xl sm:text-6xl font-extrabold tracking-normal bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent font-['Arial_Black', 'Arial', 'sans-serif'] uppercase relative z-10"
                variants={itemVariants}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {Array.from('EKARIKTHIN 2026').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      color: [
                        'rgba(147, 197, 253, 1)',
                        'rgba(167, 139, 250, 1)',
                        'rgba(147, 197, 253, 1)'
                      ]
                    }}
                    transition={{
                      delay: 0.05 * index,
                      duration: 0.4,
                      color: {
                        duration: 3,
                        repeat: Infinity,
                        delay: 0.05 * index
                      }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <motion.span
                  className="ml-1"
                  animate={{ opacity: [0, 1] }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    repeatType: 'reverse'
                  }}
                >
                  |
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Tagline */}
            <motion.div 
              className="mt-3 overflow-hidden"
              variants={itemVariants}
            >
              <motion.p 
                className="text-lg sm:text-xl font-medium bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                The Cultural Extravaganza
              </motion.p>
            </motion.div>

            {/* Loading Bar */}
            <motion.div 
              className="mt-8 w-48 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto"
              variants={itemVariants}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
