import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, paymentId } = location.state || {};

  useEffect(() => {
    if (!event) navigate('/events');
  }, [event, navigate]);

  if (!event) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-gray-800 dark:text-slate-50 transition-colors duration-300"
    >
      <div className="max-w-3xl w-full">
        <div className="rounded-3xl bg-white dark:bg-slate-950/90 border border-gray-200 dark:border-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.9)] dark:shadow-[0_24px_80px_rgba(15,23,42,0.9)] overflow-hidden backdrop-blur-sm transition-colors duration-300">
          {/* Header / Icon */}
          <div className="p-7 sm:p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-400/50 transition-colors duration-300">
              <CheckCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Registration Successful!
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-slate-200 transition-colors duration-300">
              Thank you for registering for{' '}
              <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                {event.title}
              </span>
              .
            </p>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
              Your payment ID:{' '}
              <span className="inline-flex items-center font-mono text-[11px] sm:text-xs bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 px-2.5 py-1 rounded-full transition-colors duration-300">
                {paymentId || 'N/A'}
              </span>
            </p>
          </div>

          {/* Optional banner image */}
          {event.image && (
            <div className="relative h-32 sm:h-40 w-full overflow-hidden border-y border-gray-200 dark:border-slate-800 transition-colors duration-300">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/80 via-transparent to-gray-100/80 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
            </div>
          )}

          {/* Event details */}
          <div className="px-7 sm:px-8 pb-7 sm:pb-8 pt-6">
            <div className="bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-5 transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
                Event Details
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Date & Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 mt-0.5 text-emerald-600 dark:text-emerald-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Reporting Time</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Please arrive at least 30 minutes before the event starts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 transition-colors duration-300">
              <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300">
                What&apos;s Next?
              </h3>
              <ul className="list-disc list-inside text-xs sm:text-sm text-gray-700 dark:text-slate-200 space-y-1.5 transition-colors duration-300">
                <li>You&apos;ll receive a confirmation email with all the details.</li>
                <li>
                  Save your payment ID for any future reference or support requests.
                </li>
                <li>
                  Carry a valid college ID / government ID to the venue for verification.
                </li>
                <li>
                  Reach the venue early to avoid last-minute rush and check-in delays.
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/events')}
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 border border-slate-700 text-sm font-medium rounded-full text-emerald-600 dark:text-emerald-300 bg-gray-100 dark:bg-slate-900 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </button>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-slate-950 bg-emerald-400 hover:bg-emerald-500 shadow-lg shadow-emerald-500/40 transition-colors"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationSuccess;