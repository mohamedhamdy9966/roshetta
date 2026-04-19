import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaFlask, FaMicroscope, FaVial } from "react-icons/fa";

import { assets } from "../../assets/assets";

const highlights = [
  "Trusted lab partners across Egypt",
  "Quick booking for tests and screenings",
  "Clear reports for follow-up care",
];

const LabHeader = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cyan-900 via-teal-800 to-sky-700 py-14 md:py-20">
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #67e8f9 0%, transparent 25%)",
            "radial-gradient(circle at 80% 30%, #5eead4 0%, transparent 25%)",
            "radial-gradient(circle at 50% 75%, #bae6fd 0%, transparent 25%)",
          ],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 md:px-10 lg:flex-row lg:px-16">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-50 backdrop-blur-sm">
            <FaFlask className="text-cyan-200" />
            Book Lab Tests With Confidence
          </div>

          <h2 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Fast lab bookings,
            <span className="block text-cyan-200">
              reliable diagnostics, simpler care.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-cyan-50/90 md:text-lg">
            Explore medical labs, compare services, and schedule tests in just a
            few steps. Roshetta helps you move from symptoms to answers without
            the usual friction.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-sm font-medium text-white shadow-lg backdrop-blur-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/labs"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-cyan-900 transition-transform duration-300 hover:scale-105"
            >
              Browse Labs
              <FaArrowRight />
            </Link>

            <a
              href="#lab-specialty"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-white/10"
            >
              View Services
              <FaMicroscope />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative mx-auto max-w-2xl">
            <motion.div
              className="absolute -inset-4 rounded-[2rem] bg-cyan-300/20 blur-3xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.img
              src={assets.header_lab}
              alt="Laboratory diagnostics"
              className="relative w-full rounded-[2rem] border border-white/20 object-cover shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-slate-950/55 px-4 py-3 text-white backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <FaVial />
                Precision Testing
              </div>
              <p className="mt-1 text-sm text-white/85">
                Book common lab services with a smoother digital experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LabHeader;
