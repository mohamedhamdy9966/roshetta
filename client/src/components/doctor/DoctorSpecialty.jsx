import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { specialtyData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStethoscope } from "react-icons/fa";

const DoctorSpecialty = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Debug: Log what's being imported
    console.log("Raw specialtyData import:", specialtyData);

    if (specialtyData && Array.isArray(specialtyData)) {
      console.log("Specialty data loaded:", specialtyData.length, "items");
      console.log("First specialty:", specialtyData[0]);
      setData(specialtyData);
    } else {
      console.error(
        "specialtyData is not an array or is undefined:",
        specialtyData,
      );
    }
  }, []);

  useEffect(() => {
    console.log("Language changed to:", i18n.language);
  }, [i18n.language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getTranslatedSpecialty = (specialty) => {
    const specialtyMap = {
      Cardiologist: t("cardiology"),
      Cardiology: t("cardiology"),
      Dermatologist: t("dermatology"),
      Dermatology: t("dermatology"),
      Neurologist: t("neurology"),
      Neurology: t("neurology"),
      Pediatrician: t("pediatrics"),
      Pediatricians: t("pediatrics"),
      Pediatrics: t("pediatrics"),
      Orthopedist: t("orthopedics"),
      Orthopedics: t("orthopedics"),
      Ophthalmologist: t("ophthalmology"),
      Ophthalmology: t("ophthalmology"),
      Psychiatrist: t("psychiatry"),
      Psychiatry: t("psychiatry"),
      Radiologist: t("radiology"),
      Radiology: t("radiology"),
      Surgeon: t("surgery"),
      Surgery: t("surgery"),
      Urologist: t("urology"),
      Urology: t("urology"),
      Gynecologist: t("gynecology"),
      Gynecology: t("gynecology"),
      Oncologist: t("oncology"),
      Oncology: t("oncology"),
      ENT: t("ent"),
      Dentist: t("dentistry"),
      Dentistry: t("dentistry"),
      "General physician": t("general_practice"),
      "General Physician": t("general_practice"),
      "General Practice": t("general_practice"),
      Gastroenterologist: t("gastroenterology"),
      Gastroenterology: t("gastroenterology"),
      "Physical Therapy": t("physical_therapy"),
      "Physical Therapist": t("physical_therapy"),
      Nutrition: t("nutrition"),
      Nutritionist: t("nutrition"),
    };

    const translated = specialtyMap[specialty];
    if (!translated) {
      console.warn(`No translation found for: "${specialty}"`);
      return specialty;
    }
    return translated;
  };

  // Loading state
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="animate-pulse text-cyan-700">
          Loading specialties...
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-gray-500">No specialties available</p>
      </div>
    );
  }

  return (
    <motion.div
      key={i18n.language}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="flex flex-col items-center gap-8 py-32 px-4 sm:px-8 bg-[#B2EBF2] relative"
      id="doctorSpecialty"
    >
      <motion.div
        className="flex flex-col items-center"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3 mb-4">
          <FaStethoscope className="text-3xl text-[var(--color-primary-dark)]" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#0097A7]">
            {t("find_by_specialty")}
          </h2>
        </div>
        <p className="w-full md:w-1/2 text-center text-[var(--color-text-secondary)]">
          {t("specialty_description")}
        </p>
      </motion.div>

      <Helmet>
        <title>{t("specialty_page_title")}</title>
        <meta name="description" content={t("specialty_page_description")} />
        <meta name="keywords" content={t("specialty_page_keywords")} />
        <link rel="canonical" href="https://www.roshetta.com/doctors" />
        <meta property="og:title" content={t("specialty_page_title")} />
        <meta
          property="og:description"
          content={t("specialty_page_description")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.roshetta.com/doctors" />
      </Helmet>

      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 w-full max-w-6xl"
        variants={containerVariants}
      >
        {data.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Link
              onClick={() => window.scrollTo(0, 0)}
              to={`/doctors/${item.specialty.toLowerCase().replace(/ /g, "-")}`}
              className="flex flex-col items-center group cursor-pointer w-full"
            >
              <div className="p-4 bg-[var(--color-primary)] rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300 mb-3 w-20 h-20 flex items-center justify-center">
                <img
                  className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  src={item.image}
                  alt={item.specialty}
                />
              </div>
              <p className="text-center font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-dark)] transition-colors duration-300 text-sm">
                {getTranslatedSpecialty(item.specialty)}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute top-0 left-0 w-32 h-32 bg-[var(--color-accent)] opacity-10 rounded-full filter blur-xl -z-0"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[var(--color-primary)] opacity-10 rounded-full filter blur-xl -z-0"></div>
    </motion.div>
  );
};

export default DoctorSpecialty;
