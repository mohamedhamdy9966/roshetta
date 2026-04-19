import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaDna,
  FaHeartbeat,
  FaMicroscope,
  FaNotesMedical,
  FaTint,
  FaXRay,
} from "react-icons/fa";

const labServices = [
  {
    title: "Blood Tests",
    description: "CBC, glucose, lipids, liver and kidney profiles.",
    icon: FaTint,
  },
  {
    title: "Hormone Panels",
    description: "Thyroid, fertility, and endocrine diagnostics.",
    icon: FaHeartbeat,
  },
  {
    title: "Pathology",
    description: "Sample analysis with dependable reporting workflows.",
    icon: FaMicroscope,
  },
  {
    title: "Genetic Screening",
    description: "Modern DNA-based testing and inherited risk checks.",
    icon: FaDna,
  },
  {
    title: "Imaging Support",
    description: "Coordinate scans and diagnostic follow-up faster.",
    icon: FaXRay,
  },
  {
    title: "Routine Checkups",
    description: "Preventive testing bundles for ongoing health tracking.",
    icon: FaNotesMedical,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const LabSpecialty = () => {
  return (
    <motion.section
      id="lab-specialty"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className="relative overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-sky-50 px-4 py-24 sm:px-8"
    >
      <div className="absolute left-0 top-16 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />
      <div className="absolute bottom-8 right-0 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={itemVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800">
            <FaMicroscope />
            Explore Lab Services
          </div>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Find the right diagnostic service for your next step.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Browse common test categories, compare what you need, and head into
            lab booking with a clearer plan.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {labServices.map(({ title, description, icon: Icon }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group rounded-[1.75rem] border border-cyan-100 bg-white/90 p-6 shadow-[0_18px_60px_-30px_rgba(14,116,144,0.45)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-200"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-500 text-xl text-white shadow-lg">
                <Icon />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {description}
              </p>

              <div className="mt-6 flex items-center text-sm font-semibold text-cyan-700">
                Learn more
                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/labs"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-700 px-7 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-cyan-800"
          >
            View All Labs
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LabSpecialty;
