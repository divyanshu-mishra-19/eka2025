import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Github,
  ExternalLink,
  Heart,
  Code,
  Building2,
  Mail,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const organizationLinks = [
    {
      name: 'Accomodation Form',
      url: 'https://forms.gle/x3s6aTWYjxZ9XoTS6'
      icon: Building,
    },
    {
      name: 'Coding Club NITN',
      url: 'https://www.coding-club-nitn.tech/',
      icon: Code,
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Coding-Club-NIT-Nagaland',
      icon: Github,
    },
    {
      name: 'NIT Nagaland',
      url: 'https://www.nitnagaland.ac.in/',
      icon: Building2,
    },
    {
      name: 'Volunteer Registration',
      url: 'https://forms.gle/n8pUbzvhbeSiTit8A',
      icon: Building2,
    },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black border-t border-gray-200 dark:border-white/10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img
                src="/assests/ekarikthin.png"
                alt="Ekarikthin Logo"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 dark:from-cyan-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-2">
              EKARIKTHIN 2026
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto md:mx-0">
              The Cultural Extravaganza of NIT Nagaland - where creativity meets celebration.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-left space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <div className="space-y-3">
              {organizationLinks.map((link) => (
                link.name === 'Admin Login' ? (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      to={link.url}
                      className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
                    >
                      <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{link.name}</span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <link.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{link.name}</span>
                  </motion.a>
                )
              ))}
            </div>
          </div>

          {/* Contact & Sponsor */}
          <div className="text-center md:text-left space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Contact Info
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>NIT Nagaland, Chumukedima</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>ekarikthin@nitnagaland.ac.in</span>
              </div>
            </div>

            <div className="inline-block">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>Sponsored By</span>
              </div>
              <motion.a
                href="https://counselor.coding-club-nitn.tech/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
                  <span className="font-bold text-sm">Do Consulting</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="text-center sm:text-left">
            © {currentYear}{' '}
            <span className="font-bold text-cyan-600 dark:text-cyan-400">
              Ekarikthin
            </span>
            . All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Organized by{' '}
            <a
              href="https://www.coding-club-nitn.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Coding Club of NIT Nagaland 
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
