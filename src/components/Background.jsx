import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Background = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-colors duration-500">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: [
            theme === 'dark'
              ? "radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.1) 0%, rgba(76, 29, 149, 0.1) 50%, rgba(30, 41, 59, 0) 100%)"
              : "radial-gradient(circle at 20% 30%, rgba(167, 139, 250, 0.2) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(255, 255, 255, 0) 100%)",
            theme === 'dark'
              ? "radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.1) 0%, rgba(67, 56, 202, 0.1) 50%, rgba(30, 41, 59, 0) 100%)"
              : "radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.2) 50%, rgba(255, 255, 255, 0) 100%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10 hidden dark:block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <motion.div
          className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            width: "60vw",
            height: "60vw",
            top: "-20%",
            left: "-20%",
            background: theme === 'dark'
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(124, 58, 237, 0) 70%)"
              : "radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, rgba(236, 72, 153, 0) 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: ["-10%", "5%", "-10%"],
            y: ["-10%", "5%", "-10%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen"
          style={{
            width: "70vw",
            height: "70vw",
            bottom: "-30%",
            right: "-20%",
            background: theme === 'dark'
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(67, 56, 202, 0) 70%)"
              : "radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0) 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: ["10%", "-5%", "10%"],
            y: ["10%", "-5%", "10%"],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen"
            style={{
              width: `${20 + Math.random() * 30}vw`,
              height: `${20 + Math.random() * 30}vw`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: theme === 'dark'
                ? `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 50)}, 255, 0.1) 0%, transparent 70%)`
                : `radial-gradient(circle, rgba(${Math.floor(Math.random() * 50 + 200)}, ${Math.floor(Math.random() * 50 + 100)}, 255, 0.2) 0%, transparent 70%)`,
              filter: "blur(40px)",
              opacity: 0.3,
            }}
            animate={{
              x: [`${Math.random() * 100 - 50}px`, `${Math.random() * 100 - 50}px`],
              y: [`${Math.random() * 100 - 50}px`, `${Math.random() * 100 - 50}px`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 40 + Math.random() * 40,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Background;
