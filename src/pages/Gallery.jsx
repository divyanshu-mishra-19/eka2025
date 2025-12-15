import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================
   DATA
============================================ */
const images = [
  { id: 1, src: "assests/1.webp", title: "Admin Building", category: "College" },
  { id: 2, src: "assests/2.jpg", title: "Battle of Bands", category: "music" },
  { id: 3, src: "assests/3.png", title: "Dance Competition", category: "dance" },
  { id: 4, src: "https://images.unsplash.com/photo-1558981033-0fcbf4e3e1c0?auto=format&w=1200", title: "Drama & Mime", category: "theatre" },
  { id: 5, src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&w=1200", title: "Literary Event", category: "literary" },
  { id: 6, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&w=1200", title: "Workshop Session", category: "workshop" },
  { id: 7, src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&w=1200", title: "Art Exhibition", category: "art" },
  { id: 8, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&w=1200", title: "Fashion Show", category: "fashion" },
];

const categories = ["all", ...new Set(images.map((i) => i.category))];

/* ============================================
   PAGE
============================================ */
const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [index, setIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? images
      : images.filter((i) => i.category === activeCategory);

  const scrollRef = useRef(null);

  /* ----- Enable Horizontal Wheel Scrolling ----- */
  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const open = (img, i) => {
    setSelectedImage(img);
    setIndex(i);
  };

  const navigate = (dir) => {
    const newIndex =
      dir === "prev"
        ? (index - 1 + filtered.length) % filtered.length
        : (index + 1) % filtered.length;

    setIndex(newIndex);
    setSelectedImage(filtered[newIndex]);
  };

  return (
    <div className="min-h-screen py-12 md:py-24 px-4 sm:px-6 text-white relative">

      {/* HEADER */}
      <div className="text-center mb-10 md:mb-16 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
          Gallery
        </h1>
        <p className="text-gray-300 mt-3 md:mt-4 text-base md:text-lg">
          Swipe through the highlights of Ekarikthin 2025
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12 px-4 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full backdrop-blur-xl border transition ${
              activeCategory === cat
                ? "border-cyan-400 bg-white/10 text-cyan-300 shadow-[0_0_12px_#22d3ee]"
                : "border-white/10 text-gray-400 hover:border-cyan-400 hover:text-white"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* =============================================
          GALLERY GRID / CAROUSEL
      ============================================= */}
      <div className="px-4">
        <div 
          ref={scrollRef}
          onWheel={handleWheel}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-4 lg:gap-6 lg:overflow-x-auto lg:no-scrollbar lg:py-6 lg:snap-x lg:snap-mandatory lg:-mx-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              onClick={() => open(img, i)}
              className="cursor-pointer w-full sm:w-auto lg:min-w-[280px] lg:max-w-[320px] relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition group lg:snap-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-20"
              transition={{ duration: 0.4 }}
            />

            {/* IMAGE */}
            <img
              src={img.src}
              className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover duration-500 group-hover:scale-105"
            />

            {/* CAPTION */}
            <div className="absolute bottom-0 p-3 sm:p-4 w-full bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 duration-300">
              <h3 className="font-bold">{img.title}</h3>
              <span className="text-xs bg-cyan-500 px-2 py-1 rounded-full">
                {img.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      </div>

      {/* =============================================
          LIGHTBOX MODAL
      ============================================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-6 text-white hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <ChevronLeft size={42} />
            </button>

            {/* IMAGE */}
            <motion.img
              key={selectedImage.id}
              src={selectedImage.src}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] max-w-[90vw] object-contain rounded-xl shadow-[0_0_40px_rgba(34,211,238,0.5)]"
            />

            {/* Next */}
            <button
              className="absolute right-6 text-white hover:text-cyan-400 transition"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <ChevronRight size={42} />
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 bg-black/40 px-6 py-2 rounded-full text-sm">
              {selectedImage.title} • {index + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
