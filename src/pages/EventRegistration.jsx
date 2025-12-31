import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, User, Mail, Phone, Users, IndianRupee, Award } from 'lucide-react';
import PaymentButton from '../components/PaymentButton';

const EventRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
    teamMembers: [{ name: '', email: '', phone: '' }]
  });

  
  const event = location.state?.event;

  useEffect(() => {
    
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  if (!event) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTeamMembers = [...formData.teamMembers];
    updatedTeamMembers[index] = {
      ...updatedTeamMembers[index],
      [name]: value
    };
    setFormData(prev => ({
      ...prev,
      teamMembers: updatedTeamMembers
    }));
  };

  const addTeamMember = () => {
    if (formData.teamMembers.length < 7) { 
      setFormData(prev => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', email: '', phone: '' }]
      }));
    }
  };

  const removeTeamMember = (index) => {
    if (formData.teamMembers.length > 1) {
      const updatedTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        teamMembers: updatedTeamMembers
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation and submission logic will be handled by PaymentButton
  };

  const handlePaymentSuccess = (response) => {
    console.log('Payment successful:', response);
    // Handle successful payment (e.g., show success message, redirect, etc.)
    navigate('/registration-success', { state: { event, paymentId: response.razorpay_payment_id } });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

  // Calculate max team size from the teamSize string (e.g., "2-4 members" -> 4)
  const maxTeamSize = parseInt(event.teamSize.match(/\d+/g)?.pop() || '1');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Event Details */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
              <div className="flex flex-col h-full">
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-white/20 rounded-full mb-4">
                    {event.tag}
                  </span>
                  <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
                  <p className="text-blue-100 mb-6">{event.shortDescription}</p>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-200">Date & Time</p>
                      <p className="font-medium">{event.date} • {event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-200">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-200">Prize Pool</p>
                      <p className="font-medium">₹{event.prizePool?.toLocaleString() || 'TBA'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-200">Team Size</p>
                      <p className="font-medium">{event.teamSize}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <IndianRupee className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-200">Registration Fee</p>
                      <p className="font-medium">₹{event.registrationFee}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Register for {event.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">Fill in your details to complete your registration</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Team Leader Information */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Team Leader Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        College/Institution *
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Information (Conditional) */}
                {maxTeamSize > 1 && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                        Team Information
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formData.teamMembers.length}/{maxTeamSize} members
                      </span>
                    </div>

                    {/* Team Name */}
                    <div className="mb-6">
                      <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Team Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter your team name"
                      />
                    </div>

                    {/* Team Members */}
                    <div className="space-y-4">
                      {formData.teamMembers.map((member, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Team Member {index + 1} {index === 0 && '(You)'}
                            </h4>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Name *
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(index, e)}
                                required={index === 0}
                                disabled={index === 0}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email {index > 0 && '*'}
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={member.email}
                                onChange={(e) => handleTeamMemberChange(index, e)}
                                required={index === 0}
                                disabled={index === 0}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Phone {index > 0 && '*'}
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={member.phone}
                                onChange={(e) => handleTeamMemberChange(index, e)}
                                required={index === 0}
                                disabled={index === 0}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white disabled:opacity-50"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {formData.teamMembers.length < maxTeamSize && (
                        <button
                          type="button"
                          onClick={addTeamMember}
                          className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Team Member
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Registration Fee</span>
                      <span className="font-medium">₹{event.registrationFee}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{event.registrationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="mt-6">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          required
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                          I agree to the{' '}
                          <a href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Terms and Conditions
                          </a>{' '}
                          and{' '}
                          <a href="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Button */}
                  <div className="mt-8">
                    <PaymentButton
                      event={event}
                      userData={{
                        ...formData,
                        eventId: event.id,
                        eventName: event.title,
                        amount: event.registrationFee * 100, // Convert to paise
                      }}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      className="w-full"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventRegistration;
