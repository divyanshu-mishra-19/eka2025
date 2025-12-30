import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Facebook, Twitter, Instagram, Linkedin, MapPin, Clock, Phone, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick Links
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Highlights', path: '/highlights' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Team', path: '/team' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Contact Info
  const contactInfo = [
    { icon: <MapPin className="w-5 h-5 text-emerald-400" />, text: 'Your College Name, City, State, PIN' },
    { icon: <Mail className="w-5 h-5 text-emerald-400" />, text: 'contact@ekarikthin2025.com' },
    { icon: <Phone className="w-5 h-5 text-emerald-400" />, text: '+91 XXXXXXXXXX' },
    { 
      icon: <Clock className="w-5 h-5 text-emerald-400" />, 
      text: 'Mon - Sat: 9:00 AM - 5:00 PM' 
    },
  ];

  // Social Media Links
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, url: 'https://facebook.com', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com', name: 'Instagram' },
    { icon: <Youtube className="w-5 h-5" />, url: 'https://youtube.com', name: 'YouTube' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com', name: 'LinkedIn' },
  ];

  return (
    <motion.footer
      className="w-full bg-gray-900/90 backdrop-blur-sm border-t border-white/5 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-[98vw] mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-400 text-center sm:text-left mb-2 sm:mb-0">
            © {currentYear} Ekarikthin. All rights reserved. Developed and Maintained by Fermetrix Lab (HrishabhxCode) . 
          </p>
          
          <div className="flex items-center space-x-4 text-xs">
            
            <span className="text-gray-600">•</span>
            <Link 
              to="/admin/login" 
              className="text-emerald-400 hover:text-emerald-300 flex items-center transition-colors"
            >
              <Lock className="w-3 h-3 mr-1" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
