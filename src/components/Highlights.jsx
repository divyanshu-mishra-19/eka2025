import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, ChevronLeft, Calendar, Users, Clock, MapPin } from "lucide-react";

const HighlightCard = ({ img, alt, date, location, participants, index, photographer }) => (
  <motion.div
    className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all duration-500 h-[400px] md:h-[500px]"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
  >
    {/* Background Image */}
    <div className="absolute inset-0">
      <div className="relative w-full h-full">
        <img
          src={img}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {photographer && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white/80 text-xs px-2 py-1 rounded">
            📸 {photographer}
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
      <div className="flex justify-between items-start">
        <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          <span className="text-pink-300 font-medium">Day {index + 1}</span>
        </div>
        <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-pink-300" />
          <span className="text-sm text-white/90">{date}</span>
        </div>
      </div>

      <div className="mt-auto">
        <div className="bg-black/60 backdrop-blur-sm p-6 rounded-2xl border border-white/10 transform transition-transform duration-500 group-hover:translate-y-0">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{alt}</h3>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center text-white/80">
              <MapPin className="w-4 h-4 mr-2 text-pink-300" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-white/80">
              <Users className="w-4 h-4 mr-2 text-pink-300" />
              <span>{participants}+ Participants</span>
            </div>
          </div>
          
          <button className="mt-6 group relative px-6 py-3 bg-gradient-to-r from-pink-600/90 to-purple-600/90 text-white rounded-full text-sm font-medium overflow-hidden border border-white/20 hover:border-pink-400/60 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              View Event Details
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const HighlightGrid = ({ highlights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {highlights.map((highlight, index) => (
        <HighlightCard key={index} index={index} {...highlight} />
      ))}
    </div>
  );
};

export default function Highlights() {
  const eventHighlights = [
    { 
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
      alt: "Cultural Night Extravaganza",
      date: "March 15, 2025",
      location: "Main Auditorium",
      participants: 500,
      photographer: "John Doe"
    },
    { 
      img: "https://images.unsplash.com/photo-1531913764164-f85c52d6e654?auto=format&fit=crop&w=1200&q=80",
      alt: "Art & Innovation Expo",
      date: "March 16, 2025",
      location: "Exhibition Hall",
      participants: 350,
      photographer: "Jane Smith"
    },
    { 
      img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
      alt: "Battle of Bands",
      date: "March 16, 2025",
      location: "Open Air Theater",
      participants: 800,
      photographer: "Alex Johnson"
    },
    { 
      img: "https://images.unsplash.com/photo-1579389083395-4506e6ffef75?auto=format&fit=crop&w=1200&q=80",
      alt: "Drama Competition",
      date: "March 17, 2025",
      location: "Drama Hall",
      participants: 200,
      photographer: "Sarah Williams"
    },
    { 
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
      alt: "Literary Fest",
      date: "March 17, 2025",
      location: "Library Complex",
      participants: 300,
      photographer: "Michael Brown"
    },
    { 
      img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      alt: "Tech Workshops",
      date: "March 18, 2025",
      location: "Tech Block",
      participants: 250,
      photographer: "Emily Davis"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 mr-2 text-pink-300" />
              <span className="text-pink-300 font-medium">Highlights of Event</span>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
              Event Highlights
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-gray-300/80 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Relive the most spectacular moments from Ekarikthin 2025. Our annual cultural fest was a grand celebration of talent, creativity, and innovation.
          </motion.p>
        </motion.div>

        {/* Highlights Grid */}
        <HighlightGrid highlights={eventHighlights} />

        {/* View More Button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button className="relative group px-8 py-3.5 bg-gradient-to-r from-pink-600/90 to-purple-600/90 text-white rounded-full font-medium text-lg overflow-hidden border border-white/20 hover:border-pink-400/60 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              View All Event Galleries
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
