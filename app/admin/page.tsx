"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { GUSTO_EVENTS } from "@/src/data/events";
import { ABOUT_DATA } from "@/src/data/about";
import { INITIAL_REGISTRATIONS } from "@/src/data/mockRegistrations";
import { StudentRegistration, AttendanceStatus, PaymentStatus } from "@/src/data/types";
import {
  ShieldCheck,
  Lock,
  Unlock,
  Search,
  RefreshCw,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  Eye,
  Filter,
  Users,
  DollarSign,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  X,
} from "lucide-react";

const DEFAULT_ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "gusto2026";
const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";
const STORAGE_KEY = "gusto26_admin_registrations";
const AUTH_KEY = "gusto26_admin_authenticated";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"synced" | "local" | "syncing">("local");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState<"All" | AttendanceStatus>("All");
  const [eventFilter, setEventFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<"All" | PaymentStatus>("All");

  // Screenshot Lightbox Modal
  const [selectedProof, setSelectedProof] = useState<{
    url: string;
    studentName: string;
    passCode: string;
    utr: string;
  } | null>(null);

  // 1. Check Authentication on Mount
  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // 2. Load Registrations from Google Sheet or LocalStorage/Mock
  const loadRegistrations = useCallback(async () => {
    setIsRefreshing(true);

    if (GOOGLE_SCRIPT_URL) {
      try {
        setSyncStatus("syncing");
        const res = await fetch(GOOGLE_SCRIPT_URL);
        const data = await res.json();
        if (data && Array.isArray(data.registrations) && data.registrations.length > 0) {
          setRegistrations(data.registrations);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.registrations));
          setSyncStatus("synced");
          setIsLoading(false);
          setIsRefreshing(false);
          return;
        }
      } catch (err) {
        console.warn("Failed to fetch from Google Apps Script, falling back to local data:", err);
      }
    }

    // Fallback to localStorage or mock data
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRegistrations(JSON.parse(saved));
      } catch {
        setRegistrations(INITIAL_REGISTRATIONS);
      }
    } else {
      setRegistrations(INITIAL_REGISTRATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTRATIONS));
    }

    setSyncStatus(GOOGLE_SCRIPT_URL ? "local" : "local");
    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadRegistrations();
    }
  }, [isAuthenticated, loadRegistrations]);

  // 3. Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPinInput("");
  };

  // 4. One-Click Attendance Toggle (Present / Absent / Pending)
  const handleAttendanceToggle = async (studentId: string, newStatus: AttendanceStatus) => {
    const updatedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Optimistic UI Update
    const updated = registrations.map((r) =>
      r.id === studentId
        ? { ...r, attendance: newStatus, attendanceUpdatedAt: updatedAt }
        : r
    );
    setRegistrations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Sync to Google Sheet Webhook if configured
    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            action: "updateAttendance",
            id: studentId,
            attendance: newStatus,
          }),
        });
      } catch (err) {
        console.error("Error updating Google Sheet attendance:", err);
      }
    }
  };

  // 5. Toggle Payment Status
  const handlePaymentStatusToggle = async (studentId: string) => {
    const student = registrations.find((r) => r.id === studentId);
    if (!student) return;

    const nextStatus: PaymentStatus =
      student.paymentStatus === "Verified" ? "Unverified" : "Verified";

    const updated = registrations.map((r) =>
      r.id === studentId ? { ...r, paymentStatus: nextStatus } : r
    );
    setRegistrations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (GOOGLE_SCRIPT_URL) {
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            action: "updatePaymentStatus",
            id: studentId,
            paymentStatus: nextStatus,
          }),
        });
      } catch (err) {
        console.error("Error updating Google Sheet payment status:", err);
      }
    }
  };

  // 6. Filter & Search Logic
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.fullName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.college.toLowerCase().includes(q) ||
        r.transactionId.toLowerCase().includes(q);

      const matchesAttendance =
        attendanceFilter === "All" || r.attendance === attendanceFilter;

      const matchesEvent =
        eventFilter === "All" || r.selectedEvents.includes(eventFilter);

      const matchesPayment =
        paymentFilter === "All" || r.paymentStatus === paymentFilter;

      return matchesSearch && matchesAttendance && matchesEvent && matchesPayment;
    });
  }, [registrations, searchQuery, attendanceFilter, eventFilter, paymentFilter]);

  // 7. Statistics Metrics
  const stats = useMemo(() => {
    const total = registrations.length;
    const present = registrations.filter((r) => r.attendance === "Present").length;
    const absent = registrations.filter((r) => r.attendance === "Absent").length;
    const pending = registrations.filter((r) => r.attendance === "Pending").length;
    const verifiedPayments = registrations.filter((r) => r.paymentStatus === "Verified").length;
    const totalRevenue = verifiedPayments * (ABOUT_DATA.registrationFee || 250);

    return { total, present, absent, pending, verifiedPayments, totalRevenue };
  }, [registrations]);

  // 8. Export to CSV for On-Desk Paper Backup
  const handleExportCSV = () => {
    const headers = [
      "Pass Code",
      "Registration Time",
      "Student Name",
      "Phone",
      "Email",
      "College",
      "Department",
      "Year",
      "Selected Events",
      "UTR Number",
      "Payment Status",
      "Attendance",
      "Attendance Updated At",
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${r.fullName}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.college.replace(/"/g, '""')}"`,
      `"${r.department}"`,
      `"${r.year}"`,
      `"${r.selectedEvents.join(", ")}"`,
      `"${r.transactionId}"`,
      `"${r.paymentStatus}"`,
      `"${r.attendance}"`,
      `"${r.attendanceUpdatedAt || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gusto26_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN (If not authenticated)
  // ═══════════════════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-retro-yellow-grid flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border-[4px] border-black rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#fde047] border-[3px] border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
              <Lock className="w-8 h-8 text-[#3b0764]" />
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#ec4899] bg-pink-100 px-3 py-1 rounded-full border border-pink-300">
              Staff &amp; Coordinator Portal
            </span>
            <h1 className="text-3xl font-black text-[#3b0764] mt-2">
              GUSTO &apos;26 Admin
            </h1>
            <p className="text-xs font-bold text-zinc-600 mt-1">
              Enter secret coordinator PIN to access registered delegates, verify payments, and mark attendance.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                Admin Secret Passcode
              </label>
              <input
                type="password"
                placeholder="Enter PIN (Default: gusto2026)"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                className={`w-full px-4 py-3 rounded-2xl bg-zinc-50 border-[3px] text-sm font-mono font-bold focus:outline-none focus:bg-white shadow-[2px_2px_0px_#000] ${
                  pinError ? "border-red-500 bg-red-50" : "border-black"
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-xs font-bold text-red-600 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Incorrect PIN. Please check with student secretaries.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="neo-btn w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white bg-[#ec4899] hover:bg-[#db2777] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Desk</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to GUSTO &apos;26 Home</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN ADMIN DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#f8fafc] text-black">
      {/* Top Header Strip */}
      <header className="sticky top-0 z-40 bg-[#fec800] border-b-[3.5px] border-black shadow-[0_4px_0_#000] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white border-2 border-black hover:bg-zinc-100 shadow-[2px_2px_0px_#000]"
              title="Return to site"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#3b0764] tracking-tight">
                  GUSTO &apos;26 Desk // Attendance &amp; Payments
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#84cc16] border border-black text-[10px] font-black uppercase">
                  Live
                </span>
              </div>
              <p className="text-[11px] font-bold text-zinc-700 hidden sm:block">
                Government College of Engineering, Erode • Dept. of Information Technology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadRegistrations}
              disabled={isRefreshing}
              className="neo-btn px-3 py-1.5 rounded-xl bg-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
              title="Refresh from Google Sheet"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="neo-btn px-3 py-1.5 rounded-xl bg-[#06b6d4] text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
              title="Download CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              className="neo-btn px-3 py-1.5 rounded-xl bg-[#ef4444] text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Connection Notice */}
        {!GOOGLE_SCRIPT_URL && (
          <div className="p-3.5 rounded-2xl bg-[#fffbeb] border-[2.5px] border-amber-400 shadow-[3px_3px_0px_#f59e0b] flex items-center justify-between gap-3 text-xs font-bold text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>Offline/Local Cache Mode:</strong> Add <code>NEXT_PUBLIC_GOOGLE_SCRIPT_URL</code> in <code>.env.local</code> to sync live registrations directly with your Google Sheet and Google Drive.
              </span>
            </div>
            <Link
              href="/docs"
              className="px-2.5 py-1 rounded-lg bg-amber-400 text-black text-[11px] font-black shrink-0 hover:bg-amber-500"
            >
              View Setup Guide
            </Link>
          </div>
        )}

        {/* ── METRIC STATS BENTO ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Total Registered */}
          <div className="p-4 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-black uppercase">
              <span>Total Delegates</span>
              <Users className="w-4 h-4 text-[#3b0764]" />
            </div>
            <p className="text-3xl font-black text-[#3b0764] mt-2">{stats.total}</p>
            <span className="text-[10px] font-bold text-zinc-500">Students registered</span>
          </div>

          {/* Present */}
          <div className="p-4 rounded-2xl bg-[#f0fdf4] border-[3px] border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between text-emerald-700 text-xs font-black uppercase">
              <span>Present Today</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-black text-emerald-700 mt-2">{stats.present}</p>
            <span className="text-[10px] font-bold text-emerald-600">
              {stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0}% attendance
            </span>
          </div>

          {/* Absent */}
          <div className="p-4 rounded-2xl bg-[#fef2f2] border-[3px] border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between text-red-700 text-xs font-black uppercase">
              <span>Absent</span>
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-3xl font-black text-red-700 mt-2">{stats.absent}</p>
            <span className="text-[10px] font-bold text-red-600">Not arrived yet</span>
          </div>

          {/* Pending */}
          <div className="p-4 rounded-2xl bg-[#fffbeb] border-[3px] border-black shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between text-amber-700 text-xs font-black uppercase">
              <span>Pending Check-in</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-3xl font-black text-amber-700 mt-2">{stats.pending}</p>
            <span className="text-[10px] font-bold text-amber-600">Awaiting desk arrival</span>
          </div>

          {/* Total Revenue */}
          <div className="p-4 rounded-2xl bg-[#fdf4ff] border-[3px] border-black shadow-[4px_4px_0px_#000] col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-purple-700 text-xs font-black uppercase">
              <span>Fee Collection</span>
              <DollarSign className="w-4 h-4 text-[#ec4899]" />
            </div>
            <p className="text-3xl font-black text-[#ec4899] mt-2">₹{stats.totalRevenue}</p>
            <span className="text-[10px] font-bold text-purple-700">
              {stats.verifiedPayments} verified receipts
            </span>
          </div>
        </div>

        {/* ── FILTER & SEARCH TOOLBAR ── */}
        <div className="p-4 rounded-2xl bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, code, phone, college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none focus:bg-white"
              />
            </div>

            {/* Attendance Filter */}
            <select
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-black text-zinc-800 focus:outline-none"
            >
              <option value="All">All Attendance ({stats.total})</option>
              <option value="Present">Present Only ({stats.present})</option>
              <option value="Absent">Absent Only ({stats.absent})</option>
              <option value="Pending">Pending Only ({stats.pending})</option>
            </select>

            {/* Event Filter */}
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-black text-zinc-800 focus:outline-none"
            >
              <option value="All">All Events</option>
              {GUSTO_EVENTS.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} ({event.time})
                </option>
              ))}
            </select>

            {/* Payment Status Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-black text-zinc-800 focus:outline-none"
            >
              <option value="All">All Payment Statuses</option>
              <option value="Verified">Verified Payments Only</option>
              <option value="Unverified">Unverified Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-zinc-600 pt-1 border-t border-zinc-200">
            <span>
              Showing <strong>{filteredRegistrations.length}</strong> of {registrations.length} students
            </span>
            {(searchQuery || attendanceFilter !== "All" || eventFilter !== "All" || paymentFilter !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setAttendanceFilter("All");
                  setEventFilter("All");
                  setPaymentFilter("All");
                }}
                className="text-[#ec4899] font-black hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* ── REGISTERED STUDENTS DATA TABLE ── */}
        <div className="bg-white border-[3px] border-black rounded-3xl shadow-[6px_6px_0px_#000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#fde047] border-b-[3px] border-black text-black font-black uppercase text-[11px] tracking-wider select-none">
                  <th className="py-3 px-4">Pass Code</th>
                  <th className="py-3 px-4">Student &amp; College</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Events</th>
                  <th className="py-3 px-4">Payment &amp; Proof</th>
                  <th className="py-3 px-4 text-center">Mark Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-zinc-200 font-bold">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500">
                      <AlertCircle className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                      <p className="font-bold">No students found matching current filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((student) => {
                    return (
                      <tr
                        key={student.id}
                        className={`hover:bg-zinc-50 transition-colors ${
                          student.attendance === "Present"
                            ? "bg-emerald-50/40"
                            : student.attendance === "Absent"
                            ? "bg-red-50/30"
                            : ""
                        }`}
                      >
                        {/* Pass Code */}
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-zinc-100 border border-black inline-block text-[#3b0764]">
                            {student.id}
                          </span>
                          <span className="block text-[10px] text-zinc-400 font-normal mt-1">
                            {student.timestamp}
                          </span>
                        </td>

                        {/* Student Details */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-black text-sm text-black">{student.fullName}</div>
                          <div className="text-[11px] text-zinc-600 leading-tight mt-0.5">
                            {student.college}
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-1">
                            {student.department} • <strong className="text-zinc-700">{student.year}</strong>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-4 align-top whitespace-nowrap">
                          <a
                            href={`tel:${student.phone}`}
                            className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-[#ec4899]"
                          >
                            <Phone className="w-3.5 h-3.5 text-zinc-500" />
                            <span>{student.phone}</span>
                          </a>
                          {student.email && (
                            <a
                              href={`mailto:${student.email}`}
                              className="block text-[11px] text-zinc-500 hover:underline truncate max-w-[140px] mt-0.5"
                            >
                              {student.email}
                            </a>
                          )}
                        </td>

                        {/* Events */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {student.selectedEvents.map((eventId) => {
                              const event = GUSTO_EVENTS.find((e) => e.id === eventId);
                              return (
                                <span
                                  key={eventId}
                                  className="px-2 py-0.5 rounded-md bg-zinc-100 border border-black text-[10px] font-black text-black inline-flex items-center gap-1"
                                >
                                  <span>{event?.title || eventId}</span>
                                  {event?.time && (
                                    <span className="text-[9px] text-zinc-500">({event.time})</span>
                                  )}
                                </span>
                              );
                            })}
                          </div>
                        </td>

                        {/* Payment Proof & Verification */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="space-y-1">
                            <div className="font-mono text-[11px] text-zinc-800">
                              UTR: <strong className="text-black">{student.transactionId || "N/A"}</strong>
                            </div>

                            <div className="flex items-center gap-1.5 pt-0.5">
                              {/* View Proof Button */}
                              {student.paymentScreenshotUrl ? (
                                <button
                                  onClick={() =>
                                    setSelectedProof({
                                      url: student.paymentScreenshotUrl,
                                      studentName: student.fullName,
                                      passCode: student.id,
                                      utr: student.transactionId,
                                    })
                                  }
                                  className="px-2 py-1 rounded-md bg-zinc-100 hover:bg-[#fde047] border border-black text-[10px] font-black flex items-center gap-1 cursor-pointer transition-colors"
                                  title="View Google Drive Screenshot"
                                >
                                  <Eye className="w-3 h-3 text-[#3b0764]" />
                                  <span>Proof</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-zinc-400 italic">No image</span>
                              )}

                              {/* Verified Badge / Toggle */}
                              <button
                                onClick={() => handlePaymentStatusToggle(student.id)}
                                className={`px-2 py-1 rounded-md border text-[10px] font-black cursor-pointer transition-colors ${
                                  student.paymentStatus === "Verified"
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-500 hover:bg-emerald-200"
                                    : "bg-amber-100 text-amber-800 border-amber-500 hover:bg-amber-200"
                                }`}
                                title="Click to toggle payment verification"
                              >
                                {student.paymentStatus === "Verified" ? "✓ Verified" : "⏳ Unverified"}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* ⚡ ONE-CLICK ATTENDANCE TOGGLE ⚡ */}
                        <td className="py-3.5 px-4 align-middle text-center">
                          <div className="inline-flex rounded-xl p-1 bg-zinc-100 border-2 border-black shadow-[2px_2px_0px_#000]">
                            {/* Present */}
                            <button
                              onClick={() => handleAttendanceToggle(student.id, "Present")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                                student.attendance === "Present"
                                  ? "bg-[#84cc16] text-black shadow-[1.5px_1.5px_0px_#000] scale-105"
                                  : "text-zinc-600 hover:text-black"
                              }`}
                              title="Mark Present"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
                              <span>Present</span>
                            </button>

                            {/* Absent */}
                            <button
                              onClick={() => handleAttendanceToggle(student.id, "Absent")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                                student.attendance === "Absent"
                                  ? "bg-[#ef4444] text-white shadow-[1.5px_1.5px_0px_#000] scale-105"
                                  : "text-zinc-600 hover:text-black"
                              }`}
                              title="Mark Absent"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Absent</span>
                            </button>

                            {/* Pending */}
                            <button
                              onClick={() => handleAttendanceToggle(student.id, "Pending")}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                                student.attendance === "Pending"
                                  ? "bg-[#facc15] text-black shadow-[1.5px_1.5px_0px_#000] scale-105"
                                  : "text-zinc-600 hover:text-black"
                              }`}
                              title="Mark Pending"
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Pending</span>
                            </button>
                          </div>

                          {student.attendanceUpdatedAt && (
                            <span className="block text-[9px] text-zinc-400 mt-1">
                              Marked at {student.attendanceUpdatedAt}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ═════════════════════════════════════════════════════════════════════════
          GOOGLE DRIVE PAYMENT SCREENSHOT LIGHTBOX MODAL
          ═════════════════════════════════════════════════════════════════════════ */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white border-[4px] border-black rounded-3xl p-5 sm:p-6 shadow-[10px_10px_0px_#000] text-black max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#ec4899] text-white border-2 border-black hover:scale-105 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-black uppercase text-[#ec4899] bg-pink-100 px-2.5 py-0.5 rounded-full border border-pink-300">
                Payment Verification
              </span>
              <h3 className="text-xl font-black text-[#3b0764] mt-1">
                {selectedProof.studentName}
              </h3>
              <p className="text-xs font-mono font-bold text-zinc-600">
                Pass: {selectedProof.passCode} • UTR: {selectedProof.utr || "Not provided"}
              </p>
            </div>

            {/* Image Preview Box */}
            <div className="relative w-full h-80 rounded-2xl bg-zinc-100 border-[3px] border-black overflow-hidden flex items-center justify-center mb-4">
              {selectedProof.url.startsWith("http") ? (
                <iframe
                  src={selectedProof.url.replace("/view?usp=sharing", "/preview").replace("/view", "/preview")}
                  className="w-full h-full border-none"
                  title="Google Drive Payment Receipt"
                />
              ) : (
                <Image
                  src={selectedProof.url || "/placeholder/payment_qrcode.jpeg"}
                  alt="Payment Receipt"
                  fill
                  sizes="400px"
                  className="object-contain p-2"
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={selectedProof.url}
                target="_blank"
                rel="noreferrer"
                className="neo-btn flex-1 py-2.5 px-3 rounded-xl bg-[#06b6d4] text-white text-xs font-black text-center flex items-center justify-center gap-1.5 uppercase tracking-wider"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Google Drive</span>
              </a>

              <button
                onClick={() => {
                  handlePaymentStatusToggle(selectedProof.passCode);
                  setSelectedProof(null);
                }}
                className="neo-btn flex-1 py-2.5 px-3 rounded-xl bg-[#84cc16] text-black text-xs font-black text-center flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verify Payment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
