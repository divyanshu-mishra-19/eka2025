import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Map from "../components/Map";

/* ============================================================
   🎥 1. CINEMATIC BACKGROUND
   ============================================================ */
const CinematicBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      {/* MAIN DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b1220] to-black" />

      {/* VOLUMETRIC FOG */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 12, repeat: Infinity }}
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, rgba(0,140,255,0.18), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* MOVING SPOTLIGHT BEAM */}
      <motion.div
        className="absolute top-[-40%] left-1/2 w-[1400px] h-[1400px] rounded-full opacity-30"
        animate={{ x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          background: "radial-gradient(circle, rgba(0,180,255,0.25), transparent 70%)",
          filter: "blur(160px)",
        }}
      />

      {/* STAGE LIGHT RAYS */}
      {[...Array(6)].map((_, i) => {
        return (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[140vh] bg-gradient-to-b from-cyan-400/40 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              opacity: 0.15,
            }}
            animate={{ y: ["-20%", "20%", "-20%"], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
};

/* ============================================================
   ⏳ 2. COUNTDOWN TIMER
   ============================================================ */
const Countdown = ({ targetDate = "2025-02-15T00:00:00" }) => {
  const target = new Date(targetDate);

  const [time, setTime] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return false;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff / 3600000) % 24);
      const minutes = Math.floor((diff / 60000) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });

      return true;
    };

    // run once immediately
    const running = update();
    if (!running) return;

    const interval = setInterval(() => {
      const still = update();
      if (!still) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 sm:mt-10 px-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {Object.entries(time).map(([key, value]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-[0_0_15px_rgba(0,200,255,0.2)] text-white"
          >
            <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold">{value}</div>
            <div className="text-[10px] xs:text-xs uppercase mt-0.5 sm:mt-1 tracking-wider text-cyan-300">{key}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   🌌 3. HOMEPAGE HERO
   ============================================================ */
export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const moveX = useTransform(x, [-300, 300], [-20, 20]);
  const moveY = useTransform(y, [-300, 300], [-10, 10]);

  useEffect(() => {
    // defensive cleanup for motion values
    return () => {
      x.set(0);
      y.set(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={(e) => {
        x.set(e.clientX - window.innerWidth / 2);
        y.set(e.clientY - window.innerHeight / 2);
      }}
    >
      <CinematicBackground />

      <div className="relative z-10">
        {/* ================= HERO ================= */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 relative z-10 pt-20 pb-16 sm:pt-0 sm:pb-0">
          {/* BADGE */}
          <motion.div
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg text-white text-sm sm:text-base font-semibold mb-4 sm:mb-6 flex items-center gap-2 mx-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
            <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[85vw]">Ekarikthin 2026 • The Grand Cultural Festival</span>
          </motion.div>

          {/* HERO TITLE */}
          <motion.h1
            style={{ x: moveX, y: moveY }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,200,255,0.4)] px-2 sm:px-4 text-center leading-tight"
          >
            EKARIKTHIN 2K26
          </motion.h1>

          <motion.p
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 font-bold mt-2 sm:mt-3 tracking-wider sm:tracking-widest px-2 sm:px-4 text-center leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            THE CULTURAL EXTRAVAGANZA
          </motion.p>
          <motion.p
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-cyan-300 font-bold tracking-wider sm:tracking-widest px-2 sm:px-4 text-center leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            OF NIT NAGALAND
          </motion.p>

          <motion.p
            className="max-w-2xl mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Experience Northeast India's most electrifying cultural festival — lights, art, music, dance,
            and a cinematic celebration of creativity.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none sm:w-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/events"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:shadow-[0_0_35px_rgba(0,200,255,0.6)] transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Explore Events <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <a
              href="#highlights"
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-base sm:text-lg text-white bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Highlights
            </a>
          </motion.div>

          <Countdown />
        </section>

        {/* ================= SINGLE LOGO SHOWCASE ================= */}
        <section className="py-12 sm:py-16 md:py-28 relative z-10 text-center px-4" id="highlights">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 mb-8 md:mb-10 drop-shadow-lg">Festival Logo</h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="assests/ekarikthin.png"
              alt="Event Logo"
              className="mx-auto max-w-[300px] object-contain"
            />
          </motion.div>
        </section>

        {/* ================= AFTERMOVIE SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-28 text-center relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 drop-shadow-lg mb-8 md:mb-16">Aftermovie 2023</h2>

          <motion.div
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,200,255,0.5)] border border-white/20 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-xl sm:rounded-2xl lg:rounded-3xl"
              src="https://youtu.be/T0Hf_Q9SAG8?si=XUCVTr-ZFDmvjcCE"
              title="Aftermovie 2025"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* ================= EKARIKTHIN 2024 MOVIE SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-28 text-center relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-300 drop-shadow-lg mb-8 sm:mb-12 md:mb-16">Ekarikthin 2024 Movie</h2>

          <motion.div
            className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,200,255,0.5)] border border-white/20 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <iframe
              className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-xl sm:rounded-2xl lg:rounded-3xl"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Ekarikthin 2024 Movie"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </section>

        {/* ================= MAP SECTION ================= */}
        <section className="py-12 sm:py-16 md:py-28 relative z-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-cyan-300 text-center mb-8 md:mb-10">Festival Venue Map</h2>

          <div className="max-w-4xl mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,200,255,0.4)] p-3 sm:p-4 md:p-6">
            <Map />
          </div>
        </section>
      </div>
    </div>
  );
}
