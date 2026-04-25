import { Helmet } from "react-helmet";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Stethoscope,
  Calendar,
  UserCheck,
  Heart,
  Shield,
  Award,
  Video,
  MessageCircle,
  Headphones,
  Globe,
  CheckCircle,
  Star,
  Users,
  Building,
  PhoneCall,
  Zap,
  AlertTriangle,
} from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ageGroup: "",
    specialty: "",
    serviceType: "",
    insurance: "",
    healthConcern: "",
    consent: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("شكراً لك! سيتم التواصل معك قريباً من فريقنا الطبي");
  };

  const assets = {
    contact_image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&crop=center",
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
      style={{
        "--color-primary": "#00BCD4",
        "--color-accent": "#009688",
        "--color-primary-dark": "#00ACC1",
      }}
    >
      <Helmet>
        <title>{t("contact_page_title")}</title>
        <meta name="description" content={t("contact_page_description")} /
        <meta name="keywords" content={t("contact_page_keywords")} />
        <link rel="canonical" href="https://www.medconnect.com/contact" />
        <meta
          property="og:title"
          content="Contact MedConnect - Premium Healthcare Platform"
        />
        <meta
          property="og:description"
          content="World-class healthcare at your fingertips. Connect with top medical specialists and access premium healthcare services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.medconnect.com/contact" />
        <meta property="og:image" content={assets.contact_image} />
      </Helmet>

      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center p-3 md:p-4 rounded-full mb-4 md:mb-6 shadow-lg bg-gradient-to-br from-cyan-400 to-teal-500">
            <Stethoscope size={30} className="text-white md:w-10 md:h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-gray-800 via-cyan-400 to-teal-500 bg-clip-text text-transparent leading-tight">
            {t("contact_hero_title")}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-2">
            {t("contact_hero_description")}
          </p>
          <div className="flex justify-center mt-6 md:mt-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-teal-500 mr-2" />
                <span>{t("contact_specialists")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-teal-500 mr-2" />
                <span>{t("contact_24_7_support")}</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-teal-500 mr-2" />
                <span>{t("contact_telemedicine")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Alert Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl md:rounded-2xl p-4 md:p-6 mb-8 md:mb-12 text-white shadow-xl md:shadow-2xl max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                <AlertTriangle size={20} className="md:w-6 md:h-6" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {t("contact_emergency_title")}
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  {t("contact_emergency_subtitle")}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto justify-center">
              <button className="bg-white text-red-600 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold hover:bg-gray-100 transition-colors text-sm md:text-base flex-1 md:flex-none">
                {t("contact_call_122")}
              </button>
              <button className="bg-white/20 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-bold hover:bg-white/30 transition-colors text-sm md:text-base flex-1 md:flex-none">
                {t("contact_emergency_chat")}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 lg:mb-20">
          {/* Instant Consultation */}
          <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-cyan-400 to-cyan-600">
              <Video size={24} className="text-white md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
              {t("contact_video_title")}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
              {t("contact_video_description")}
            </p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">
                  {t("contact_response_time")}
                </span>
                <span className="font-semibold text-gray-800">
                  {t("contact_2_minutes")}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">
                  {t("contact_availability")}
                </span>
                <span className="font-semibold text-teal-600">
                  {t("contact_24_7_available")}
                </span>
              </div>
            </div>
            <button className="w-full py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-white hover:shadow-lg bg-gradient-to-r from-cyan-400 to-cyan-600 flex items-center justify-center text-sm md:text-base">
              <Send size={18} className="mr-2 md:mr-3" />
              {t("contact_start_video_call")}
            </button>
            <p className="text-center text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
              <Shield size={14} className="inline mr-1" />
              {t("contact_hipaa_compliant")}
            </p>
          </div>

          {/* Priority Phone Support */}
          <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-teal-500 to-teal-700">
              <PhoneCall size={24} className="text-white md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
              {t("contact_phone_title")}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
              {t("contact_phone_description")}
            </p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">
                  {t("contact_medical_line")}
                </span>
                <span className="font-bold text-gray-800 text-xs md:text-sm">
                  {t("contact_medical_number")}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">{t("contact_wait_time")}</span>
                <span className="font-semibold text-teal-600">
                  {t("contact_average_30s")}
                </span>
              </div>
            </div>
            <button className="w-full py-2 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-white hover:shadow-lg bg-gradient-to-r from-teal-500 to-teal-700 text-sm md:text-base">
              {t("contact_call_now")}
            </button>
          </div>

          {/* Live Chat Support */}
          <div className="group bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={24} className="text-white md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
              {t("contact_chat_title")}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
              {t("contact_chat_description")}
            </p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">{t("contact_response")}</span>
                <span className="font-semibold text-gray-800">
                  {t("contact_instant")}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">{t("contact_languages")}</span>
                <span className="font-semibold text-teal-600">
                  {t("contact_50_languages")}
                </span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 md:py-3 rounded-lg md:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm md:text-base">
              {t("contact_start_chat")}
            </button>
          </div>

          {/* Premium Concierge */}
          <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl md:hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 border-2 border-amber-200">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award size={24} className="text-white md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
              {t("contact_concierge_title")}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
              {t("contact_concierge_description")}
            </p>
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">
                  {t("contact_dedicated_manager")}
                </span>
                <span className="font-semibold text-gray-800">
                  {t("contact_personal")}
                </span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-gray-600">
                  {t("contact_access_level")}
                </span>
                <span className="font-semibold text-amber-600">
                  {t("contact_premium_only")}
                </span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 md:py-3 rounded-lg md:rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm md:text-base">
              {t("contact_concierge_button")}
            </button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20">
          {/* Left Side - Premium Features */}
          <div className="space-y-6 md:space-y-8">
            {/* Medical Centers Showcase */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl md:shadow-2xl border border-gray-100">
              <div className="flex items-center mb-6 md:mb-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4 bg-gradient-to-br from-cyan-400 to-teal-500">
                  <Building size={20} className="text-white md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    {t("contact_network_title")}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    {t("contact_network_subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <div className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full rounded-full bg-cyan-400"></div>
                  <div className="pl-5 md:pl-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1">
                      <h4 className="text-base md:text-lg font-bold text-gray-800">
                        {t("contact_premier_center")}
                      </h4>
                      <div className="flex items-center">
                        <Star
                          size={14}
                          className="text-yellow-400 mr-1 md:w-4 md:h-4"
                        />
                        <span className="text-xs md:text-sm font-semibold">
                          {t("contact_center_rating")}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base mb-3">
                      {t("contact_center_address")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                      <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                        <div className="font-semibold text-gray-800">
                          {t("contact_specialties")}
                        </div>
                        <div className="text-gray-600">
                          {t("contact_cardiology_neuro_oncology")}
                        </div>
                      </div>
                      <div className="bg-green-50 p-2 md:p-3 rounded-lg">
                        <div className="font-semibold text-gray-800">
                          {t("contact_technology")}
                        </div>
                        <div className="text-gray-600">
                          {t("contact_ai_diagnostics")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full rounded-full bg-gray-300"></div>
                  <div className="pl-5 md:pl-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1">
                      <h4 className="text-base md:text-lg font-bold text-gray-800">
                        {t("contact_family_hub")}
                      </h4>
                      <div className="flex items-center">
                        <Star
                          size={14}
                          className="text-yellow-400 mr-1 md:w-4 md:h-4"
                        />
                        <span className="text-xs md:text-sm font-semibold">
                          {t("contact_family_rating")}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base mb-3">
                      {t("contact_family_address")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                      <div className="bg-purple-50 p-2 md:p-3 rounded-lg">
                        <div className="font-semibold text-gray-800">
                          {t("contact_focus")}
                        </div>
                        <div className="text-gray-600">
                          {t("contact_family_medicine_pediatrics")}
                        </div>
                      </div>
                      <div className="bg-pink-50 p-2 md:p-3 rounded-lg">
                        <div className="font-semibold text-gray-800">
                          {t("contact_services")}
                        </div>
                        <div className="text-gray-600">
                          {t("contact_wellness_preventive")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 w-1 h-full rounded-full bg-gray-300"></div>
                  <div className="pl-5 md:pl-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-1">
                      <h4 className="text-base md:text-lg font-bold text-gray-800">
                        {t("contact_emergency_center")}
                      </h4>
                      <div className="flex items-center">
                        <Zap
                          size={14}
                          className="text-red-500 mr-1 md:w-4 md:h-4"
                        />
                        <span className="text-xs md:text-sm font-semibold text-red-600">
                          {t("contact_always_open")}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base mb-3">
                      {t("contact_emergency_address")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
                      <div className="bg-red-50 p-2 md:p-3 rounded-lg">
                        <div className="font-semibold text-gray-800">
                          {t("contact_emergency_response")}
                        </div>
                        <div className="text-gray-600">
                          {t("contact_emergency_10_minutes")}
                        </div>
                      </div>
                      <div className="bg-orange-50 p-2 md:p-3 rounded-lg">
                        <div className="font-semibold text-gray-800">
                          {t("contact_capabilities")}
                        </div>
                        <div className="text-gray-600">
                          {t("contact_trauma_icu_surgery")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Stats */}
            <div className="bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 text-white shadow-xl md:shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 flex items-center">
                <Globe size={24} className="mr-2 md:mr-3 md:w-7 md:h-7" />
                {t("contact_impact_title")}
              </h3>
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
                    2.5M+
                  </div>
                  <div className="text-white/80 font-medium text-xs md:text-sm">
                    {t("contact_patients_served")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
                    500+
                  </div>
                  <div className="text-white/80 font-medium text-xs md:text-sm">
                    {t("contact_expert_doctors")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
                    50+
                  </div>
                  <div className="text-white/80 font-medium text-xs md:text-sm">
                    {t("contact_countries")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
                    98.5%
                  </div>
                  <div className="text-white/80 font-medium text-xs md:text-sm">
                    {t("contact_satisfaction")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Advanced Contact Form */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl md:shadow-2xl border border-gray-100">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
                {t("contact_form_title")}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {t("contact_form_subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                    {t("contact_first_name")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                    placeholder={t("contact_first_name_placeholder")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                    {t("contact_last_name")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                    placeholder={t("contact_last_name_placeholder")}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                  {t("contact_email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                  placeholder={t("contact_email_placeholder")}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                    {t("contact_phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                    placeholder={t("contact_phone_placeholder")}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                    {t("contact_age_group")}
                  </label>
                  <select
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                  >
                    <option value="">{t("contact_age_select")}</option>
                    <option value="0-18">{t("contact_age_0_18")}</option>
                    <option value="19-35">{t("contact_age_19_35")}</option>
                    <option value="36-55">{t("contact_age_36_55")}</option>
                    <option value="56+">{t("contact_age_56_plus")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                  {t("contact_specialty_required")}
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                  required
                >
                  <option value="">{t("contact_specialty_select")}</option>
                  <option value="cardiology">
                    {t("contact_specialty_cardiology")}
                  </option>
                  <option value="neurology">
                    {t("contact_specialty_neurology")}
                  </option>
                  <option value="orthopedics">
                    {t("contact_specialty_orthopedics")}
                  </option>
                  <option value="pediatrics">
                    {t("contact_specialty_pediatrics")}
                  </option>
                  <option value="womens-health">
                    {t("contact_specialty_womens")}
                  </option>
                  <option value="oncology">
                    {t("contact_specialty_oncology")}
                  </option>
                  <option value="internal-medicine">
                    {t("contact_specialty_internal")}
                  </option>
                  <option value="pulmonology">
                    {t("contact_specialty_pulmonology")}
                  </option>
                  <option value="endocrinology">
                    {t("contact_specialty_endocrinology")}
                  </option>
                  <option value="dermatology">
                    {t("contact_specialty_dermatology")}
                  </option>
                  <option value="ophthalmology">
                    {t("contact_specialty_ophthalmology")}
                  </option>
                  <option value="psychiatry">
                    {t("contact_specialty_psychiatry")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                  {t("contact_service_type")}
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                  required
                >
                  <option value="">{t("contact_service_select")}</option>
                  <option value="appointment">
                    {t("contact_service_appointment")}
                  </option>
                  <option value="telemedicine">
                    {t("contact_service_telemedicine")}
                  </option>
                  <option value="in-person">
                    {t("contact_service_in_person")}
                  </option>
                  <option value="second-opinion">
                    {t("contact_service_second_opinion")}
                  </option>
                  <option value="prescription">
                    {t("contact_service_prescription")}
                  </option>
                  <option value="records">
                    {t("contact_service_records")}
                  </option>
                  <option value="screening">
                    {t("contact_service_screening")}
                  </option>
                  <option value="urgent">{t("contact_service_urgent")}</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                  {t("contact_insurance")}
                </label>
                <select
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 bg-gray-50 focus:bg-white text-sm md:text-base"
                >
                  <option value="">{t("contact_insurance_select")}</option>
                  <option value="private">
                    {t("contact_insurance_private")}
                  </option>
                  <option value="medicare">
                    {t("contact_insurance_medicare")}
                  </option>
                  <option value="medicaid">
                    {t("contact_insurance_medicaid")}
                  </option>
                  <option value="self-pay">
                    {t("contact_insurance_self_pay")}
                  </option>
                  <option value="corporate">
                    {t("contact_insurance_corporate")}
                  </option>
                  <option value="international">
                    {t("contact_insurance_international")}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2 text-sm md:text-base">
                  {t("contact_health_concern")}
                </label>
                <textarea
                  rows={4}
                  name="healthConcern"
                  value={formData.healthConcern}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 md:px-5 md:py-4 border-2 border-gray-200 rounded-xl md:rounded-2xl focus:outline-none focus:border-cyan-400 transition-all duration-300 resize-none bg-gray-50 focus:bg-white text-sm md:text-base"
                  placeholder={t("contact_concern_placeholder")}
                  required
                />
              </div>

              <div className="flex items-start space-x-3 bg-blue-50 p-3 md:p-4 rounded-xl md:rounded-2xl">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 md:w-5 md:h-5"
                  required
                />
                <label
                  htmlFor="consent"
                  className="text-xs md:text-sm text-gray-600 leading-relaxed"
                >
                  {t("contact_consent")}
                </label>
              </div>

              <div className="pt-4 md:pt-6">
                <button
                  type="submit"
                  className="w-full py-3 md:py-4 text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-cyan-600"
                >
                  <Send size={18} className="mr-2 md:mr-3" />
                  {t("contact_submit_button")}
                </button>
                <p className="text-center text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                  <Shield size={14} className="inline mr-1" />
                  {t("contact_hipaa_info")}
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Premium Features Showcase */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 xl:p-12 shadow-xl md:shadow-2xl border border-gray-100 mb-12 md:mb-16 lg:mb-20">
          <div className="text-center mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              {t("contact_why_choose_title")}
            </h2>
            <p className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto">
              {t("contact_why_choose_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-cyan-400 to-teal-500">
                <Zap size={28} className="text-white md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                {t("contact_feature_fast_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {t("contact_feature_fast_desc")}
              </p>
              <div className="mt-3 md:mt-4 inline-flex items-center text-xs md:text-sm font-semibold text-cyan-600">
                <CheckCircle size={14} className="mr-1 md:mr-2" />
                {t("contact_feature_fast_note")}
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award size={28} className="text-white md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                {t("contact_feature_specialists_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {t("contact_feature_specialists_desc")}
              </p>
              <div className="mt-3 md:mt-4 inline-flex items-center text-xs md:text-sm font-semibold text-purple-600">
                <CheckCircle size={14} className="mr-1 md:mr-2" />
                {t("contact_feature_specialists_note")}
              </div>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield size={28} className="text-white md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-4">
                {t("contact_feature_security_title")}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {t("contact_feature_security_desc")}
              </p>
              <div className="mt-3 md:mt-4 inline-flex items-center text-xs md:text-sm font-semibold text-green-600">
                <CheckCircle size={14} className="mr-1 md:mr-2" />
                {t("contact_feature_security_note")}
              </div>
            </div>
          </div>
        </div>

        {/* Medical Excellence Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 text-white text-center shadow-lg">
            <Users size={36} className="mx-auto mb-2 md:mb-3 md:w-12 md:h-12" />
            <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
              2.5M+
            </div>
            <div className="text-blue-100 font-medium text-xs md:text-sm">
              {t("contact_stats_patients")}
            </div>
            <div className="text-blue-200 text-xs mt-1">
              {t("contact_stats_countries")}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 text-white text-center shadow-lg">
            <Heart size={36} className="mx-auto mb-2 md:mb-3 md:w-12 md:h-12" />
            <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
              98.5%
            </div>
            <div className="text-green-100 font-medium text-xs md:text-sm">
              {t("contact_stats_success")}
            </div>
            <div className="text-green-200 text-xs mt-1">
              {t("contact_stats_satisfaction")}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 text-white text-center shadow-lg">
            <Clock size={36} className="mx-auto mb-2 md:mb-3 md:w-12 md:h-12" />
            <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
              24/7
            </div>
            <div className="text-purple-100 font-medium text-xs md:text-sm">
              {t("contact_stats_available")}
            </div>
            <div className="text-purple-200 text-xs mt-1">
              {t("contact_stats_emergency")}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 text-white text-center shadow-lg">
            <Star size={36} className="mx-auto mb-2 md:mb-3 md:w-12 md:h-12" />
            <div className="text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2">
              4.9/5
            </div>
            <div className="text-orange-100 font-medium text-xs md:text-sm">
              {t("contact_stats_rating")}
            </div>
            <div className="text-orange-200 text-xs mt-1">
              {t("contact_stats_reviews")}
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 xl:p-12 text-white text-center shadow-xl md:shadow-2xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            {t("contact_cta_title")}
          </h2>
          <p className="text-gray-300 text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            {t("contact_cta_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
            <button className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 font-bold text-base md:text-lg rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center text-gray-800 bg-cyan-400 hover:bg-cyan-300 w-full sm:w-auto justify-center">
              <Calendar size={18} className="mr-2 md:mr-3" />
              {t("contact_cta_book")}
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 font-bold text-base md:text-lg rounded-xl md:rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center w-full sm:w-auto justify-center">
              <Video size={18} className="mr-2 md:mr-3" />
              {t("contact_cta_video")}
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center mt-6 md:mt-8 gap-3 md:gap-4 lg:gap-8 text-xs md:text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle size={14} className="mr-1 md:mr-2 text-cyan-400" />
              <span>{t("contact_cta_no_waiting")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={14} className="mr-1 md:mr-2 text-cyan-400" />
              <span>{t("contact_cta_insurance")}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={14} className="mr-1 md:mr-2 text-cyan-400" />
              <span>{t("contact_cta_confidential")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
