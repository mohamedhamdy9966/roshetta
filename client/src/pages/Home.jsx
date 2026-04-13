import React from "react";
import { Helmet } from "react-helmet";
import TopDoctors from "../components/doctor/TopDoctors";
import Header from "../components/Header";
import LabHeader from "../components/lab/LabHeader";
import DoctorSpecialty from "../components/doctor/DoctorSpecialty";
import LabSpecialty from "../components/lab/LabSpecialty";

const Home = () => {
  return (
    <div >
      <Header/>
      < DoctorSpecialty/>
      <TopDoctors/>
    </div>
  );
};

export default Home;
