import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================
   DATA
============================================ */
const images = [
  { id: 1, src: "assests/1.webp", title: "Admin Building", category: "College", photographer: "NIT Nagaland" },
  { id: 2, src: "assests/2.jpg", title: "Battle of Bands", category: "music", photographer: "NIT Nagaland" },
  { id: 3, src: "assests/3.png", title: "Dance Competition", category: "dance", photographer: "Mike Johnson" },
  { id: 4, src: "assests/5.jpeg", title: "Nature", category: "College", photographer: "Sudipto Baral" },
  { id: 5, src: "assests/Sujal Karmakar.jpg", title: "Literary Event", category: "literary", photographer: "Sujal Karmakar" },
  { id: 6, src: "assests/Nami_Hutho.png", title: "Workshop Session", category: "workshop", photographer: "Nami Hutho" },
  { id: 7, src: "assests/Sachin.jpg", title: "Art Exhibition", category: "art", photographer: "Sachin Meena" },
  { id: 8, src: "assests/Bendang_Longchar.png", title: "Fashion Show", category: "fashion", photographer: "Bendang Longchar" },
  { id: 9, src: "assests/2.png", title: "Nature", category: "College", photographer: "Sudipto Baral" },
  { id: 10, src: "assests/4.jpeg", title: "Nature", category: "College", photographer: "Sudipto Baral" },
   { id: 11, src: "assests/7.jpeg", title: "Nature", category: "College", photographer: "Sudipto Baral" },
   { id: 12, src: "assests/8.jpeg", title: "Nature", category: "College", photographer: "Sudipto Baral" },
   { id: 13, src: "assests/10.jpeg", title: "Nature", category: "College", photographer: "Sudipto Baral" },
   { id: 14, src: "assests/11.jpeg", title: "Nature", category: "College", photographer: "Aniket Prakash" },
   { id: 15, src: "assests/ravish.jpeg", title: "Nature", category: "College", photographer: "Ravish Bhardwaj" },
   { id: 16, src: "assests/ravish3.jpeg", title: "Nature", category: "College", photographer: "Ravish Bhardwaj" },
   { id: 16, src: "assests/aman1.jpeg", title: "Nature", category: "College", photographer: "Aman Kumar" },
   { id: 16, src: "assests/aman2.jpeg", title: "Nature", category: "College", photographer: "Aman Kumar" },
   { id: 17, src: "assests/20.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 18, src: "assests/22.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 19, src: "assests/24.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 20, src: "assests/25.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 21, src: "assests/26.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 22, src: "assests/27.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 23, src: "assests/28.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 24, src: "assests/29.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 25, src: "assests/30.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 26, src: "assests/31.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 27, src: "assests/32.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 28, src: "assests/33.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 29, src: "assests/34.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 30, src: "assests/35.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 31, src: "assests/36.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 32, src: "assests/37.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 33, src: "assests/40.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 34, src: "assests/41.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   { id: 35, src: "assests/42.JPG", title: "EKA 25", category: "College", photographer: "NIT N" },
   
   
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          Gallery
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-3 md:mt-4 text-base md:text-lg">
          Swipe through the highlights of Ekarikthin 2026
        </p>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12 px-4 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.08 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full backdrop-blur-xl border transition font-medium ${
              activeCategory === cat
                ? "border-cyan-500 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 shadow-lg shadow-cyan-500/30"
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
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
              className="cursor-pointer w-full sm:w-auto lg:min-w-[280px] lg:max-w-[320px] relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition group lg:snap-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
            {/* Shine sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-20"
              transition={{ duration: 0.4 }}
            />

            {/* IMAGE */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
              <img
                src={img.src}
                className="w-full h-full object-cover duration-500 group-hover:scale-105"
              />
              {img.photographer && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white/80 text-xs px-2 py-1 rounded backdrop-blur-sm">
                  📸 {img.photographer}
                </div>
              )}
            </div>

            {/* CAPTION */}
            <div className="absolute bottom-0 p-3 sm:p-4 w-full bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 duration-300">
              <h3 className="font-bold text-white">{img.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-cyan-500 px-2 py-1 rounded-full text-white">
                  {img.category}
                </span>
                {img.photographer && (
                  <span className="text-xs text-white/80">
                    by {img.photographer}
                  </span>
                )}
              </div>
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full text-sm text-center">
              <div className="font-medium">{selectedImage.title}</div>
              {selectedImage.photographer && (
                <div className="text-xs text-white/70">
                  Photo by {selectedImage.photographer}
                </div>
              )}
              <div className="text-xs text-cyan-300 mt-1">
                {index + 1} / {filtered.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
