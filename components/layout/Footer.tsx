import Image from "next/image";
import { ABOUT_DATA } from "@/src/data/about";
import { CORE_CONTACTS } from "@/src/data/contacts";
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from "lucide-react";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/Icons";
import { RetroGamepad } from "@/components/ui/RetroStickers";

export function Footer() {
  const secretaries = CORE_CONTACTS.filter((c) => c.category === "Secretary");
  const regCoordinators = CORE_CONTACTS.filter((c) => c.category === "Registration Coordinator");

  return (
    <footer className="relative bg-[#3b0764] text-white border-t-[4px] border-black pt-16 pb-12 overflow-hidden font-unbounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b-2 border-white/20">
          {/* Column 1: Brand & Institution */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#ec4899] border-2 border-black flex items-center justify-center p-1 shadow-[3px_3px_0px_#000]">
                <RetroGamepad className="w-10 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#fde047] tracking-tight">
                  GUSTO &apos;26
                </h3>
                <p className="text-xs text-pink-300 font-bold uppercase">
                  {ABOUT_DATA.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs font-bold text-zinc-300 leading-relaxed">
              Organized by the <strong className="text-[#fde047]">{ABOUT_DATA.department}</strong> and Association of Information Technologists (AIT) at <strong className="text-white">{ABOUT_DATA.institution}</strong> ({ABOUT_DATA.formerlyKnownAs}).
            </p>

            {/* Institution Logos Badge */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-11 h-11 rounded-xl bg-white border-2 border-black p-1 shadow-[2px_2px_0px_#000]" title="GCEE">
                <Image
                  src="/logos/GCEE/bronze.png"
                  alt="GCEE College Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="relative w-11 h-11 rounded-xl bg-white border-2 border-black p-1 shadow-[2px_2px_0px_#000]" title="AIT">
                <Image
                  src="/logos/AIT/gold.png"
                  alt="AIT Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="relative w-11 h-11 rounded-xl bg-white border-2 border-black p-1 shadow-[2px_2px_0px_#000]" title="GUSTO">
                <Image
                  src="/logos/GUSTO/gradient.png"
                  alt="GUSTO Gradient Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#84cc16]">
              ★ Symposium Links
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <a href="#events" className="text-zinc-200 hover:text-[#fde047] transition-colors flex items-center gap-1.5">
                  <span>▶ All 9 Technical & Non-Tech Events</span>
                </a>
              </li>
              <li>
                <a href="#rules" className="text-zinc-200 hover:text-[#fde047] transition-colors flex items-center gap-1.5">
                  <span>▶ Official Rules & Guidelines</span>
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-zinc-200 hover:text-[#fde047] transition-colors flex items-center gap-1.5">
                  <span>▶ Past Symposium Photo Gallery</span>
                </a>
              </li>
              <li>
                <a href="#youtube" className="text-zinc-200 hover:text-[#fde047] transition-colors flex items-center gap-1.5">
                  <span>▶ Official YouTube Teaser Video</span>
                </a>
              </li>
              <li>
                <a href="#transport" className="text-zinc-200 hover:text-[#fde047] transition-colors flex items-center gap-1.5">
                  <span>▶ College Bus & Transit Guidance</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-200 hover:text-[#fde047] transition-colors flex items-center gap-1.5">
                  <span>▶ Coordinators Directory</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Leadership */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#84cc16]">
              ★ Student Leads
            </h4>
            <div className="space-y-3.5 text-xs">
              <div>
                <p className="text-pink-300 text-[11px] font-black uppercase tracking-wider mb-2">
                  Secretaries
                </p>
                <div className="space-y-2.5">
                  {secretaries.map((sec) => (
                    <div key={sec.id} className="flex flex-col">
                      <span className="font-black text-white text-xs tracking-tight">
                        {sec.name}
                      </span>
                      <a
                        href={`tel:${sec.phone}`}
                        className="text-[#fde047] hover:underline inline-flex items-center gap-1.5 font-mono text-[11px] font-bold mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-[#84cc16] shrink-0" />
                        <span>{sec.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/10">
                <p className="text-pink-300 text-[11px] font-black uppercase tracking-wider mb-2">
                  Registration Desks
                </p>
                <div className="space-y-2.5">
                  {regCoordinators.map((reg) => (
                    <div key={reg.id} className="flex flex-col">
                      <span className="font-black text-white text-xs tracking-tight">
                        {reg.name}
                      </span>
                      <a
                        href={`tel:${reg.phone}`}
                        className="text-[#fde047] hover:underline inline-flex items-center gap-1.5 font-mono text-[11px] font-bold mt-0.5"
                      >
                        <Phone className="w-3 h-3 text-[#84cc16] shrink-0" />
                        <span>{reg.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/10">
                <a
                  href={`mailto:${ABOUT_DATA.contactEmail}`}
                  className="inline-flex items-center gap-2 text-[#fde047] hover:underline text-xs font-bold"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="break-all">{ABOUT_DATA.contactEmail}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Venue & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-[#84cc16]">
              ★ Campus Venue
            </h4>
            <div className="flex items-start gap-2.5 text-xs font-bold text-zinc-300">
              <MapPin className="w-4 h-4 text-[#ec4899] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-black">{ABOUT_DATA.venueAddress.campus}</p>
                <p>{ABOUT_DATA.venueAddress.road}</p>
                <p>
                  {ABOUT_DATA.venueAddress.district}, {ABOUT_DATA.venueAddress.state} - {ABOUT_DATA.venueAddress.pincode}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={ABOUT_DATA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ec4899] text-white text-xs font-black uppercase"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 opacity-80" />
              </a>

              <a
                href={ABOUT_DATA.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ef4444] text-white text-xs font-black uppercase"
              >
                <YouTubeIcon className="w-3.5 h-3.5" />
                <span>YouTube</span>
                <ArrowUpRight className="w-3 h-3 opacity-80" />
              </a>
            </div>

            <div className="p-3 rounded-2xl bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000]">
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-black">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Symposium Data</span>
              </div>
              <p className="text-[11px] font-bold text-zinc-700 mt-1">
                Fee: ₹{ABOUT_DATA.registrationFee} • Last Date: {ABOUT_DATA.registrationLastDate}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-300">
          <p>© 2026 GUSTO &apos;26 • Department of Information Technology, GCEE. All rights reserved.</p>
          <p className="text-[#fde047] font-black uppercase">
            Let The Game Begin • GUSTO 2K26
          </p>
        </div>
      </div>
    </footer>
  );
}
