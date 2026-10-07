"use client";

import { useState } from "react";
import Image from "next/image";
import { ABOUT_DATA } from "@/src/data/about";
import { GUSTO_EVENTS } from "@/src/data/events";
import { CORE_CONTACTS } from "@/src/data/contacts";
import {
  X,
  Sparkles,
  ShieldCheck,
  Phone,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Calendar,
  Clock,
  ArrowRight,
  Flame,
} from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedEventId?: string;
}

export function RegisterModal({
  isOpen,
  onClose,
  preSelectedEventId,
}: RegisterModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "3rd Year",
    selectedEvents: preSelectedEventId
      ? [preSelectedEventId]
      : ([] as string[]),
    transactionId: "",
  });

  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(
    null
  );
  const [screenshotBase64, setScreenshotBase64] = useState<string>("");
  const [screenshotName, setScreenshotName] = useState<string>("");

  const [submitted, setSubmitted] = useState(false);
  const [regCode, setRegCode] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setScreenshotName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;

      setScreenshotPreview(result);

      // Strip data URL prefix for raw base64 if needed
      const base64 = result.split(",")[1] || result;
      setScreenshotBase64(base64);
    };

    reader.readAsDataURL(file);
  };

  const regCoordinators = CORE_CONTACTS.filter(
    (c) => c.category === "Registration Coordinator"
  );

  // Identify occupied offline time slots from currently selected events
  const selectedEventObjects = formData.selectedEvents
    .map((id) => GUSTO_EVENTS.find((e) => e.id === id))
    .filter(Boolean) as (typeof GUSTO_EVENTS)[number][];

  const occupiedTimes = selectedEventObjects
    .filter(
      (e) =>
        e.time &&
        e.time !== "Online Event" &&
        e.eventType !== "SUBMISSION"
    )
    .map((e) => ({
      time: e.time,
      id: e.id,
      title: e.title,
    }));

  // Filter events:
  // An unselected event is hidden if another event with the exact same
  // offline time slot is already selected.
  const visibleEvents = GUSTO_EVENTS.filter((event) => {
    // If it's already selected, always show it so the student can uncheck it
    if (formData.selectedEvents.includes(event.id)) return true;

    // Online submission events never clash with offline schedules
    if (event.time === "Online Event" || event.eventType === "SUBMISSION") {
      return true;
    }

    // Check if its time slot is already taken by a selected event
    const hasConflict = occupiedTimes.some(
      (occ) => occ.time === event.time && occ.id !== event.id
    );

    return !hasConflict;
  });

  const hiddenCount = GUSTO_EVENTS.length - visibleEvents.length;

  if (!isOpen) return null;

  const toggleEvent = (eventId: string, isFull?: boolean) => {
    if (isFull) return;

    setFormData((prev) => {
      const exists = prev.selectedEvents.includes(eventId);

      if (exists) {
        return {
          ...prev,
          selectedEvents: prev.selectedEvents.filter(
            (id) => id !== eventId
          ),
        };
      }

      return {
        ...prev,
        selectedEvents: [...prev.selectedEvents, eventId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.college) {
      alert("Please enter Name, Phone Number, and College Name.");
      return;
    }

    const generated = `GUSTO26-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    setRegCode(generated);

    // Save registration locally for instant /admin visibility
    const newStudent = {
      id: generated,
      timestamp: new Date().toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
      }),
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      college: formData.college,
      department: formData.department,
      year: formData.year,
      selectedEvents: formData.selectedEvents,
      transactionId: formData.transactionId,
      paymentScreenshotUrl: screenshotPreview || "",
      paymentStatus: "Unverified" as const,
      attendance: "Pending" as const,
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("gusto26_admin_registrations") || "[]"
      );

      localStorage.setItem(
        "gusto26_admin_registrations",
        JSON.stringify([newStudent, ...existing])
      );
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    // Forward to Google Apps Script Webhook if configured
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (scriptUrl) {
      fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          action: "register",
          id: generated,
          ...formData,
          screenshotBase64,
          screenshotName,
          screenshotType: "image/jpeg",
        }),
      }).catch((err) =>
        console.error(
          "Error sending to Google Apps Script:",
          err
        )
      );
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white border-[3px] sm:border-[4px] border-black rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[5px_5px_0px_#000] sm:shadow-[10px_10px_0px_#000] text-black my-4 sm:my-8 max-h-[92vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full bg-[#ec4899] text-white border-2 border-black shadow-[2px_2px_0px_#000] hover:scale-105 transition-all cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Confirmation Screen in Neo-Brutalist Arcade Ticket Style */
          <div className="py-4 text-center space-y-5">

            <div className="w-16 h-16 rounded-2xl bg-[#84cc16] border-[3px] border-black text-black flex items-center justify-center mx-auto shadow-[4px_4px_0px_#000]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black text-[#ec4899] uppercase tracking-widest">
                ★ Delegate Pass Generated ★
              </span>

              <h3 className="text-3xl sm:text-4xl font-black text-[#3b0764] mt-1">
                Welcome to GUSTO 2K26!
              </h3>

              <p className="text-xs sm:text-sm font-bold text-zinc-700 mt-1 max-w-md mx-auto">
                Thank you,{" "}
                <strong className="text-black">
                  {formData.fullName}
                </strong>
                ! Your registration has been submitted.
              </p>
            </div>

            {/* Arcade Pass Card */}
            <div className="p-5 rounded-2xl bg-[#fde047] border-[3px] border-black shadow-[5px_5px_0px_#000] text-left max-w-md mx-auto space-y-2">

              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="text-xs font-black uppercase text-zinc-700">
                  Pass Code:
                </span>

                <span className="font-mono text-lg font-black text-[#3b0764] tracking-wider">
                  {regCode}
                </span>
              </div>

              <div className="text-xs font-bold text-black space-y-1">
                <p>
                  <strong>College:</strong> {formData.college}
                </p>

                <p>
                  <strong>Dept:</strong> {formData.department} (
                  {formData.year})
                </p>

                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>

                <p>
                  <strong>Fee:</strong> ₹{ABOUT_DATA.registrationFee}{" "}
                  (UTR: {formData.transactionId || "At Desk"})
                </p>

                <p>
                  <strong>Events:</strong>{" "}
                  {formData.selectedEvents.length} selected
                </p>
              </div>
            </div>

            {/* Participant Next Steps */}
            <div className="p-4 rounded-xl bg-zinc-100 border-2 border-black text-xs font-bold text-left space-y-1.5">
              <p className="font-black text-[#3b0764] uppercase">
                Important Instructions:
              </p>

              <ul className="list-disc list-inside space-y-1 text-zinc-700">
                <li>
                  Show this pass code{" "}
                  <strong className="text-black">
                    {regCode}
                  </strong>{" "}
                  at the GCEE campus registration desk on October 23,
                  2026.
                </li>

                <li>
                  For Paper or Project Presentation, the team leader
                  must submit the abstract with team member codes on or
                  before October 21, 2026.
                </li>

                <li>
                  For Online Submissions (Photography, Meme, Short
                  Film), send entries to the event email before October
                  22, 2026 (12:00 PM).
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="neo-btn px-6 py-3 rounded-full bg-[#ec4899] text-white font-black text-sm uppercase tracking-wider cursor-pointer"
            >
              Close & Return to Symposium
            </button>
          </div>
        ) : (
          /* Form & QR Code */
          <div>

            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fde047] border-2 border-black text-[11px] font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>Symposium Registration</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#3b0764]">
                Register for GUSTO &apos;26
              </h3>

              <p className="text-xs font-bold text-zinc-600 mt-0.5">
                Fee:{" "}
                <strong className="text-black">
                  ₹{ABOUT_DATA.registrationFee}
                </strong>{" "}
                • Last Date: {ABOUT_DATA.registrationLastDate}
              </p>
            </div>

            {/* UPI QR Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#fffbeb] border-[2.5px] sm:border-[3px] border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] mb-4 sm:mb-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-white p-2 shrink-0 border-2 border-black">
                <Image
                  src="/placeholder/payment_qrcode.jpeg"
                  alt="GUSTO Registration UPI QR Code"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5 text-center sm:text-left">

                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <QrCode className="w-4 h-4 text-[#ec4899]" />

                  <span className="text-xs font-black uppercase text-black">
                    UPI Payment QR Code
                  </span>
                </div>

                <p className="text-xs font-bold text-zinc-700 leading-snug">
                  Scan using Google Pay, PhonePe, or Paytm to pay{" "}
                  <strong className="text-black font-black">
                    ₹{ABOUT_DATA.registrationFee}
                  </strong>
                  .
                </p>

                <div className="text-[11px] font-bold text-zinc-700 pt-1">
                  <span>Helpdesk Contacts:</span>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {regCoordinators.map((c) => (
                      <a
                        key={c.id}
                        href={`tel:${c.phone}`}
                        className="inline-flex items-center gap-1 text-[#3b0764] hover:underline font-black"
                      >
                        <Phone className="w-2.5 h-2.5" />
                        <span>
                          {c.name}: {c.phone}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                    Phone (WhatsApp) *
                  </label>

                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                    College / Institution *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="College Name"
                    value={formData.college}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        college: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                    Department
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Information Technology"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                    Year of Study
                  </label>

                  <select
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-bold focus:outline-none"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
              </div>

              {/* Event Checkboxes */}
              <div>

                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-black uppercase text-zinc-800">
                    Select Participating Events:
                  </label>

                  {hiddenCount > 0 && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      ⏰ {hiddenCount} conflicting event
                      {hiddenCount > 1 ? "s" : ""} hidden
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-2 rounded-xl bg-zinc-50 border-2 border-black">

                  {visibleEvents.map((event) => {
                    const isSelected =
                      formData.selectedEvents.includes(event.id);

                    return (
                      <div
                        key={event.id}
                        onClick={() =>
                          toggleEvent(event.id, event.isSlotsFull)
                        }
                        className={`flex items-center justify-between p-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          event.isSlotsFull
                            ? "opacity-50 cursor-not-allowed bg-red-100"
                            : isSelected
                              ? "bg-[#ec4899] text-white border border-black shadow-[2px_2px_0px_#000]"
                              : "bg-white hover:bg-zinc-100 text-black border border-black"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate min-w-0">

                          <input
                            type="checkbox"
                            disabled={event.isSlotsFull}
                            checked={isSelected}
                            onChange={() => {}}
                            className="rounded pointer-events-none shrink-0"
                          />

                          <div className="truncate">

                            <span className="truncate block">
                              {event.title}
                            </span>

                            <span
                              className={`text-[10px] block ${
                                isSelected
                                  ? "text-pink-100"
                                  : "text-zinc-500"
                              }`}
                            >
                              {event.time}
                            </span>

                          </div>
                        </div>

                        {event.isSlotsFull ? (
                          <span className="text-[10px] text-red-600 font-black shrink-0">
                            FULL
                          </span>
                        ) : (
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 font-bold ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {event.category}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {hiddenCount > 0 && (
                  <p className="text-[10px] font-bold text-amber-700 mt-1">
                    ℹ️ Events occurring at the same time as your selected
                    event are automatically hidden to avoid schedule
                    clashes.
                  </p>
                )}
              </div>

              {/* Payment Screenshot Proof (Google Drive Storage) */}
              <div>

                <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                  Payment Screenshot Proof (Stored to Drive)
                </label>

                <div className="relative border-2 border-dashed border-black rounded-xl p-3 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer text-center">

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {screenshotPreview ? (
                    <div className="flex items-center gap-3">

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={screenshotPreview}
                        alt="Payment Receipt Preview"
                        className="w-12 h-12 object-cover rounded-lg border border-black shadow-[2px_2px_0px_#000]"
                      />

                      <div className="text-left truncate">

                        <span className="text-xs font-black text-emerald-700 block truncate">
                          ✓ {screenshotName || "Receipt Attached"}
                        </span>

                        <span className="text-[10px] text-zinc-500 font-bold block">
                          Click to change screenshot
                        </span>

                      </div>
                    </div>
                  ) : (
                    <div className="py-2">

                      <p className="text-xs font-black text-zinc-800">
                        📁 Click or drag UPI payment screenshot here
                      </p>

                      <p className="text-[10px] text-zinc-500 font-bold mt-0.5">
                        PNG, JPG, or JPEG (Max 5MB) • Auto-uploaded to Admin
                        Drive
                      </p>

                    </div>
                  )}
                </div>
              </div>

              {/* UTR Number */}
              <div>

                <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                  UPI UTR / Transaction Reference ID
                </label>

                <input
                  type="text"
                  placeholder="e.g. 4083XXXXXXXX"
                  value={formData.transactionId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactionId: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-50 border-2 border-black text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">

                <button
                  type="submit"
                  className="neo-btn w-full py-3.5 px-4 rounded-full font-black text-sm text-white bg-[#ec4899] hover:bg-[#db2777] shadow-[4px_4px_0px_#000] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />

                  <span>
                    Submit & Generate Pass (₹
                    {ABOUT_DATA.registrationFee})
                  </span>

                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}