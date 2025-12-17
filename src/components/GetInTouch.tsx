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

  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hospitalService.getCities().then(setCities).catch(() => { });
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
      source_url: window.location.href,
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

  return (
    <section className={`${isCompact ? "" : "py-8 sm:py-16 bg-slate-50"}`}>
      <div
        className={`${isCompact ? "" : "container mx-auto px-3 sm:px-6 max-w-4xl"}`}
      >
        {/* Heading */}
        <div className={`text-center ${isCompact ? "mb-4" : "mb-8 sm:mb-12"}`}>
          <h2
            className={`font-bold text-slate-800 ${isCompact
                ? "text-lg"
                : "text-xl sm:text-3xl md:text-4xl"
              }`}
          >
            Get in Touch
          </h2>
          <p
            className={`mt-2 text-slate-600 ${isCompact ? "text-sm" : "text-sm sm:text-lg"
              }`}
          >
            Ready to take the next step? Our experts are here to help.
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`bg-white rounded-2xl shadow-xl ${isCompact ? "p-4" : "p-4 sm:p-8 md:p-10"
            }`}
        >
          <form onSubmit={handleSubmit}>
            <div
              className={`grid grid-cols-1 ${isCompact ? "gap-3" : "md:grid-cols-2 gap-3 sm:gap-6"
                }`}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Patient Name *"
                className={`w-full bg-slate-100 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 ${isCompact ? "p-2 text-sm" : "p-2 sm:p-3 text-sm sm:text-base"
                  }`}
              />

              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number *"
                className={`w-full bg-slate-100 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 ${isCompact ? "p-2 text-sm" : "p-2 sm:p-3 text-sm sm:text-base"
                  }`}
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email *"
                className={`w-full bg-slate-100 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 ${isCompact ? "p-2 text-sm" : "p-2 sm:p-3 text-sm sm:text-base"
                  }`}
              />

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full bg-slate-100 rounded-lg border border-slate-200 ${isCompact ? "p-2 text-sm" : "p-2 sm:p-3 text-sm sm:text-base"
                  }`}
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select value={service} onChange={(e) => {
                setService(e.target.value);
                setShowOtherService(e.target.value === "Other");
              }}
                className={`w-full bg-slate-100 border border-slate-200 rounded-lg              appearance-none leading-none
                  ${isCompact
                    ? "h-10 px-3 text-sm"
                    : "h-12 px-4 text-base"}
                `}
              >
                <option value="">Select Service *</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Pediatrics</option>
                <option>Dental</option>
                <option>ENT</option>
                <option>Physiotherapy</option>
                <option>General Inquiry</option>
                <option>Other</option>
              </select>

              {showOtherService && (
                <input value={otherService} onChange={(e) => setOtherService(e.target.value)}
                  placeholder="Enter your service *"
                  className={`w-full bg-slate-100 rounded-lg border border-slate-200 ${isCompact ? "p-2 text-sm" : "p-2 sm:p-3 text-sm sm:text-base"
                    }`}
                />
              )}
              <textarea value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message (Optional)"
                className={`w-full bg-slate-100 rounded-lg border border-slate-200 h-24
    ${isCompact ? "p-2 text-sm md:col-span-2" : "p-2 sm:p-3 text-sm sm:text-base md:col-span-2"}
  `}
              />

            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-600 to-rose-500 text-white font-bold rounded-lg ${isCompact
                    ? "py-2 text-sm"
                    : "py-2.5 sm:py-3 text-base sm:text-lg"
                  }`}
              >
                {loading ? "Submitting..." : "Book Free Appointment"}
              </button>
            </div>
          </form>

          {infoMessage && (
            <p className="text-center text-green-600 mt-4 text-sm">
              {infoMessage}
            </p>
          )}
          {error && (
            <p className="text-center text-red-600 mt-4 text-sm">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;