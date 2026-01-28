import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, ArrowLeft, Printer, Copy } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { generateUserId } from "../utils/generateId";
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('FFyoZMeqTVWPiNlqK'); // Replace with your EmailJS public key

const Registration = () => {
  const [searchParams] = useSearchParams();
  const eventIdFromUrl = searchParams.get('event');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    event: "",
    teamType: "solo", // For Cosplay event
    participantType: "inside", // inside or outside
    utrNumber: "",
    userId: generateUserId(),
  });

  // Map of event IDs to event details with inside/outside pricing
  const eventDetails = {
    '1': { 
      name: 'Voice of Ekarikthin', 
      inside: 700, 
      outside: 700,
      teamSize: 'Solo'
    },
    '2': { 
      name: 'Ritzy', 
      inside: 800, 
      outside: 800,
      teamSize: 'Solo'
    },
    '3': { 
      name: 'Cosplay', 
      inside: { solo: 500, duo: 800, group: 1000 },
      outside: { solo: 500, duo: 800, group: 1000 },
      teamSize: 'Solo/Duo/Group',
      hasTeamType: true
    },
    '4': { 
      name: 'Rockville', 
      inside: 2000, 
      outside: 3500,
      teamSize: 'Band'
    },
    '5': { 
      name: 'BGMI', 
      inside: 600, 
      outside: 1500,
      teamSize: '4 members'
    },
    '6': { 
      name: 'MLBB', 
      inside: 750, 
      outside: 2000,
      teamSize: '5 members'
    },
    '7': { 
      name: 'Survive NIT', 
      inside: 50, 
      outside: 100,
      teamSize: 'Solo'
    },
    '8': { 
      name: 'Pitch It', 
      inside: 50, 
      outside: 100,
      teamSize: '1-3 members'
    },
    '9': { 
      name: 'Brain Snap', 
      inside: 50, 
      outside: 100,
      teamSize: 'Solo'
    },
    '10': { 
      name: 'Spell Bee', 
      inside: 50, 
      outside: 100,
      teamSize: 'Solo'
    },
    '11': { 
      name: 'Circuit X', 
      inside: 50, 
      outside: 100,
      teamSize: '1-2 members'
    },
    '12': { 
      name: 'Rangoli', 
      inside: 50, 
      outside: 100,
      teamSize: '1-2 members'
    },
    '13': { 
      name: 'Reel of Ekarikthin', 
      inside: 0, 
      outside: 0,
      teamSize: 'Solo'
    },
    '14': { 
      name: 'Photo of Ekarikthin', 
      inside: 0, 
      outside: 0,
      teamSize: 'Solo'
    },
    '15': { 
      name: 'Men\'s Marathon', 
      inside: 100, 
      outside: 200,
      teamSize: 'Solo'
    },
    '16': { 
      name: 'Women\'s Marathon', 
      inside: 70, 
      outside: 150,
      teamSize: 'Solo'
    },
    '17': { 
      name: 'Futsal', 
      inside: 1500, 
      outside: 3000,
      teamSize: '5-7 members'
    },
  };

  // Get current event details
  const currentEvent = formData.event ? Object.values(eventDetails).find(e => e.name === formData.event) : null;

  // Get current event price based on participant type (inside/outside) and team type (for Cosplay)
  const getEventPrice = () => {
    if (!formData.event) return { inside: 0, outside: 0 };
    const event = Object.values(eventDetails).find(details => details.name === formData.event);
    if (!event) return { inside: 0, outside: 0 };
    
    // For Cosplay, return the price based on team type
    if (event.name === 'Cosplay' && formData.teamType) {
      return {
        inside: event.inside[formData.teamType],
        outside: event.outside[formData.teamType],
        teamSize: event.teamSize
      };
    }
    
    // For other events
    return {
      inside: event.inside,
      outside: event.outside,
      teamSize: event.teamSize
    };
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Set initial event from URL parameter
  useEffect(() => {
    if (eventIdFromUrl && eventDetails[eventIdFromUrl]) {
      setFormData(prev => ({
        ...prev,
        event: eventDetails[eventIdFromUrl].name
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

      // Add user ID to form submission
      formDataToSend.append("entry.1565644006", formData.userId); // Replace with your actual Google Form field ID

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      // Prepare email template parameters
      const emailData = {
        service_id: 'service_0b6q16h',
        template_id: 'template_nwz4kjh',
        user_id: 'FFyoZMeqTVWPiNlqK',
        template_params: {
          to_email: formData.email.trim(),
          to_name: formData.name.trim(),
          event_name: formData.event || 'Selected Event',
          registration_id: formData.userId,
          utr_number: formData.utrNumber.trim(),
          amount: formData.event ? getEventPrice()[formData.participantType] : 0,
          participant_type: formData.participantType === 'inside' ? 'Inside NITN' : 'Outside NITN',
          date: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          from_name: 'Ekarikthin 2026',
          reply_to: 'ekarikthin@nitnagaland.ac.in',
          // Add the recipient email in multiple formats to ensure it's recognized
          email: formData.email.trim(),
          user_email: formData.email.trim(),
          recipient: formData.email.trim()
        }
      };

      console.log('Sending email with data:', JSON.stringify(emailData, null, 2));

      // Send email using EmailJS with error handling
      try {
        // Using the direct fetch API to call EmailJS
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });

        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, message: ${responseData.message || 'Unknown error'}`);
        }
        
        console.log('Email sent successfully:', responseData);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole registration if email fails
        console.log('Proceeding with registration despite email failure');
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Print the registration details
  const handlePrint = () => {
    window.print();
  };
  
  // Handle scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Effect to handle print styles
  useEffect(() => {
    // Add print styles
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-section, .print-section * {
          visibility: visible;
        }
        .print-section {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 20px;
          background: white;
          color: black;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up the style element
      const existingStyle = document.getElementById('print-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  if (isSuccess) {
    // Format the current date and time
    const registrationDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return (
      <div className="flex items-center justify-center p-4 w-full">
        <div className="bg-white/5 rounded-2xl p-6 md:p-8 w-full max-w-2xl text-center border border-white/10 print-section">
          {/* Print Header */}
          <div className="mb-6 border-b border-white/10 pb-4">
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">Ekarikthin 2026</h1>
            <p className="text-gray-400">Registration Confirmation</p>
          </div>
          
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">
              Registration Successful!
            </h2>
            <p className="text-gray-300 mb-4">
              Thank you for registering for Ekarikthin 2026. Your registration has been recorded successfully.
            </p>
            
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-1">Your Registration ID:</p>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
                <code className="text-lg font-mono text-yellow-400">{formData.userId}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(formData.userId);
                    // You can add a toast notification here if you have one
                    alert('Registration ID copied to clipboard!');
                  }}
                  className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
                  title="Copy to clipboard"
                >
                  <Copy size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Please save this ID for future reference</p>
            </div>
          </div>
          
          {/* Registration Details */}
          <div className="bg-black/30 p-6 rounded-xl text-left mb-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4 border-b border-white/10 pb-2">Registration Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white">{formData.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white">{formData.phone}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">College</p>
                <p className="text-white">{formData.college || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Event</p>
                <p className="text-white">{formData.event || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">UTR/Transaction ID</p>
                <p className="text-white font-mono">{formData.utrNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Registration ID</p>
                <p className="text-white font-mono text-sm">{formData.userId}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Registration Date & Time</p>
                <p className="text-white">{registrationDate}</p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            Please keep this confirmation for your records. You may need to present it at the event.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handlePrint}
              className="flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg no-print"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print Confirmation
            </button>
            <Link
              to="/events"
              className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg no-print"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-transparent">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="sticky top-0 z-10 pb-4 pt-6">
          <Link to="/events" className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 flex">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 mb-8">
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            />
            <input
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
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
                {Object.entries(eventDetails).map(([id, details]) => {
                  // For Cosplay, show price range
                  if (details.name === 'Cosplay') {
                    return (
                      <option key={id} value={details.name}>
                        {details.name} (₹500-₹1000)
                      </option>
                    );
                  }
                  // For free events
                  if (details.inside === 0 && details.outside === 0) {
                    return (
                      <option key={id} value={details.name}>
                        {details.name} (Free)
                      </option>
                    );
                  }
                  // For events with same price inside/outside
                  if (details.inside === details.outside) {
                    return (
                      <option key={id} value={details.name}>
                        {details.name} (₹{details.inside})
                      </option>
                    );
                  }
                  // For events with different prices
                  return (
                    <option key={id} value={details.name}>
                      {details.name} (₹{details.inside}-₹{details.outside})
                    </option>
                  );
                })}
              </select>
              {eventIdFromUrl && (
                <div className="absolute inset-0 flex items-center justify-end pr-3 pointer-events-none">
                  <span className="text-xs text-cyan-400 bg-cyan-900/50 px-2 py-1 rounded">
                    Pre-selected
                  </span>
                </div>
              )}
            </div>

            {/* Payment Instructions */}
            <div className="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
              <h4 className="font-medium text-amber-300 mb-2">Payment Instructions</h4>
              <div className="text-sm text-amber-100 space-y-2">
                <div className="space-y-2">
                  <p className="font-medium">
                    Registration Fee: 
                    <span className="text-yellow-300 ml-1">
                      {formData.event ? (
                        currentEvent?.hasTeamType ? (
                          <span>
                            {formData.participantType === 'inside' ? 'Inside' : 'Outside'} - ₹{getEventPrice()[formData.participantType]}
                            {formData.teamType && ` (${formData.teamType.charAt(0).toUpperCase() + formData.teamType.slice(1)})`}
                          </span>
                        ) : (
                          <span>
                            {formData.participantType === 'inside' ? 'Inside' : 'Outside'} - ₹{getEventPrice()[formData.participantType]}
                          </span>
                        )
                      ) : 'Select an event'}
                    </span>
                  </p>
                  {currentEvent?.hasTeamType && (
                    <div className="flex gap-2 flex-wrap">
                      {['solo', 'duo', 'group'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, teamType: type }))}
                          className={`px-3 py-1 text-sm rounded-md ${
                            formData.teamType === type 
                              ? 'bg-cyan-600 text-white' 
                              : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, participantType: 'inside' }))}
                      className={`px-3 py-1 text-sm rounded-md ${
                        formData.participantType === 'inside' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                      }`}
                    >
                      Inside NITN
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, participantType: 'outside' }))}
                      className={`px-3 py-1 text-sm rounded-md ${
                        formData.participantType === 'outside' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                      }`}
                    >
                      Outside NITN
                    </button>
                  </div>
                </div>
                <p>1. Make payment using the QR code or UPI ID below:</p>
                <div className="bg-black/30 p-3 rounded-lg">
                  <p className="font-mono font-bold">kondari@nyes</p>
                  <p className="text-xs text-amber-200">(Single UPI ID for all events)</p>
                  {formData.event && (
                    <p className="text-sm text-green-300 mt-1">
                      Pay ₹{getEventPrice()[formData.participantType]} for {formData.event}
                    </p>
                  )}
                </div>
                <p>2. Enter the UTR/Transaction ID from your payment receipt below</p>
                <p className="text-xs text-amber-200">
                  Note: Registration will be confirmed only after payment verification.
                  Failing to provide correct UTR will result in registration cancellation.
                </p>
                <p className="text-xs mt-2">
                  Need help? Email us at <a href="mailto:techavi@nitnagaland.ac.in" className="text-cyan-300 hover:underline">techavi@nitnagaland.ac.in</a>
                </p>
              </div>
            </div>

            <input
              name="utrNumber"
              placeholder="Enter UTR / Transaction ID *"
              value={formData.utrNumber}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 font-mono"
              required
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
            <div className="flex justify-center mb-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="/images/teja.png" 
                  alt="Scan to Pay" 
                  className="w-64 h-64 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const qrContainer = document.getElementById('dynamic-qr-container');
                    if (qrContainer) qrContainer.style.display = 'block';
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">
                UPI ID: <span className="text-cyan-300 font-mono">kondari@nyes</span>
              </p>
              <p className="text-yellow-300 text-xs">
                Note: Use this single QR code/UPI ID for all event registrations
              </p>
              {formData.event && (
                <div className="mt-2 p-2 bg-black/30 rounded text-sm">
                  <p className="text-amber-300">Selected Event: {formData.event}</p>
                  <p className="text-green-300">
                    Amount to Pay: ₹{getEventPrice()[formData.participantType]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
