import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import image1 from "../assets/02-image.jpg";
import image2 from "../assets/healthcare-or-medicalcare.png";
import {
  Heart,
  Shield,
  // Clock,
  Users,
  Star,
  // CheckCircle,
  Award,
  TrendingUp,
  Zap,
  Globe,
  Stethoscope,
  Brain,
  // Eye,
  // Target,
  Rocket,
  ArrowRight,
  Play,
  Pause,
  Code,
  Smartphone,
  Database,
  Lock,
} from "lucide-react";

const About = () => {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Auto-rotating sections
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setActiveSection((prev) => (prev + 1) % 3);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const assets = {
    about_image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    medical_care: image1,
    mental_health:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    medical_care2: image2,
    integration:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    team1:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    team2:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    team3:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  };

  const healthcareStory = [
    {
      title: t("about_medical_care_title"),
      subtitle: t("about_medical_care_subtitle"),
      description: t("about_medical_care_description"),
      image: assets.medical_care2,
      color: "from-blue-500 via-cyan-500 to-teal-500",
      icon: Stethoscope,
    },
    {
      title: t("about_general_care_title"),
      subtitle: t("about_general_care_subtitle"),
      description: t("about_general_care_description"),
      image: assets.medical_care,
      color: "from-purple-500 via-pink-500 to-rose-500",
      icon: Brain,
    },
    {
      title: t("about_integrated_title"),
      subtitle: t("about_integrated_subtitle"),
      description: t("about_integrated_description"),
      image: assets.integration,
      color: "from-emerald-500 via-teal-500 to-cyan-500",
      icon: Rocket,
    },
  ];

  const coreFeatures = [
    {
      icon: Heart,
      title: t("about_comprehensive_healthcare_title"),
      desc: t("about_comprehensive_healthcare_description"),
      color: "from-red-400 via-pink-500 to-rose-400",
      badge: t("about_healthcare_badge"),
    },
    {
      icon: Shield,
      title: t("about_advanced_security_title"),
      desc: t("about_advanced_security_description"),
      color: "from-blue-400 via-cyan-500 to-sky-400",
      badge: t("about_security_badge"),
    },
    {
      icon: Zap,
      title: t("about_instant_connection_title"),
      desc: t("about_instant_connection_description"),
      color: "from-yellow-400 via-amber-500 to-orange-400",
      badge: t("about_connection_badge"),
    },
    {
      icon: Globe,
      title: t("about_global_network_title"),
      desc: t("about_global_network_description"),
      color: "from-green-400 via-emerald-500 to-teal-400",
      badge: t("about_network_badge"),
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      number: t("about_lives_transformed_count"),
      label: t("about_lives_transformed"),
      description: t("about_lives_transformed_desc"),
      delay: "delay-0",
    },
    {
      icon: Users,
      number: t("about_healthcare_specialists_count"),
      label: t("about_healthcare_specialists"),
      description: t("about_healthcare_specialists_desc"),
      delay: "delay-100",
    },
    {
      icon: Star,
      number: t("about_specialties_count"),
      label: t("about_specialties"),
      description: t("about_specialties_desc"),
      delay: "delay-200",
    },
    {
      icon: Award,
      number: t("about_platform_reliability_count"),
      label: t("about_platform_reliability"),
      description: t("about_platform_reliability_desc"),
      delay: "delay-300",
    },
  ];

  const technologies = [
    {
      icon: Code,
      title: t("about_ai_diagnostics_title"),
      description: t("about_ai_diagnostics_description"),
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: Smartphone,
      title: t("about_mobile_title"),
      description: t("about_mobile_description"),
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Database,
      title: t("about_smart_records_title"),
      description: t("about_smart_records_description"),
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Lock,
      title: t("about_security_title"),
      description: t("about_security_description"),
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <Helmet>
        <title>{t("about_page_title")}</title>
        <meta name="description" content={t("about_page_description")} />
        <meta name="keywords" content={t("about_page_keywords")} />
        <meta name="author" content="Roshetta Team" />
        <meta property="og:title" content={t("about_page_title")} />
        <meta
          property="og:description"
          content={t("about_discover_description")}
        />
        <meta property="og:image" content={assets.about_image} />
        <meta property="og:url" content="https://www.roshetta.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t("about_page_title")} />
        <meta name="twitter:description" content={t("about_join_millions")} />
        <meta name="twitter:image" content={assets.about_image} />
        <link rel="canonical" href="https://www.roshetta.com/about" />
      </Helmet>

      <style jsx="true">{`
        :root {
          --primary-gradient: linear-gradient(135deg, #00bcd4, #009688);
          --accent-gradient: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          --text-gradient: linear-gradient(135deg, #00bcd4, #009688);
        }

        .text-gradient {
          background: var(--text-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .primary-gradient {
          background: var(--primary-gradient);
        }

        .accent-gradient {
          background: var(--accent-gradient);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
          }
          40%,
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scale(1.2);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes morph {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }
        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        .slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .morphing {
          animation: morph 8s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 floating"
          style={{
            left: `${20 + mousePosition.x * 0.1}%`,
            top: `${10 + mousePosition.y * 0.1}%`,
            transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.1}px)`,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-8 floating morphing"
          style={{
            right: `${10 + mousePosition.x * 0.05}%`,
            top: `${60 + mousePosition.y * 0.05}%`,
            animationDelay: "2s",
            transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-6"
          style={{
            left: `${-10 + mousePosition.x * 0.08}%`,
            bottom: `${20 + mousePosition.y * 0.03}%`,
            transform: `translate(${scrollY * 0.1}px, ${-scrollY * 0.1}px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8 slide-up">
            {/* Logo Animation */}
            <div className="relative inline-block mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black">
                <span className="text-gradient relative inline-block">
                  Roshetta
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-3xl opacity-20 blur-2xl pulse-ring"></div>
                </span>
              </h1>
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full floating"></div>
              <div
                className="absolute -bottom-4 -left-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full floating"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            <div className="w-32 h-2 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full shimmer"></div>

            <div className="space-y-4">
              <p className="text-2xl md:text-4xl font-bold text-gray-800">
                {t("about_where_medical_meets")}
              </p>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t("about_ecosystem_description")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-500 transform hover:scale-110 hover:shadow-2xl">
                <span className=" z-10 flex items-center justify-center gap-2 ">
                  {t("about_explore_platform")}{" "}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="px-12 py-6 border-2 border-gray-300 text-gray-700 font-bold text-xl rounded-full hover:border-cyan-500 hover:text-cyan-600 transition-all duration-300 transform hover:scale-105">
                {t("about_watch_story")}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
            <div className="absolute -inset-4 border-2 border-cyan-400 rounded-full opacity-50 pulse-ring"></div>
          </div>
        </div>
      </section>

      {/* Healthcare Story Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              {t("about_journey_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about_journey_subtitle")}
            </p>
          </div>

          {/* Interactive Story Timeline */}
          <div className="relative">
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-4 glass-morphism rounded-full p-2">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:scale-110 transition-transform"
                >
                  {isAutoPlay ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <div className="flex gap-2">
                  {healthcareStory.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeSection === index
                          ? "bg-gradient-to-r from-cyan-500 to-teal-500 scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
              <div className="space-y-8 slide-up">
                {healthcareStory.map((story, index) => {
                  const IconComponent = story.icon;
                  return activeSection === index ? (
                    <div key={index} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${story.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-4xl font-bold text-gray-800">
                            {story.title}
                          </h3>
                          <p
                            className={`text-lg font-semibold bg-gradient-to-r ${story.color} bg-clip-text text-transparent`}
                          >
                            {story.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {story.description}
                      </p>
                      <div className="flex items-center gap-4 pt-4">
                        <div
                          className={`h-1 w-20 bg-gradient-to-r ${story.color} rounded-full`}
                        ></div>
                        <span className="text-sm text-gray-500 font-medium">
                          {t("about_step_of", { number: index + 1 })}
                        </span>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
                  <img
                    src={healthcareStory[activeSection].image}
                    alt={healthcareStory[activeSection].title}
                    className="w-full h-96 object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${healthcareStory[activeSection].color} opacity-20`}
                  ></div>
                  <div className="absolute inset-0 shimmer opacity-30"></div>
                </div>
                <div
                  className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r ${healthcareStory[activeSection].color} rounded-3xl shadow-xl floating`}
                ></div>
                <div
                  className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-lg floating"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Core Features */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              {t("about_capabilities_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about_capabilities_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {coreFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-6 border border-gray-100 overflow-hidden"
                >
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-gradient-to-r ${feature.color} text-white rounded-full opacity-80`}
                  >
                    {feature.badge}
                  </div>

                  <div
                    className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full opacity-10 -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700`}
                  ></div>

                  <div
                    className={`relative z-10 w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 group-hover:text-gray-900 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.desc}
                  </p>

                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about_impact_title")}
            </h2>
            <p className="text-xl opacity-90">{t("about_impact_subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`text-center group slide-up ${stat.delay} transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto glass-morphism rounded-2xl flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg mb-1 text-gray-200">{stat.label}</div>
                  <div className="text-sm opacity-70">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology & Innovation Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              {t("about_technology_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about_technology_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tech.color}`}
                  ></div>

                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                    {tech.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {tech.description}
                  </p>

                  <div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r ${tech.color} opacity-5 rounded-full group-hover:scale-125 transition-transform duration-700`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="space-y-8 slide-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              {t("about_ready_title")}
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed max-w-4xl mx-auto">
              {t("about_ready_description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <span className="relative z-10 flex justify-center gap-2">
                  {t("about_start_journey")}{" "}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-12 py-6 glass-morphism text-white font-bold text-xl rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 border border-white/30">
                {t("about_discover_integration")}
              </button>
            </div>

            <div className="pt-12 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8 opacity-80">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {t("about_medical_care_label")}
                </div>
                <div className="text-sm">
                  {t("about_medical_care_label_desc")}
                </div>
              </div>
              <div className="text-4xl font-light text-white">+</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {t("about_protection_label")}
                </div>
                <div className="text-sm">
                  {t("about_protection_label_desc")}
                </div>
              </div>
              <div className="text-4xl font-light text-white">=</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">
                  {t("about_roshetta_label")}
                </div>
                <div className="text-sm">{t("about_comprehensive_label")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
