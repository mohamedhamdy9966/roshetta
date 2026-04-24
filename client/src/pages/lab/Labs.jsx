import React, { useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFilter, FaFlask, FaMapMarkerAlt, FaStar } from "react-icons/fa";

import { AppContext } from "../../context/AppContext";

const serviceOptions = [
  "Blood Tests",
  "Hormone Panels",
  "Pathology",
  "Genetic Screening",
  "Imaging Support",
  "Routine Checkups",
];

const ratingOptions = [
  { label: "Any", value: "" },
  { label: "3+ Stars", value: "3" },
  { label: "4+ Stars", value: "4" },
  { label: "5 Stars", value: "5" },
];

const toSlug = (value = "") => value.toLowerCase().replace(/\s+/g, "-");

const formatAddress = (address, t) => {
  if (!address) return t("address_not_available");

  return [
    address.line1,
    address.line2,
    address.street,
    address.city,
    address.state,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
};

const getAverageRating = (ratings = []) => {
  if (!ratings.length) return 0;
  return ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length;
};

const Labs = () => {
  const { t, i18n } = useTranslation();
  const { specialty } = useParams();
  const navigate = useNavigate();
  const { axios } = useContext(AppContext);

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    service: "",
    availability: "",
    minFees: "",
    maxFees: "",
    minRating: "",
    search: "",
  });

  const selectedServiceFromUrl = useMemo(() => {
    if (!specialty) return "";

    return (
      serviceOptions.find((service) => toSlug(service) === specialty) ||
      specialty
    );
  }, [specialty]);

  const fetchLabs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/lab/list");

      if (data.success) {
        setLabs(data.labs || []);
        return;
      }

      setLabs([]);
    } catch (error) {
      console.error("Error fetching labs:", error);
      setLabs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const filteredLabs = useMemo(() => {
    let results = [...labs];
    const normalizedService = (
      filters.service ||
      selectedServiceFromUrl ||
      ""
    ).toLowerCase();

    if (normalizedService) {
      results = results.filter((lab) =>
        (lab.services || []).some(
          (service) =>
            service.toLowerCase() === normalizedService ||
            toSlug(service) === toSlug(normalizedService),
        ),
      );
    }

    if (filters.availability !== "") {
      results = results.filter(
        (lab) => lab.available === (filters.availability === "true"),
      );
    }

    if (filters.minFees) {
      results = results.filter((lab) => lab.fees >= Number(filters.minFees));
    }

    if (filters.maxFees) {
      results = results.filter((lab) => lab.fees <= Number(filters.maxFees));
    }

    if (filters.minRating) {
      results = results.filter(
        (lab) => getAverageRating(lab.ratings) >= Number(filters.minRating),
      );
    }

    if (filters.search.trim()) {
      const query = filters.search.trim().toLowerCase();
      results = results.filter(
        (lab) =>
          lab.name?.toLowerCase().includes(query) ||
          (lab.services || []).some((service) =>
            service.toLowerCase().includes(query),
          ),
      );
    }

    return results;
  }, [filters, labs, selectedServiceFromUrl]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      service: "",
      availability: "",
      minFees: "",
      maxFees: "",
      minRating: "",
      search: "",
    });

    if (specialty) {
      navigate("/labs");
    }
  };

  // Translate service options
  const getTranslatedService = (service) => {
    const serviceMap = {
      "Blood Tests": t("blood_tests"),
      "Hormone Panels": t("hormone_panels"),
      Pathology: t("pathology"),
      "Genetic Screening": t("genetic_screening"),
      "Imaging Support": t("imaging_support"),
      "Routine Checkups": t("routine_checkups"),
    };
    return serviceMap[service] || service;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 md:px-16">
      <Helmet>
        <title>
          {selectedServiceFromUrl
            ? t("labs_page_title_with_service", {
                service: selectedServiceFromUrl,
              })
            : t("labs_page_title")}
        </title>
        <meta
          name="description"
          content={
            selectedServiceFromUrl
              ? t("labs_page_description_with_service", {
                  service: selectedServiceFromUrl,
                })
              : t("labs_page_description")
          }
        />
      </Helmet>

      <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-cyan-900 via-teal-800 to-sky-700 px-6 py-10 text-white shadow-xl">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
          <FaFlask />
          {t("diagnostic_labs")}
        </p>
        <h1 className="text-3xl font-bold md:text-4xl">
          {selectedServiceFromUrl
            ? t("labs_hero_title_with_service", {
                service: selectedServiceFromUrl,
              })
            : t("labs_hero_title")}
        </h1>
        <p className="mt-3 max-w-3xl text-cyan-50/90">
          {t("labs_hero_description")}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-72 lg:flex-shrink-0">
          <button
            className={`mb-4 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition lg:hidden ${
              showFilter
                ? "border-cyan-700 bg-cyan-700 text-white"
                : "border-cyan-200 bg-white text-slate-800"
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <FaFilter />
            {showFilter ? t("hide_filters") : t("show_filters")}
          </button>

          <div
            className={`rounded-[1.5rem] border border-cyan-100 bg-cyan-50/80 p-5 shadow-sm ${
              showFilter ? "block" : "hidden lg:block"
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                {t("filters")}
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-cyan-700 hover:text-cyan-800"
              >
                {t("clear_all")}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("search")}
                </label>
                <input
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder={t("search_placeholder")}
                  className="w-full rounded-xl border border-cyan-100 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("service")}
                </label>
                <select
                  name="service"
                  value={filters.service || selectedServiceFromUrl}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-cyan-100 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-400"
                >
                  <option value="">{t("all_services")}</option>
                  {serviceOptions.map((service) => (
                    <option key={service} value={service}>
                      {getTranslatedService(service)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("availability")}
                </label>
                <select
                  name="availability"
                  value={filters.availability}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-cyan-100 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-400"
                >
                  <option value="">{t("all_labs")}</option>
                  <option value="true">{t("available")}</option>
                  <option value="false">{t("unavailable")}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("fees_range")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minFees"
                    value={filters.minFees}
                    onChange={handleFilterChange}
                    placeholder={t("min")}
                    className="w-1/2 rounded-xl border border-cyan-100 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-400"
                  />
                  <input
                    type="number"
                    name="maxFees"
                    value={filters.maxFees}
                    onChange={handleFilterChange}
                    placeholder={t("max")}
                    className="w-1/2 rounded-xl border border-cyan-100 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {t("minimum_rating")}
                </label>
                <select
                  name="minRating"
                  value={filters.minRating}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-cyan-100 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-cyan-400"
                >
                  {ratingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label === "Any" ? t("any") : option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="h-80 animate-pulse rounded-[1.75rem] bg-cyan-100"
                />
              ))}
            </div>
          ) : filteredLabs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredLabs.map((lab) => {
                const averageRating = getAverageRating(lab.ratings);

                return (
                  <div
                    key={lab._id}
                    onClick={() => navigate(`/my-appointments/${lab._id}`)}
                    className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-cyan-100 bg-white shadow-[0_18px_60px_-30px_rgba(14,116,144,0.4)] transition duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden bg-cyan-50">
                      <img
                        src={lab.image}
                        alt={lab.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {lab.available ? t("available") : t("unavailable")}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900">
                            {lab.name}
                          </h3>
                          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <FaMapMarkerAlt className="text-cyan-700" />
                            {formatAddress(lab.address, t)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-amber-50 px-3 py-2 text-right text-sm font-semibold text-amber-700">
                          <div className="flex items-center gap-1">
                            <FaStar />
                            {averageRating
                              ? averageRating.toFixed(1)
                              : t("new")}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {(lab.services || []).slice(0, 4).map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800"
                          >
                            {getTranslatedService(service)}
                          </span>
                        ))}
                        {(lab.services || []).length > 4 && (
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {t("more_count", {
                              count: lab.services.length - 4,
                            })}
                          </span>
                        )}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                        <p className="text-sm text-slate-500">
                          {t("starting_from")}
                          <span className="ml-2 text-lg font-bold text-cyan-800">
                            {t("egp")} {lab.fees}
                          </span>
                        </p>
                        <span className="text-sm font-semibold text-cyan-700">
                          {t("book_now")}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-cyan-100 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
                <FaFlask className="text-2xl" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                {t("no_labs_found")}
              </h3>
              <p className="mt-2 text-slate-500">{t("no_labs_description")}</p>
              <button
                onClick={clearFilters}
                className="mt-6 rounded-full bg-cyan-700 px-6 py-3 font-semibold text-white transition hover:bg-cyan-800"
              >
                {t("reset_filters")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Labs;
