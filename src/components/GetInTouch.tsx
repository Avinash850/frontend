import React, { useState } from "react";
import { enquiryService } from "../services/enquiryService";

const GetInTouch = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [service, setService] = useState("");
  const [otherService, setOtherService] = useState("");
  const [showOtherService, setShowOtherService] = useState(false);
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (value: string) => {
    if (!value) return true; 
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage(null);
    setError(null);

    // Validation
    if (!name.trim()) return setError("Patient name is required.");
    if (!mobile.trim()) return setError("Mobile number is required.");
    if (!service || service === "Select a service")
      return setError("Please select a service.");
    if (showOtherService && !otherService.trim())
      return setError("Please enter your service in 'Other'.");
    if (!validateEmail(email)) return setError("Invalid email format.");

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim() || null,
      city: city || null,
      service: showOtherService ? otherService.trim() : service,
      message: message.trim() || null
    };

    try {
      setLoading(true);
      const res = await enquiryService.createEnquiry(payload);
      setInfoMessage(res.data?.message || "Enquiry submitted successfully!");

      // Reset form
      setName("");
      setMobile("");
      setEmail("");
      setCity("");
      setService("");
      setOtherService("");
      setMessage("");
      setShowOtherService(false);
    } catch (err: any) {
      console.error("Enquiry submit error:", err);
      setError(
        err?.response?.data?.message ||
        "Failed to submit enquiry. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.428A1 1 0 009.172 15V4.828a1 1 0 00-1.02-0.998L2.793 4.575a1 1 0 00-1.169 1.409l7 14c.28.56.986.56 1.266 0l7-14a1 1 0 00-1.169-1.409l-5.403 1.25a1 1 0 00-.894.998V4.28a1 1 0 001.02.998l5.403-1.25a1 1 0 001.169-1.409l-7-14z" />
    </svg>
  );

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Get in Touch</h2>
          <p className="mt-3 text-lg text-slate-600">
            Ready to take the next step? Our experts are here to help.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email Optional */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* City Optional */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Area (Optional)</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
                >
                  <option value="">Select an area</option>
                  <option>South Delhi</option>
                  <option>North Delhi</option>
                  <option>East Delhi</option>
                  <option>West Delhi</option>
                  <option>New Delhi</option>
                  <option>Dwarka</option>
                  <option>Saket</option>
                </select>
                <div className="absolute inset-y-0 right-0 top-7 px-3 text-slate-700">▼</div>
              </div>

              {/* Service Dropdown */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Service *</label>
                <select
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    setShowOtherService(e.target.value === "Other");
                  }}
                  className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
                >
                  <option value="">Select a service</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>Pediatrics</option>
                  <option>General Inquiry</option>
                  <option>Dental</option>
                  <option>ENT</option>
                  <option>Physiotherapy</option>
                  <option>Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 top-7 px-3 text-slate-700">▼</div>
              </div>

              {/* Other Service Field */}
              {showOtherService && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Enter Your Service *</label>
                  <input
                    type="text"
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value)}
                    placeholder="Describe your service"
                    className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here…"
                  className="w-full bg-slate-100 p-3 rounded-lg border border-slate-200 h-24 focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-rose-500 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 text-lg shadow-lg disabled:opacity-60"
              >
                <SendIcon />
                {loading ? "Submitting..." : "Book Free Appointment"}
              </button>
            </div>
          </form>

          {/* Messages */}
          {infoMessage && <p className="text-center text-green-600 mt-4">{infoMessage}</p>}
          {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        </div>
      </div>
    </section>
  );
};

export default GetInTouch;