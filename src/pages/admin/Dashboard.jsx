import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Search,
  Download,
  X,
  Check,
  Copy,
  AlertTriangle,
  Clock,
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  Hash,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkPE160UKLJrsBIx3mJhtuTh73S_ji2XlH3g-O7J_AGqhimqPFz280mU0eCYkqKqjeSXAN9I8gSu2C/pub?gid=721965117&single=true&output=csv";

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [event, setEvent] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [verificationUTR, setVerificationUTR] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(GOOGLE_SHEET_CSV_URL);
      const text = await res.text();

      const rows = text
        .split("\n")
        .map((r) => r.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g));

      const headers = rows[0];
      const data = rows.slice(1).map((row) =>
        headers.reduce((acc, h, i) => {
          acc[h.trim()] = row?.[i]?.replace(/"/g, "") || "";
          return acc;
        }, {})
      );

      setRecords(data.reverse());
      setLoading(false);
    };

    fetchData();
  }, []);

  /* ---------------- Derived Data ---------------- */
  const events = useMemo(() => {
    const set = new Set(records.map((r) => r.Event || "General"));
    return ["all", ...Array.from(set)];
  }, [records]);

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        !search ||
        `${r.Name} ${r.Email} ${r.Phone} ${r.Event} ${r["UTR / Transaction ID"]}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all"
          ? true
          : status === "verified"
          ? !!r["UTR / Transaction ID"]
          : !r["UTR / Transaction ID"];

      const matchesEvent =
        event === "all" ? true : (r.Event || "General") === event;

      return matchesSearch && matchesStatus && matchesEvent;
    });
  }, [records, search, status, event]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const stats = useMemo(() => {
    const verified = records.filter((r) => r["UTR / Transaction ID"]).length;
    return {
      total: records.length,
      verified,
      pending: records.length - verified,
      events: events.length - 1,
    };
  }, [records, events]);

  /* ---------------- Export ---------------- */
  const exportCSV = () => {
    if (!filtered.length) return;

    const headers = Object.keys(filtered[0]);
    const csv = [
      headers.join(","),
      ...filtered.map((r) =>
        headers.map((h) => `"${(r[h] || "").replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
  };

  /* ---------------- Handlers ---------------- */
  const handleVerifyUTR = () => {
    if (!verificationUTR.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedRecords = records.map(record => 
        record === selectedRegistration 
          ? { ...record, 'UTR / Transaction ID': verificationUTR }
          : record
      );
      
      setRecords(updatedRecords);
      setSelectedRegistration(prev => ({
        ...prev,
        'UTR / Transaction ID': verificationUTR
      }));
      setVerificationUTR("");
      setIsVerifying(false);
    }, 1000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-cyan-400">Admin Dashboard</h1>
        <p className="text-gray-400">Manage registrations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Total" value={stats.total} icon={<Users />} />
        <Stat title="Events" value={stats.events} icon={<Calendar />} />
        <Stat title="Verified" value={stats.verified} icon={<CheckCircle />} />
        <Stat title="Pending" value={stats.pending} icon={<AlertCircle />} />
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, phone, event, UTR"
            className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
        >
          <option value="all">All</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
        >
          {events.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>

        <button
          onClick={exportCSV}
          className="flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
        {loading ? (
          <p className="p-6 text-gray-400">Loading…</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Event</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((r, i) => (
                <tr 
                  key={i} 
                  className="border-t border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedRegistration(r)}
                >
                  <td className="px-4 py-3">{r.Name}</td>
                  <td className="px-4 py-3">{r.Email}</td>
                  <td className="px-4 py-3 text-cyan-400">
                    {r.Event || "General"}
                  </td>
                  <td className="px-4 py-3">
                    {r["UTR / Transaction ID"] ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-400">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span>Pending</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Registration Details Modal */}
      <AnimatePresence>
        {selectedRegistration && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-cyan-400">Registration Details</h2>
                  <button 
                    onClick={() => {
                      setSelectedRegistration(null);
                      setVerificationUTR("");
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <DetailItem 
                    icon={<UserIcon className="w-5 h-5 text-cyan-400" />} 
                    label="Name" 
                    value={selectedRegistration.Name} 
                  />
                  <DetailItem 
                    icon={<Mail className="w-5 h-5 text-cyan-400" />} 
                    label="Email" 
                    value={selectedRegistration.Email} 
                  />
                  <DetailItem 
                    icon={<Phone className="w-5 h-5 text-cyan-400" />} 
                    label="Phone" 
                    value={selectedRegistration.Phone} 
                  />
                  <DetailItem 
                    icon={<CalendarIcon className="w-5 h-5 text-cyan-400" />} 
                    label="Event" 
                    value={selectedRegistration.Event || "General"} 
                  />
                  
                  {Object.entries(selectedRegistration)
                    .filter(([key]) => !['Name', 'Email', 'Phone', 'Event', 'Timestamp', 'UTR / Transaction ID'].includes(key))
                    .map(([key, value]) => (
                      <DetailItem 
                        key={key}
                        icon={<FileText className="w-5 h-5 text-cyan-400" />} 
                        label={key} 
                        value={value || 'N/A'} 
                      />
                  ))}

                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center mb-2">
                      <Hash className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="font-medium">Payment Status</span>
                      {selectedRegistration["UTR / Transaction ID"] ? (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-900/30 text-green-400 rounded-full flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="ml-2 px-2 py-1 text-xs bg-yellow-900/30 text-yellow-400 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Verification
                        </span>
                      )}
                    </div>

                    {selectedRegistration["UTR / Transaction ID"] ? (
                      <div className="mt-2 p-3 bg-gray-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-300">UTR / Transaction ID</p>
                          <p className="font-mono text-cyan-300">{selectedRegistration["UTR / Transaction ID"]}</p>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(selectedRegistration["UTR / Transaction ID"])}
                          className="text-gray-400 hover:text-cyan-400 p-1"
                          title="Copy UTR"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className="text-sm text-gray-300 mb-2">Verify Payment</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={verificationUTR}
                            onChange={(e) => setVerificationUTR(e.target.value)}
                            placeholder="Enter UTR / Transaction ID"
                            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          <button
                            onClick={handleVerifyUTR}
                            disabled={!verificationUTR.trim() || isVerifying}
                            className={`px-4 py-2 rounded-lg flex items-center ${
                              verificationUTR.trim() 
                                ? 'bg-cyan-600 hover:bg-cyan-500' 
                                : 'bg-gray-700 cursor-not-allowed'
                            }`}
                          >
                            {isVerifying ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                              </>
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Verify
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from(
          { length: Math.ceil(filtered.length / ITEMS_PER_PAGE) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-cyan-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

/* ---------------- Small Components ---------------- */
const Stat = ({ title, value, icon }) => (
  <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="text-cyan-400">{icon}</div>
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="mr-3 mt-0.5">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-gray-100 break-words">{value}</p>
    </div>
  </div>
);

export default Dashboard;
