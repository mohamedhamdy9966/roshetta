import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import TopDoctors from "../components/doctor/TopDoctors";
import Header from "../components/Header";
import DoctorSpecialty from "../components/doctor/DoctorSpecialty";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("home_page_title")}</title>
        <meta name="description" content={t("home_page_description")} />
      </Helmet>
      <Header />
      <DoctorSpecialty />
      <TopDoctors />
    </div>
  );
};

export default Home;
