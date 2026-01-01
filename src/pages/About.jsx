import { motion } from "framer-motion";
import { Sparkles, Users, BookOpen, Award, Star, Calendar, MapPin, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-300" />,
      title: "Our Vision",
      description: "To create an unforgettable cultural experience that celebrates creativity, innovation, and the spirit of togetherness."
    },
    {
      icon: <Users className="w-8 h-8 text-pink-300" />,
      title: "Our Community",
      description: "A vibrant community of students, artists, and performers coming together to showcase their talents and create lasting memories."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-300" />,
      title: "Our Story",
      description: "Founded with a passion for cultural exchange, Ekarikthin has grown into one of the most anticipated events of the year."
    },
    {
      icon: <Award className="w-8 h-8 text-blue-300" />,
      title: "Achievements",
      description: "Recognized for excellence in cultural programming and student engagement year after year."
    }
  ];

  const stats = [
    { value: "10+", label: "Events", icon: <Sparkles className="w-6 h-6" /> },
    { value: "500+", label: "Participants", icon: <Users className="w-6 h-6" /> },
    { value: "3", label: "Days", icon: <Calendar className="w-6 h-6" /> },
    { value: "50+", label: "Workshops", icon: <BookOpen className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 drop-shadow-2xl">
            About Ekarikthin 2026
          </span>
        </h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Where creativity meets culture in an explosion of art, music, and innovation. Join us for an unforgettable journey through Northeast India's most spectacular cultural celebration.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-xl border border-purple-300 dark:border-purple-600 rounded-full px-6 py-3 text-purple-800 dark:text-purple-200 font-semibold">
            📅 February 17-19, 2026
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-xl border border-blue-300 dark:border-blue-600 rounded-full px-6 py-3 text-blue-800 dark:text-blue-200 font-semibold">
            📍 NIT Nagaland
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Stats Section */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="relative overflow-hidden group"
          >
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl group-hover:shadow-2xl dark:group-hover:shadow-3xl transition-all duration-300 h-full">
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 mb-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Features Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

        {/* Location Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl p-8 hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Location</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Join us at the heart of the cultural extravaganza. Our venue is easily accessible and equipped with all modern amenities to ensure a comfortable experience.
                </p>
                <div className="flex items-center text-cyan-600 dark:text-cyan-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>NIT Nagaland, Chumukedima, Nagaland - 797103</span>
                </div>
              </div>

              <div className="w-full md:w-1/2 h-64 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <iframe
                  // simpler, reliable Google Maps embed URL
                  src="https://www.google.com/maps?q=NIT%20Nagaland%2C%20Chumukedima%2C%20Nagaland%20797103&z=15&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="w-full h-full border-0"
                  title="NIT Nagaland Location"
                />
              </div>
            </div>
          </div>
        </motion.div>

      {/* CTA Section */}
      <motion.div
        className="text-center relative overflow-hidden rounded-2xl p-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl hover:shadow-2xl dark:hover:shadow-3xl transition-all duration-300"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        
        <div className="relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Ready to be part of <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">Ekarikthin 2026</span>?
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Join us for an unforgettable experience of cultural celebration, learning, and entertainment.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <button className="relative group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-cyan-500/40">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Get Your Tickets Now
                <Heart className="w-5 h-5 ml-2 group-hover:scale-125 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default About;