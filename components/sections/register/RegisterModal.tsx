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
    selectedEvents: preSelectedEventId ? [preSelectedEventId] : ([] as string[]),
    transactionId: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [regCode, setRegCode] = useState("");

  const regCoordinators = CORE_CONTACTS.filter(
    (c) => c.category === "Registration Coordinator"
  );

  if (!isOpen) return null;

  const toggleEvent = (eventId: string, isFull?: boolean) => {
    if (isFull) return;
    setFormData((prev) => {
      const exists = prev.selectedEvents.includes(eventId);
      if (exists) {
        return {
          ...prev,
          selectedEvents: prev.selectedEvents.filter((id) => id !== eventId),
        };
      } else {
        return {
          ...prev,
          selectedEvents: [...prev.selectedEvents, eventId],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.college) {
      alert("Please enter Name, Phone Number, and College Name.");
      return;
    }

    const generated = `GUSTO26-${Math.floor(100000 + Math.random() * 900000)}`;
    setRegCode(generated);
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
                Thank you, <strong className="text-black">{formData.fullName}</strong>! Your registration has been submitted.
              </p>
            </div>

            {/* Arcade Pass Card */}
            <div className="p-5 rounded-2xl bg-[#fde047] border-[3px] border-black shadow-[5px_5px_0px_#000] text-left max-w-md mx-auto space-y-2">
              <div className="flex items-center justify-between border-b-2 border-black pb-2">
                <span className="text-xs font-black uppercase text-zinc-700">Pass Code:</span>
                <span className="font-mono text-lg font-black text-[#3b0764] tracking-wider">
                  {regCode}
                </span>
              </div>
              <div className="text-xs font-bold text-black space-y-1">
                <p><strong>College:</strong> {formData.college}</p>
                <p><strong>Dept:</strong> {formData.department} ({formData.year})</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Fee:</strong> ₹{ABOUT_DATA.registrationFee} (UTR: {formData.transactionId || "At Desk"})</p>
                <p><strong>Events:</strong> {formData.selectedEvents.length} selected</p>
              </div>
            </div>

            {/* Participant Next Steps */}
            <div className="p-4 rounded-xl bg-zinc-100 border-2 border-black text-xs font-bold text-left space-y-1.5">
              <p className="font-black text-[#3b0764] uppercase">Important Instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-zinc-700">
                <li>Show this pass code <strong className="text-black">{regCode}</strong> at the GCEE campus registration desk on March 06, 2026.</li>
                <li>For Paper or Project Presentation, the team leader must submit the abstract with team member codes on or before March 04, 2026.</li>
                <li>For Online Submissions (Photography, Meme, Short Film), send entries to the event email before March 05, 2026 (12:00 PM).</li>
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
                Fee: <strong className="text-black">₹{ABOUT_DATA.registrationFee}</strong> • Last Date: {ABOUT_DATA.registrationLastDate}
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
                  Scan using Google Pay, PhonePe, or Paytm to pay <strong className="text-black font-black">₹{ABOUT_DATA.registrationFee}</strong>.
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
                        <span>{c.name}: {c.phone}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
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
                      setFormData({ ...formData, fullName: e.target.value })
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
                      setFormData({ ...formData, phone: e.target.value })
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
                      setFormData({ ...formData, email: e.target.value })
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
                      setFormData({ ...formData, college: e.target.value })
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
                      setFormData({ ...formData, department: e.target.value })
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
                      setFormData({ ...formData, year: e.target.value })
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
                <label className="block text-xs font-black uppercase text-zinc-800 mb-1">
                  Select Participating Events:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-xl bg-zinc-50 border-2 border-black">
                  {GUSTO_EVENTS.map((event) => {
                    const isSelected = formData.selectedEvents.includes(event.id);
                    return (
                      <div
                        key={event.id}
                        onClick={() => toggleEvent(event.id, event.isSlotsFull)}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${event.isSlotsFull
                            ? "opacity-50 cursor-not-allowed bg-red-100"
                            : isSelected
                              ? "bg-[#ec4899] text-white border border-black shadow-[2px_2px_0px_#000]"
                              : "bg-white hover:bg-zinc-100 text-black border border-black"
                          }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <input
                            type="checkbox"
                            disabled={event.isSlotsFull}
                            checked={isSelected}
                            onChange={() => { }}
                            className="rounded pointer-events-none"
                          />
                          <span className="truncate">{event.title}</span>
                        </div>
                        {event.isSlotsFull ? (
                          <span className="text-[10px] text-red-600 font-black shrink-0">
                            FULL
                          </span>
                        ) : (
                          <span className="text-[10px] opacity-80 shrink-0">
                            {event.category}
                          </span>
                        )}
                      </div>
                    );
                  })}
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
                    setFormData({ ...formData, transactionId: e.target.value })
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
                  <span>Submit & Generate Pass (₹{ABOUT_DATA.registrationFee})</span>
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
