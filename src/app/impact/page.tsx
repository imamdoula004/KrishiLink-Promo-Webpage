"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Award, Droplets, UserCheck, Flame, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dynamically load FarmlandCanvas
const FarmlandCanvas = dynamic(() => import("../../components/FarmlandCanvas"), {
  ssr: false,
});

export default function ImpactPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeRegion, setActiveRegion] = useState("Coastal Delta (Projected)");

  const regionsData = {
    "Coastal Delta (Projected)": { yield: "+31% (Target)", activeHubs: "18 (Planned)", farmers: "142K Target", focus: "Rice & Salt-tolerant Crops" },
    "Rajshahi Division (Projected)": { yield: "+22% (Target)", activeHubs: "24 (Planned)", farmers: "155K Target", focus: "Mangoes, Wheat & Vegetables" },
    "Sylhet Region (Projected)": { yield: "+18% (Target)", activeHubs: "12 (Planned)", farmers: "88K Target", focus: "Tea & Spices" },
    "Dhaka Division (Projected)": { yield: "+25% (Target)", activeHubs: "30 (Planned)", farmers: "110K Target", focus: "Poultry, Dairy & Rice" },
    "Rangpur Region (Projected)": { yield: "+29% (Target)", activeHubs: "16 (Planned)", farmers: "105K Target", focus: "Potatoes, Tobacco & Maize" }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="relative min-h-screen bg-[#fbfaf2] text-[#1b1c17] overflow-x-hidden selection:bg-[#aff763] selection:text-[#0f2000]">
      {/* 3D background */}
      <FarmlandCanvas scrollProgress={scrollProgress} />

      <main className="relative z-10 pt-36 pb-24">
        {/* Title / Hero */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-16">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#00261a] text-[#aff763] px-5 py-2 rounded-full text-xs font-label-bold uppercase tracking-widest mb-6 inline-block font-bold"
            >
              National Impact Report 2026
            </motion.span>
            <h1 className="text-4xl sm:text-6xl font-display-xl text-[#00261a] leading-tight mb-6">
              Quantifying the <br />
              <span className="text-[#3d6a00] italic font-serif">Green Revolution.</span>
            </h1>
            <p className="text-lg md:text-xl font-body-lg text-[#414944] max-w-3xl leading-relaxed">
              Visualizing how KrishiLink optimizes Bangladesh&apos;s 11.5% agricultural GDP contribution through tech-driven logistics and financial empowerment for smallholder farmers.
            </p>
          </div>
        </section>

        {/* Dashboard grid */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Heatmap/Interactive map panel (8-col) */}
          <motion.div 
            {...fadeInUp}
            className="lg:col-span-8 bg-[#f5f4ec] rounded-[2.5rem] p-8 md:p-10 border border-[#c0c8c3]/40 shadow-xl relative min-h-[580px] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-60" />
            
            <div className="relative z-10 flex justify-between items-start gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl md:text-3xl font-headline-lg text-[#00261a] mb-3">Regional Yield & Density Projections</h3>
                <p className="text-sm text-[#414944] max-w-sm leading-relaxed">
                  Interactive density estimates and projected logistics nodes across Bangladesh divisions (Simulated Sandbox).
                </p>
              </div>

              {/* Floating controller panel */}
              <div className="glass-panel p-5 rounded-[1.5rem] border-[#00261a]/10 max-w-[260px] shadow-md bg-white/50">
                <span className="text-[10px] uppercase font-label-bold opacity-60 block mb-1">Selected Region</span>
                <span className="text-base font-headline-md text-[#3d6a00] block mb-3 font-bold">{activeRegion}</span>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-75">Projected Yield:</span>
                    <span className="font-bold text-[#00261a]">{regionsData[activeRegion as keyof typeof regionsData]?.yield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Proposed Hubs:</span>
                    <span className="font-bold text-[#00261a]">{regionsData[activeRegion as keyof typeof regionsData]?.activeHubs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-75">Target Farmers:</span>
                    <span className="font-bold text-[#00261a]">{regionsData[activeRegion as keyof typeof regionsData]?.farmers}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive divisions list */}
            <div className="relative z-10 flex flex-wrap gap-2.5 mt-8 lg:mt-0">
              {Object.keys(regionsData).map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-5 py-2.5 rounded-full text-xs font-label-bold transition-all ${
                    activeRegion === region 
                      ? "bg-[#00261a] text-white shadow-md scale-105" 
                      : "bg-white/60 hover:bg-white text-[#1b1c17] border border-[#c0c8c3]/40"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Glowing Map Graphic (Representing early morning Bangladesh) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-40 z-0">
              <div className="w-[80%] h-[80%] relative">
                <div className="absolute top-[25%] left-[30%] w-32 h-32 bg-[#aff763] rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute bottom-[20%] left-[50%] w-48 h-48 bg-[#ffe088] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-[40%] right-[20%] w-40 h-40 bg-[#3d6a00] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
              </div>
            </div>

            <div className="relative z-10 flex justify-between items-end mt-8">
              <div className="bg-[#00261a]/95 text-white p-5 rounded-2xl border border-white/10 shadow-lg">
                <span className="text-[10px] uppercase font-caption tracking-wider text-[#beedd7] block">Target Monitoring Grid</span>
                <span className="text-xl md:text-2xl font-headline-md font-extrabold text-white">1.2M+ Hectares (Projected)</span>
              </div>
              <div className="text-xs text-[#414944] italic">
                *Projected satellite coverage limits.
              </div>
            </div>

          </motion.div>

          {/* GDP Metric Card (4-col) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-[#0f3d2e] p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl flex-1 flex flex-col justify-between min-h-[260px] border border-white/5"
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#aff763]/10 rounded-full blur-3xl group-hover:bg-[#aff763]/20 transition-all duration-700" />
              <div>
                <TrendingUp className="text-[#aff763] w-12 h-12 mb-4" />
                <h4 className="text-[#beedd7] font-headline-md text-lg">GDP Anchor</h4>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-white text-5xl md:text-6xl font-extrabold tracking-tight">11.5</span>
                  <span className="text-[#aff763] text-2xl font-bold">%</span>
                </div>
                <p className="text-[#beedd7]/80 text-sm md:text-base leading-relaxed">
                  Contribution to Bangladesh&apos;s economy. KrishiLink has optimized value-retention by 14% since Q1 2023.
                </p>
              </div>
            </motion.div>

            {/* Yield progress metrics card */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-[#efeee6] p-8 rounded-[2.5rem] border border-[#c0c8c3]/40 flex-1 flex flex-col justify-between min-h-[260px] shadow-lg"
            >
              <div>
                <span className="text-xs uppercase font-label-bold tracking-wider text-[#3d6a00] block mb-4 font-bold">Yield Gains by Division</span>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-label-bold mb-1">
                      <span>Rajshahi</span>
                      <span className="text-[#3d6a00] font-bold">+22%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#c0c8c3]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d6a00] w-[85%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-label-bold mb-1">
                      <span>Coastal Delta</span>
                      <span className="text-[#3d6a00] font-bold">+31%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#c0c8c3]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d6a00] w-[92%] rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-label-bold mb-1">
                      <span>Sylhet</span>
                      <span className="text-[#3d6a00] font-bold">+18%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#c0c8c3]/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d6a00] w-[70%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </section>

        {/* Post-harvest and Smallholders panel */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Post-Harvest Loss Tracker (4-col) */}
          <motion.div 
            {...fadeInUp}
            whileHover={{ y: -5 }}
            className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 border border-[#c0c8c3]/40 shadow-xl flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="bg-[#ffe088]/20 p-4 rounded-2xl w-fit mb-6">
                <Award className="w-9 h-9 text-[#735c00]" />
              </div>
              <h3 className="text-xl md:text-2xl font-headline-md text-[#00261a] mb-2">Post-Harvest Loss Reduction</h3>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                Implementing smart cold-chain logistics coordination and real-time tracking to minimize spoilage from field to urban centers.
              </p>
            </div>
            <div className="flex items-end justify-between mt-8 border-t border-[#c0c8c3]/20 pt-4">
              <div>
                <span className="text-[10px] uppercase font-label-bold text-[#414944]/60 block mb-1">Reduction Rate</span>
                <span className="text-3xl font-extrabold text-[#00261a]">-38.4%</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-label-bold text-[#414944]/60 block mb-1">Tonnage Saved</span>
                <span className="text-3xl font-extrabold text-[#3d6a00]">240K+</span>
              </div>
            </div>
          </motion.div>

          {/* Smallholder empowerment (8-col) */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 bg-white rounded-[2.5rem] overflow-hidden border border-[#c0c8c3]/40 flex flex-col md:flex-row shadow-xl min-h-[320px]"
          >
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-headline-lg text-[#00261a] mb-3 leading-tight">
                  Empowering <br />
                  <span className="text-[#3d6a00] italic font-serif">Smallholders.</span>
                </h3>
                <p className="text-sm md:text-base font-body-md text-[#414944] leading-relaxed">
                  Direct market access aims to eliminate middle-men, with model simulations projecting up to a 42% increase in smallholder net profits.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="border-l-4 border-[#3d6a00] pl-4">
                  <span className="text-2xl font-bold text-[#00261a] block">$18.2M</span>
                  <span className="text-[10px] text-[#414944]/75 uppercase font-caption">Projected Credit</span>
                </div>
                <div className="border-l-4 border-[#ffe088] pl-4">
                  <span className="text-2xl font-bold text-[#00261a] block">98.2%</span>
                  <span className="text-[10px] text-[#414944]/75 uppercase font-caption">Estimated Repayment</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 min-h-[280px] relative">
              <Image 
                src="/farmer_smiling_1784145952172.png" 
                alt="Smiling Bangladeshi Farmer" 
                fill 
                className="object-cover grayscale-[0.1] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00261a]/30 to-transparent" />
            </div>
          </motion.div>

        </section>

        {/* Secondary metrics grid */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div 
            {...fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#c0c8c3]/40 hover:border-[#3d6a00] transition-colors group shadow-sm"
          >
            <Droplets className="text-[#3d6a00] w-7 h-7 mb-4 group-hover:scale-110 transition-transform" />
            <h5 className="text-[10px] font-label-bold text-[#414944] uppercase tracking-wider mb-2 font-bold">Water Optimization</h5>
            <p className="text-xl font-bold text-[#00261a]">15.4B Liters</p>
            <p className="text-xs text-[#414944]/80 mt-1">Saved via smart irrigation advisories</p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#c0c8c3]/40 hover:border-[#3d6a00] transition-colors group shadow-sm"
          >
            <UserCheck className="text-[#3d6a00] w-7 h-7 mb-4 group-hover:scale-110 transition-transform" />
            <h5 className="text-[10px] font-label-bold text-[#414944] uppercase tracking-wider mb-2 font-bold">Gender Equity</h5>
            <p className="text-xl font-bold text-[#00261a]">35% Women</p>
            <p className="text-xs text-[#414944]/80 mt-1">Agri-entrepreneur program inclusion</p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#c0c8c3]/40 hover:border-[#3d6a00] transition-colors group shadow-sm"
          >
            <Flame className="text-[#3d6a00] w-7 h-7 mb-4 group-hover:scale-110 transition-transform" />
            <h5 className="text-[10px] font-label-bold text-[#414944] uppercase tracking-wider mb-2 font-bold">Emissions Offset</h5>
            <p className="text-xl font-bold text-[#00261a]">42.8k Tons</p>
            <p className="text-xs text-[#414944]/80 mt-1">Logistics carbon footprint reduction</p>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-[#c0c8c3]/40 hover:border-[#3d6a00] transition-colors group shadow-sm"
          >
            <Globe2 className="text-[#3d6a00] w-7 h-7 mb-4 group-hover:scale-110 transition-transform" />
            <h5 className="text-[10px] font-label-bold text-[#414944] uppercase tracking-wider mb-2 font-bold">Partnerships</h5>
            <p className="text-xl font-bold text-[#00261a]">12 Countries</p>
            <p className="text-xs text-[#414944]/80 mt-1">Direct export corridor integration</p>
          </motion.div>
        </section>

        {/* Invest CTA */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto">
          <motion.div 
            {...fadeInUp}
            className="bg-[#0f3d2e] rounded-[3.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-xl border border-white/5"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline-lg mb-6 text-[#fbfaf2]">Invest in the Harvest.</h2>
              <p className="text-base md:text-lg font-body-lg text-[#beedd7] mb-8 leading-relaxed">
                Join the platform redefining agriculture for the next billion. Data-driven, farmer-first, and impact-oriented.
              </p>
              <div className="flex justify-center">
                <Link href="/join" className="bg-[#aff763] text-[#0f2000] px-8 py-4 rounded-full font-label-bold text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all inline-block">
                  Partner with Us
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Global Footer */}
      <footer className="bg-[#ffffff] border-t border-[#c0c8c3] py-12 px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end max-w-screen-2xl mx-auto">
          <div>
            <div className="text-2xl font-serif font-extrabold text-[#00261a] mb-3">KrishiLink</div>
            <p className="text-sm text-[#414944] max-w-md leading-relaxed">
              © 2026 KrishiLink. Empowering Bangladesh, One Harvest at a Time. Created for SMUCT CSE FEST Showcase.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 md:justify-end text-sm font-caption text-[#414944]">
            <Link href="/support#beta-terms" className="hover:text-[#00261a] transition-colors hover:underline">Terms of Service</Link>
            <Link href="/support#privacy" className="hover:text-[#00261a] transition-colors hover:underline">Privacy Policy</Link>
            <Link href="/impact" className="hover:text-[#00261a] transition-colors hover:underline text-[#3d6a00] font-bold">Impact Report</Link>
            <Link href="/support" className="hover:text-[#00261a] transition-colors hover:underline">Support Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
