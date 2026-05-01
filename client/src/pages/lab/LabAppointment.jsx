import React, { useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaFlask,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const formatAddress = (address) => {
  if (!address) return "Address not available";

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

const buildAvailableSlots = (labInfo) => {
  const nextDays = [];
  const today = new Date();
  const slotsBooked = labInfo?.slotsBooked || {};

  for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + dayOffset);

    const start = new Date(currentDate);
    const end = new Date(currentDate);

    start.setHours(dayOffset === 0 ? Math.max(today.getHours() + 1, 9) : 9, 0, 0, 0);
    end.setHours(18, 0, 0, 0);

    const daySlots = [];

    while (start < end) {
      const formattedTime = start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const slotDate = `${start.getDate()}_${start.getMonth() + 1}_${start.getFullYear()}`;
      const isBooked =
        slotsBooked[slotDate] && slotsBooked[slotDate].includes(formattedTime);

      if (!isBooked) {
        daySlots.push({
          dateTime: new Date(start),
          time: formattedTime,
        });
      }

      start.setMinutes(start.getMinutes() + 30);
    }

    nextDays.push(daySlots);
  }

  return nextDays;
};

const LabAppointment = () => {
  const { labId } = useParams();
  const navigate = useNavigate();
  const { axios, token } = useContext(AppContext);

  const [labInfo, setLabInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    const fetchLab = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/lab/list");

        if (data.success) {
          const selectedLab = (data.labs || []).find((lab) => lab._id === labId);
          setLabInfo(selectedLab || null);
          return;
        }

        setLabInfo(null);
      } catch (error) {
        console.error("Error fetching lab details:", error);
        setLabInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [axios, labId]);

  const labSlots = useMemo(() => {
    if (!labInfo) return [];
    return buildAvailableSlots(labInfo);
  }, [labInfo]);

  useEffect(() => {
    const reset = async () => {
      setSlotTime("");
      setSlotIndex(0);
    };
    reset();
  }, [labInfo]);

  const averageRating = useMemo(
    () => getAverageRating(labInfo?.ratings),
    [labInfo],
  );

  const handleBookLab = () => {
    if (!token) {
      toast.warn("Login to continue with lab booking");
      navigate("/login");
      return;
    }

    if (!slotTime) {
      toast.warn("Please select a preferred time slot");
      return;
    }

    toast.info(
      "Lab booking API is not available yet. The page is ready once the backend endpoint is added.",
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-cyan-700" />
      </div>
    );
  }

  if (!labInfo) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-10">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-10 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
            <FaFlask className="text-2xl" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold text-slate-900">
            Lab not found
          </h1>
          <p className="mt-2 text-slate-500">
            We couldn&apos;t find the lab you were trying to open.
          </p>
          <button
            onClick={() => navigate("/labs")}
            className="mt-6 rounded-full bg-cyan-700 px-6 py-3 font-semibold text-white transition hover:bg-cyan-800"
          >
            Back to Labs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 pt-8 md:px-16">
      <Helmet>
        <title>Book Lab Appointment with {labInfo.name} - Roshetta</title>
        <meta
          name="description"
          content={`Explore ${labInfo.name}, review services, and choose a preferred testing slot on Roshetta.`}
        />
      </Helmet>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-cyan-100 bg-white shadow-[0_18px_60px_-30px_rgba(14,116,144,0.4)]">
          <div className="grid gap-0 md:grid-cols-[300px_1fr]">
            <div className="h-full bg-cyan-50">
              <img
                src={labInfo.image || assets.header_lab}
                alt={labInfo.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">
                  {labInfo.name}
                </h1>
                <img
                  className="w-5"
                  src={assets.verified_icon}
                  alt="verified"
                />
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    labInfo.available
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {labInfo.available ? "Available" : "Unavailable"}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <FaStar className="text-amber-500" />
                  {averageRating ? averageRating.toFixed(1) : "New lab"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaPhoneAlt className="text-cyan-700" />
                  {labInfo.mobile || "Phone not available"}
                </span>
              </div>

              <div className="mt-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <FaInfoCircle className="text-cyan-700" />
                  Services
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(labInfo.services || []).map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-800"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Starting fee
                  </p>
                  <p className="mt-1 text-2xl font-bold text-cyan-800">
                    EGP {labInfo.fees}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FaMapMarkerAlt className="text-cyan-700" />
                    Address
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    {formatAddress(labInfo.address)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-[0_18px_60px_-30px_rgba(14,116,144,0.35)] md:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-800">
              <FaCalendarAlt />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Choose a preferred slot
              </h2>
              <p className="text-sm text-slate-500">
                Select a date and time that works for your lab visit.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Available Days
            </p>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {labSlots.map((slots, index) => {
                const firstSlot = slots[0];
                const isSelected = index === slotIndex;

                return (
                  <button
                    key={uuidv4()}
                    onClick={() => setSlotIndex(index)}
                    className={`min-w-[88px] rounded-2xl px-4 py-4 text-center transition ${
                      isSelected
                        ? "bg-cyan-700 text-white"
                        : "border border-cyan-100 bg-cyan-50 text-slate-700"
                    }`}
                  >
                    <p className="text-xs font-semibold">
                      {firstSlot
                        ? daysOfWeek[firstSlot.dateTime.getDay()]
                        : "DAY"}
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      {firstSlot ? firstSlot.dateTime.getDate() : "--"}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FaClock className="text-cyan-700" />
              Available Times
            </p>

            <div className="flex flex-wrap gap-3">
              {labSlots[slotIndex]?.length ? (
                labSlots[slotIndex].map((slot) => (
                  <button
                    key={uuidv4()}
                    onClick={() => setSlotTime(slot.time)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      slot.time === slotTime
                        ? "bg-cyan-700 text-white"
                        : "border border-cyan-100 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No open slots for this day. Try another date.
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleBookLab}
            disabled={!slotTime || !labInfo.available}
            className={`mt-8 w-full rounded-full px-6 py-3 font-semibold transition ${
              slotTime && labInfo.available
                ? "bg-cyan-700 text-white hover:bg-cyan-800"
                : "cursor-not-allowed bg-slate-200 text-slate-500"
            }`}
          >
            {labInfo.available ? "Continue Lab Booking" : "Lab Currently Unavailable"}
          </button>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            The frontend slot picker is ready. Final booking submission still
            depends on a lab-booking API being added on the backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabAppointment;
