import React, { useState, useEffect } from "react";
import { enquiryService } from "../services/enquiryService";
import { hospitalService } from "../services/hospitalService";

type Props = {
  variant?: "full" | "compact";
};

const GetInTouch = ({ variant = "full" }: Props) => {
  const isCompact = variant === "compact";

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [otherService, setOtherService] = useState("");
  const [showOtherService, setShowOtherService] = useState(false);
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hospitalService.getCities().then(setCities).catch(() => {});
    hospitalService.getServices().then(setServices).catch(() => {});
  }, []);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    if (!name.trim()) return setError("Patient name is required.");
    if (!mobile.trim()) return setError("Mobile number is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!validateEmail(email)) return setError("Invalid email format.");
    if (!service) return setError("Please select a service.");
    if (showOtherService && !otherService.trim())
      return setError("Please enter your service.");

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      city: city || null,
      service: showOtherService ? otherService.trim() : service,
      message: message.trim() || null,
      page_url: window.location.href,
    };

    try {
      setLoading(true);
      const res = await enquiryService.createEnquiry(payload);
      setInfoMessage(res.data?.message || "Enquiry submitted successfully!");
      setName("");
      setMobile("");
      setEmail("");
      setCity("");
      setService("");
      setOtherService("");
      setMessage("");
      setShowOtherService(false);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Failed to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full bg-slate-100 rounded-md border border-slate-200
    focus:ring-1 focus:ring-indigo-500
    ${isCompact ? "px-2 py-1.5 text-xs" : "px-3 py-2 text-sm sm:text-base"}`;

  return (
    <section className={`${isCompact ? "" : "bg-slate-50"}`}>
      <div className={`${isCompact ? "" : "container mx-auto px-3 max-w-4xl"}`}>
        <div className={`text-center ${isCompact ? "mb-2" : "mb-2"}`}>
          <h2
            className={`font-semibold text-slate-800 ${
              isCompact ? "text-base" : "text-lg sm:text-2xl"
            }`}
          >
            Enquire Now
          </h2>
        </div>

        <div
          className={`bg-white rounded-xl shadow-lg ${
            isCompact ? "p-3" : "p-3 sm:p-6 md:p-8"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div
              className={`grid grid-cols-1 ${
                isCompact ? "gap-2" : "md:grid-cols-2 gap-3 sm:gap-5"
              }`}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Patient Name *"
                className={inputClass}
              />

              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number *"
                className={inputClass}
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *"
                className={inputClass}
              />

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setShowOtherService(e.target.value === "Other");
                }}
                className={`w-full bg-slate-100 border border-slate-200 rounded-md
                  ${isCompact ? "h-9 px-2 text-xs" : "h-11 px-3 text-sm sm:text-base"}
                `}
              >
                <option value="">Select Service *</option>
                <option value="General Inquiry">General Inquiry</option>
                {services.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>

              {showOtherService && (
                <input
                  value={otherService}
                  onChange={(e) => setOtherService(e.target.value)}
                  placeholder="Enter your service *"
                  className={inputClass}
                />
              )}

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message (Optional)"
                className={`w-full bg-slate-100 rounded-md border border-slate-200
                  ${isCompact ? "h-16 px-2 py-1.5 text-xs md:col-span-2" : "h-24 px-3 py-2 text-sm sm:text-base md:col-span-2"}
                `}
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-600 to-rose-500
                  text-white font-semibold rounded-md
                  ${isCompact ? "py-2 text-xs" : "py-2 sm:py-2.5 text-sm sm:text-base"}
                `}
              >
                {loading ? "Submitting..." : "Book Free Appointment"}
              </button>
            </div>
          </form>

          {infoMessage && (
            <p className="text-center text-green-600 mt-3 text-xs sm:text-sm">
              {infoMessage}
            </p>
          )}
          {error && (
            <p className="text-center text-red-600 mt-3 text-xs sm:text-sm">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;