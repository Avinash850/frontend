import React, { useState, useEffect } from "react";
import { enquiryService } from "../services/enquiryService";
import { hospitalService } from "../services/hospitalService";

const GetInTouch = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState(""); // selected city name
  const [service, setService] = useState("");
  const [otherService, setOtherService] = useState("");
  const [showOtherService, setShowOtherService] = useState(false);
  const [message, setMessage] = useState("");
  const [cities, setCities] = useState<{id: number, name: string}[]>([]);

  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await hospitalService.getCities();
        setCities(data); // assuming data is array of {id, name}
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    };
    fetchCities();
  }, []);

  const validateEmail = (value: string) => {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfoMessage(null);
    setError(null);

    if (!name.trim()) return setError("Patient name is required.");
    if (!mobile.trim()) return setError("Mobile number is required.");
    if (!service || service === "Select a service") return setError("Please select a service.");
    if (showOtherService && !otherService.trim()) return setError("Please enter your service in 'Other'.");
    if (!validateEmail(email)) return setError("Invalid email format.");

    const payload = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim() || null,
      city: city || null, // save city name
      service: showOtherService ? otherService.trim() : service,
      message: message.trim() || null
    };

    try {
      setLoading(true);
      const res = await enquiryService.createEnquiry(payload);
      setInfoMessage(res.data?.message || "Enquiry submitted successfully!");
      setName(""); setMobile(""); setEmail(""); setCity(""); setService(""); setOtherService(""); setMessage(""); setShowOtherService(false);
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to submit enquiry. Please try again later.");
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
    <section className="py-12 sm:py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">Get in Touch</h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-slate-600">
            Ready to take the next step? Our experts are here to help.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Patient Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Mobile Number *</label>
                <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Email (Optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Area dropdown */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Select City (Optional)</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
                >
                  <option value="">Select an city</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 top-7 px-3 text-slate-700">▼</div>
              </div>

              {/* Service */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Select Service *</label>
                <select value={service} onChange={(e) => {
                  setService(e.target.value);
                  setShowOtherService(e.target.value === "Other");
                }}
                  className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
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

              {showOtherService && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Enter Your Service *</label>
                  <input type="text" value={otherService} onChange={(e) => setOtherService(e.target.value)}
                    placeholder="Describe your service"
                    className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1 sm:mb-2">Message (Optional)</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here…"
                  className="w-full bg-slate-100 p-2.5 sm:p-3 rounded-lg border border-slate-200 h-24 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-5">
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-rose-500 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 text-lg sm:text-lg shadow-lg disabled:opacity-60"
              >
                <SendIcon />
                <span className="hidden sm:inline">{loading ? "Submitting..." : "Book Free Appointment"}</span>
                <span className="sm:hidden">{loading ? "Submitting..." : "Book"}</span>
              </button>
            </div>
          </form>

          {infoMessage && <p className="text-center text-green-600 mt-4">{infoMessage}</p>}
          {error && <p className="text-center text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;