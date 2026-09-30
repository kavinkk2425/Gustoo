import { TRANSPORT_DATA } from "@/src/data/transport";
import { CORE_CONTACTS } from "@/src/data/contacts";
import { Bus, MapPin, Navigation, Clock, ShieldCheck, ExternalLink, Phone } from "lucide-react";

export function TransportSection() {
  const regCoordinators = CORE_CONTACTS.filter(
    (c) => c.category === "Registration Coordinator"
  );

  return (
    <section id="transport" className="py-14 sm:py-20 bg-[#fffbeb] text-black relative border-b-[4px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-[2.5px] border-black shadow-[3px_3px_0px_#000] text-xs font-black uppercase tracking-wider mb-3">
            <Bus className="w-4 h-4 text-[#8b5cf6]" />
            <span>Campus Connectivity</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-[#3b0764] mb-3 drop-shadow-[2px_2px_0px_#000]">
            Venue & <span className="text-[#84cc16] [-webkit-text-stroke:2px_#000]">Transport</span>
          </h2>
          <p className="text-xs sm:text-base font-bold text-zinc-700 leading-relaxed">
            Reach Government College of Engineering, Erode conveniently from surrounding railway and bus transit points.
          </p>
        </div>

        {/* Verified College Bus Notice Banner */}
        <div className="mb-10 sm:mb-12 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#fde047] border-[3px] sm:border-[3.5px] border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#3b0764] text-white border-2 border-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_#000]">
                <Bus className="w-6 h-6 sm:w-8 sm:h-8 text-[#facc15]" />
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#3b0764] mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Official College Facility
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-black mb-1.5 sm:mb-2">
                  College Bus Transportation
                </h3>
                <p className="text-xs sm:text-sm font-bold text-zinc-800 leading-relaxed max-w-2xl">
                  {TRANSPORT_DATA.collegeBusNotice} Regular town and highway buses also run continuously through the Suriyampalayam college stop on NH 544.
                </p>
              </div>
            </div>

            <a
              href={TRANSPORT_DATA.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-black text-xs sm:text-sm bg-[#ec4899] text-white shadow-[4px_4px_0px_#000] uppercase tracking-wider shrink-0"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* 4 Transit Point Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TRANSPORT_DATA.transitHubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border-[3.5px] border-black shadow-[5px_5px_0px_#000] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-[#ec4899] uppercase tracking-wider">
                    Transit {idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-[#84cc16] border border-black text-black">
                    {hub.distance}
                  </span>
                </div>
                <h4 className="text-lg font-black text-[#3b0764] mb-2">{hub.origin}</h4>
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 mb-3">
                  <Clock className="w-3.5 h-3.5 text-[#8b5cf6]" />
                  <span>Est. Time: {hub.typicalDuration}</span>
                </div>
                <p className="text-xs font-bold text-zinc-600 leading-relaxed mb-3">
                  {hub.connectivity}
                </p>
              </div>
              <p className="text-[11px] font-bold text-zinc-500 pt-3 border-t-2 border-black italic">
                {hub.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Address Card & Helpdesk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border-[3.5px] border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-black mb-2 uppercase">
                <MapPin className="w-4 h-4" />
                <span>Symposium Venue Location</span>
              </div>
              <h3 className="text-2xl font-black text-[#3b0764] mb-1">
                {TRANSPORT_DATA.collegeName}
              </h3>
              <p className="text-xs font-black text-[#ec4899] mb-4">
                Formerly: {TRANSPORT_DATA.formerlyKnownAs}
              </p>
              <div className="text-sm font-bold text-zinc-800 space-y-1">
                <p>{TRANSPORT_DATA.address.campus}</p>
                <p>{TRANSPORT_DATA.address.road}</p>
                <p>
                  {TRANSPORT_DATA.address.district}, {TRANSPORT_DATA.address.state} —{" "}
                  <strong className="text-black font-black">{TRANSPORT_DATA.address.pincode}</strong>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-black flex flex-wrap gap-4 text-xs font-bold text-zinc-700">
              {TRANSPORT_DATA.generalAdvice.map((advice, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#84cc16] border border-black shrink-0" />
                  <span>{advice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Helpdesk Contacts */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#3b0764] text-white border-[3.5px] border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-black text-[#fde047] mb-2 uppercase">
                Transit Assistance Desk
              </h4>
              <p className="text-xs font-bold text-pink-200 mb-4">
                Need bus or route assistance on March 06, 2026? Contact our coordinators:
              </p>
              <div className="space-y-3">
                {regCoordinators.map((c) => (
                  <div key={c.id} className="p-3 rounded-2xl bg-white text-black border-2 border-black text-xs font-black">
                    <span className="block text-black">{c.name}</span>
                    <span className="text-[10px] text-zinc-600 block mb-1">{c.role}</span>
                    <a
                      href={`tel:${c.phone}`}
                      className="inline-flex items-center gap-1.5 text-[#ec4899] hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{c.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] font-bold text-zinc-300 mt-4">
              Detailed boarding schedule will be available at the registration desk on event day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
