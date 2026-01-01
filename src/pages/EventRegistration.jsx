import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Users,
  IndianRupee,
  Award,
} from 'lucide-react';
import PaymentButton from '../components/PaymentButton';

const EventRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Event is expected to be passed via route state:
  // navigate('/events/register', { state: { event } })
  const event = location.state?.event;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    teamName: '',
    teamMembers: [], // additional members (leader is separate)
  });

  useEffect(() => {
    if (!event) {
      navigate('/events');
    }
  }, [event, navigate]);

  if (!event) return null;

  // Parse max team size from text like "1-6 members", "4 members"
  const maxTeamSize = useMemo(() => {
    const match = event.teamSize?.match(/\d+/g);
    if (!match || match.length === 0) return 1;
    return parseInt(match[match.length - 1], 10) || 1;
  }, [event.teamSize]);

  const hasTeam = maxTeamSize > 1;

  // Helpers for registration fee
  const getBaseAmount = (registrationFee) => {
    if (!registrationFee) return 0;
    if (typeof registrationFee === 'number') return registrationFee;
    if (typeof registrationFee === 'object') {
      if (typeof registrationFee.inside === 'number') return registrationFee.inside;
      if (typeof registrationFee.inside === 'object') {
        return (
          registrationFee.inside.solo ||
          registrationFee.inside.group ||
          registrationFee.inside.duo ||
          0
        );
      }
    }
    return 0;
  };

  const getFeeLabel = (registrationFee) => {
    if (!registrationFee) return 'TBA';
    if (typeof registrationFee === 'number') return `₹${registrationFee}`;

    if (typeof registrationFee === 'object') {
      // Flat inside/outside numbers
      if (
        typeof registrationFee.inside === 'number' &&
        typeof registrationFee.outside === 'number'
      ) {
        if (registrationFee.inside === registrationFee.outside) {
          return `₹${registrationFee.inside} (per registration)`;
        }
        return `Inside: ₹${registrationFee.inside} • Outside: ₹${registrationFee.outside}`;
      }

      // Tiered (solo/duo/group)
      if (
        typeof registrationFee.inside === 'object' ||
        typeof registrationFee.outside === 'object'
      ) {
        const iSolo = registrationFee.inside?.solo;
        const oSolo = registrationFee.outside?.solo;
        if (iSolo || oSolo) {
          return `Solo: ₹${iSolo ?? 'N/A'} (Inside), ₹${oSolo ?? 'N/A'} (Outside)`;
        }
        return 'See event details for fee structure';
      }
    }

    return 'TBA';
  };

  const baseAmount = getBaseAmount(event.registrationFee);
  const feeLabel = getFeeLabel(event.registrationFee);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTeamMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.teamMembers];
    updated[index] = {
      ...updated[index],
      [name]: value,
    };
    setFormData((prev) => ({
      ...prev,
      teamMembers: updated,
    }));
  };

  const addTeamMember = () => {
    // total team size = 1 (leader) + teamMembers.length
    if (formData.teamMembers.length + 1 < maxTeamSize) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, { name: '', email: '', phone: '' }],
      }));
    }
  };

  const removeTeamMember = (index) => {
    const updated = formData.teamMembers.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      teamMembers: updated,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actual submission handled in PaymentButton
  };

  const handlePaymentSuccess = (response) => {
    navigate('/registration-success', {
      state: { event, paymentId: response.razorpay_payment_id },
    });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // Optionally show toast/error UI
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 py-10 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-slate-50 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </button>

        <div className="rounded-3xl bg-white dark:bg-slate-950/80 border border-gray-200 dark:border-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_80px_rgba(15,23,42,0.9)] overflow-hidden backdrop-blur-sm transition-colors duration-300">
          <div className="md:flex">
            {/* Left: Event summary */}
            <div className="md:w-5/12 bg-gradient-to-br from-emerald-50 via-sky-50 to-gray-50 dark:from-emerald-500/20 dark:via-sky-500/10 dark:to-slate-950 px-6 sm:px-7 py-6 sm:py-7 flex flex-col gap-5 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-800 transition-colors duration-300">
              <div>
                {/* Image */}
                <div className="relative h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 border border-gray-300 dark:border-slate-800/80 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end gap-2">
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 border border-white/20 text-white">
                        {event.tag || 'Event'}
                      </span>
                      {event.teamSize && (
                        <div className="mt-2 text-[11px] text-slate-200 bg-black/40 inline-flex px-2 py-1 rounded-full border border-white/10">
                          Team: {event.teamSize}
                        </div>
                      )}
                    </div>
                    <div className="text-right text-[11px] text-slate-100/90">
                      <div className="inline-flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full mb-1">
                        <Calendar size={13} />
                        <span>{event.date}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full">
                        <Clock size={13} />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title & short desc */}
                <h1 className="text-xl sm:text-2xl font-bold leading-tight mb-2 text-black dark:text-white transition-colors duration-300">
                  {event.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-slate-100/90 transition-colors duration-300">
                  {event.shortDescription}
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-slate-600/60 to-transparent transition-colors duration-300" />

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 mt-1 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300">Date & Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-1 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 mt-1 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300">Prize Pool</p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-300">
                      ₹{event.prizePool?.toLocaleString() || 'TBA'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 mt-1 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300">Team Size</p>
                    <p className="font-medium text-gray-900 dark:text-white">{event.teamSize || 'Solo'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IndianRupee className="w-4 h-4 mt-1 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-300">Registration Fee</p>
                    <p className="font-medium text-gray-900 dark:text-white">{feeLabel}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:w-7/12 px-6 sm:px-7 py-7 bg-white dark:bg-slate-950 transition-colors duration-300">
              <h2 className="text-xl sm:text-2xl font-bold mb-1 text-gray-900 dark:text-white transition-colors duration-300">
                Register for {event.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-slate-300 mb-6 transition-colors duration-300">
                Fill in your details carefully. You'll be redirected to payment to
                confirm your registration.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Leader info */}
                <div className="bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 transition-colors duration-300">
                  <h3 className="text-sm font-semibold flex items-center gap-2 mb-4 text-gray-900 dark:text-slate-100">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/40">
                      <User className="w-4 h-4 text-emerald-500 dark:text-emerald-300" />
                    </span>
                    Team Leader Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-sm text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-sm text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 dark:text-slate-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-sm text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                        College / Institution *
                      </label>
                      <input
                        type="text"
                        name="college"
                        value={formData.college}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-sm text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Team info */}
                {hasTeam && (
                  <div className="bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-slate-100">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 border border-sky-400/40">
                          <Users className="w-4 h-4 text-sky-500 dark:text-sky-300" />
                        </span>
                        Team Information
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-slate-400">
                        {1 + formData.teamMembers.length}/{maxTeamSize} members (incl. leader)
                      </span>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                        Team Name (optional)
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="Enter your team name"
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-sm text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>

                    <div className="space-y-3">
                      {formData.teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 px-3.5 py-3 transition-colors duration-300"
                        >
                          <div className="flex justify-between items-center mb-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                              Additional Member {index + 1}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeTeamMember(index)}
                              className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Name *
                              </label>
                              <input
                                type="text"
                                name="name"
                                value={member.name}
                                onChange={(e) => handleTeamMemberChange(index, e)}
                                required
                                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-xs text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Email *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={member.email}
                                onChange={(e) => handleTeamMemberChange(index, e)}
                                required
                                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-xs text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-medium text-gray-700 dark:text-slate-300 mb-1.5">
                                Phone *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={member.phone}
                                onChange={(e) => handleTeamMemberChange(index, e)}
                                required
                                className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950/80 border border-gray-300 dark:border-slate-700 text-xs text-gray-900 dark:text-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {formData.teamMembers.length + 1 < maxTeamSize && (
                        <button
                          type="button"
                          onClick={addTeamMember}
                          className="mt-1 inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-200"
                        >
                          <span className="h-5 w-5 mr-1 flex items-center justify-center rounded-full border border-emerald-400 text-emerald-500 dark:text-emerald-300 text-xs">
                            +
                          </span>
                          Add Team Member
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment summary */}
                <div className="bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 transition-colors duration-300">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-slate-100">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                      <IndianRupee className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />
                    </span>
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-slate-300">
                        Registration Fee
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-slate-100">
                        {baseAmount > 0 ? `₹${baseAmount}` : 'TBA'}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-slate-800 pt-3 mt-2">
                      <div className="flex justify-between items-center font-semibold text-base text-gray-900 dark:text-slate-100">
                        <span>Total</span>
                        <span>
                          {baseAmount > 0 ? `₹${baseAmount}` : 'To be decided'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mt-5">
                    <div className="flex items-start gap-2">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs sm:text-sm text-gray-700 dark:text-slate-300"
                      >
                        I agree to the{' '}
                        <a
                          href="/terms"
                          target="_blank"
                          className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-200 underline-offset-2 hover:underline"
                        >
                          Terms & Conditions
                        </a>{' '}
                        and{' '}
                        <a
                          href="/privacy"
                          target="_blank"
                          className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-700 dark:hover:text-emerald-200 underline-offset-2 hover:underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                  </div>

                  {/* Payment button */}
                  <div className="mt-6">
                    <PaymentButton
                      event={event}
                      userData={{
                        ...formData,
                        eventId: event.id,
                        eventName: event.title,
                        amount: baseAmount * 100, // paise
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