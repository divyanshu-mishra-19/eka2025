import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";

const Registration = () => {
  const [searchParams] = useSearchParams();
  const eventIdFromUrl = searchParams.get('event');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    event: "",
    utrNumber: "",
  });
  
  // Map of event IDs to event names
  const eventMap = {
    '1': 'Voice of Ekarikthin',
    '2': 'Battle of Bands',
    '3': 'Drama Competition',
    '4': 'Fashion Show',
    '5': 'BGMI',
    '6': 'Cricket',
    '7': 'Football',
    '8': 'Chess',
    '9': 'Brain Snap',
    '10': 'Treasure Hunt',
    '11': 'Dance Competition',
    '12': 'Rangoli',
    '13': 'Face Painting',
    '14': 'Photography',
    '15': 'MEN\'S MARATHON',
    '16': 'WOMEN\'S MARATHON',
    '17': 'Mr. & Ms. Ekarikthin',
    '18': 'Rap Battle',
    '19': 'Standup Comedy',
    '20': 'Solo Singing',
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Set initial event from URL parameter
  useEffect(() => {
    if (eventIdFromUrl && eventMap[eventIdFromUrl]) {
      setFormData(prev => ({
        ...prev,
        event: eventMap[eventIdFromUrl]
      }));
    }
  }, [eventIdFromUrl]);

  // ✅ Google Form POST URL
  const GOOGLE_FORM_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSe-Bx8dB6XiClI8PDsd0g4WjgPvAmsA-7LK-8CiNbdRF4fKHg/formResponse";

  const PAYMENT_UPI_ID = "hrishabhraaj@ybl";
  const PAYMENT_AMOUNT = "100";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.utrNumber) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formDataToSend = new FormData();

      // 🔥 REQUIRED FIELDS
      formDataToSend.append("entry.339839069", formData.name.trim());
      formDataToSend.append("entry.1957051739", formData.email.trim());
      formDataToSend.append("entry.782413916", formData.phone.trim());
      formDataToSend.append("entry.1064653832", formData.utrNumber.trim());

      // 🔹 OPTIONAL FIELDS
      if (formData.college.trim()) {
        formDataToSend.append("entry.1363591069", formData.college.trim());
      }

      // ✅ EVENT (CORRECT ENTRY ID FROM YOUR LINK)
      if (formData.event) {
        formDataToSend.append("entry.82158280", formData.event);
      }

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-6">
        <div className="bg-white/5 rounded-2xl p-8 max-w-md w-full text-center border border-white/10">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-cyan-300 mb-4">
            Registration Successful!
          </h1>
          <p className="text-gray-300 mb-6">
            Your registration for Ekarikthin 2026 has been recorded.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-cyan-300 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 bg-white/5 p-8 rounded-2xl border border-white/10">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
            />
            <input
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
            />

            {/* EVENT DROPDOWN */}
            <div className="relative">
              <select
                name="event"
                value={formData.event}
                onChange={handleChange}
                disabled={!!eventIdFromUrl}
                className={`w-full p-3 rounded-lg bg-black/40 border ${eventIdFromUrl ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-white/10'}`}
              >
                <option value="">Select Event {eventIdFromUrl ? '' : '(Optional)'}</option>
                {Object.entries(eventMap).map(([id, name]) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {eventIdFromUrl && (
                <div className="absolute inset-0 flex items-center justify-end pr-3 pointer-events-none">
                  <span className="text-xs text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded">
                    Pre-selected
                  </span>
                </div>
              )}
            </div>

            <input
              name="utrNumber"
              placeholder="UTR / Transaction ID"
              value={formData.utrNumber}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10"
            />

            <button
              disabled={isSubmitting}
              className="w-full bg-cyan-600 py-3 rounded-lg hover:bg-cyan-700"
            >
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </button>
          </form>

          {/* PAYMENT */}
          <div className="bg-black/30 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Payment</h3>
            <div className="bg-white p-3 rounded-lg inline-block mb-4">
              <QRCode
                value={`upi://pay?pa=${PAYMENT_UPI_ID}&pn=Ekarikthin%202026&am=${PAYMENT_AMOUNT}&cu=INR`}
                size={180}
              />
            </div>
            <p className="text-gray-400 text-sm">
              UPI ID: <span className="text-cyan-300">{PAYMENT_UPI_ID}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
