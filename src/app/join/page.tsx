"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { User, MapPin, Sprout, Building, Mail, FileText, CheckCircle, Shield, Sparkles, Check, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Dynamically load FarmlandCanvas
const FarmlandCanvas = dynamic(() => import("../../components/FarmlandCanvas"), {
  ssr: false,
});

export default function JoinPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form states
  const [farmerStep, setFarmerStep] = useState(1);
  const [farmerName, setFarmerName] = useState("");
  const [farmerRegion, setFarmerRegion] = useState("Rajshahi");
  const [farmerCrop, setFarmerCrop] = useState("");
  const [farmerSubmitted, setFarmerSubmitted] = useState(false);

  const [buyerCompany, setBuyerCompany] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerReqs, setBuyerReqs] = useState("");
  const [buyerSubmitted, setBuyerSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFarmerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (farmerStep < 3) {
      setFarmerStep(farmerStep + 1);
    } else {
      try {
        await fetch("https://formsubmit.co/ajax/imamshadin004@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            FormType: "Farmer Waitlist",
            FarmerName: farmerName,
            FarmerRegion: farmerRegion,
            PrimaryCrop: farmerCrop
          })
        });
      } catch (err) {
        console.error(err);
      }
      setFarmerSubmitted(true);
    }
  };

  const handleBuyerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("https://formsubmit.co/ajax/imamshadin004@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          FormType: "Buyer Waitlist",
          BuyerCompany: buyerCompany,
          BuyerEmail: buyerEmail,
          PrimaryRequirements: buyerReqs
        })
      });
    } catch (err) {
      console.error(err);
    }
    setBuyerSubmitted(true);
  };

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

      <main className="relative z-10 pt-36 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-display-xl text-[#00261a] mb-4"
          >
            Digitizing the Harvest.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-body-lg text-[#414944] max-w-3xl mx-auto leading-relaxed"
          >
            Connecting Bangladesh&apos;s resilient farmers with global agribusiness leaders through a transparent, high-fidelity supply chain.
          </motion.p>
        </div>

        {/* Bento Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-24">
          
          {/* Farmer Form (Left) */}
          <motion.div 
            {...fadeInUp}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#aff763] to-[#beedd7] rounded-[2.5rem] blur opacity-20 group-hover:opacity-35 transition duration-1000" />
            <div className="relative glass-panel rounded-[2.5rem] overflow-hidden p-8 md:p-10 flex flex-col h-full border border-white/40 shadow-xl bg-white/20">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#aff763] text-[#0f2000] text-xs font-label-bold mb-4 uppercase tracking-widest font-bold">
                  For Farmers
                </span>
                <h2 className="text-2xl md:text-3xl font-headline-lg text-[#00261a] mb-2 font-bold">Join Beta Waitlist</h2>
                <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                  Get early access to fair market pricing and climate-smart AI advisory before the harvest season.
                </p>
              </div>

              {farmerSubmitted ? (
                <div className="bg-[#beedd7]/30 p-8 rounded-3xl border border-[#3d6a00]/25 text-center flex-grow flex flex-col justify-center items-center min-h-[300px]">
                  <CheckCircle className="w-12 h-12 text-[#3d6a00] mb-4 animate-bounce" />
                  <h4 className="text-xl font-headline-md text-[#00261a] mb-2 font-bold">Registration Complete!</h4>
                  <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                    Welcome, {farmerName || "Farmer"}. We have registered you in the {farmerRegion} hub. We will SMS details to your number soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFarmerSubmit} className="space-y-6 flex-grow min-h-[300px] flex flex-col justify-between">
                  {/* Step indicators */}
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                      farmerStep >= 1 ? "bg-[#3d6a00] text-white shadow-md font-bold" : "border-2 border-[#c0c8c3] text-[#414944]"
                    }`}>
                      <User className="w-4 h-4" />
                    </div>
                    <div className={`h-[2px] flex-1 ${farmerStep >= 2 ? "bg-[#3d6a00]" : "bg-[#c0c8c3]/40"}`} />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                      farmerStep >= 2 ? "bg-[#3d6a00] text-white shadow-md font-bold" : "border-2 border-[#c0c8c3] text-[#414944]"
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className={`h-[2px] flex-1 ${farmerStep >= 3 ? "bg-[#3d6a00]" : "bg-[#c0c8c3]/40"}`} />
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-colors ${
                      farmerStep >= 3 ? "bg-[#3d6a00] text-white shadow-md font-bold" : "border-2 border-[#c0c8c3] text-[#414944]"
                    }`}>
                      <Sprout className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Form step fields */}
                  <div className="py-4">
                    {farmerStep === 1 && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-label-bold text-[#414944] block font-bold">Full Name</label>
                        <input 
                          required
                          value={farmerName}
                          onChange={(e) => setFarmerName(e.target.value)}
                          className="w-full bg-white/60 border-b border-[#c0c8c3] focus:border-[#3d6a00] focus:ring-0 px-4 py-3.5 text-base rounded-t-xl transition-all outline-none" 
                          placeholder="e.g. Abul Kashem" 
                          type="text"
                        />
                      </div>
                    )}

                    {farmerStep === 2 && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-label-bold text-[#414944] block font-bold">Division / Region</label>
                        <select 
                          value={farmerRegion}
                          onChange={(e) => setFarmerRegion(e.target.value)}
                          className="w-full bg-white/60 border-b border-[#c0c8c3] focus:border-[#3d6a00] focus:ring-0 px-4 py-3.5 text-base rounded-t-xl transition-all outline-none text-[#1b1c17]"
                        >
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Rangpur">Rangpur</option>
                          <option value="Barishal">Barishal</option>
                          <option value="Coastal Delta">Coastal Delta</option>
                        </select>
                      </div>
                    )}

                    {farmerStep === 3 && (
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-label-bold text-[#414944] block font-bold">Primary Crop</label>
                        <input 
                          required
                          value={farmerCrop}
                          onChange={(e) => setFarmerCrop(e.target.value)}
                          className="w-full bg-white/60 border-b border-[#c0c8c3] focus:border-[#3d6a00] focus:ring-0 px-4 py-3.5 text-base rounded-t-xl transition-all outline-none" 
                          placeholder="e.g. IRRI Rice, Mango, Potato" 
                          type="text"
                        />
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-[#3d6a00] text-white rounded-2xl font-label-bold text-xs uppercase tracking-widest hover:bg-[#00261a] transition-all hover:shadow-[0_0_20px_rgba(61,106,0,0.3)] font-bold"
                  >
                    {farmerStep < 3 ? "Next Step" : "Claim Early Access"}
                  </button>
                </form>
              )}

              {/* Benefit Badges */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#c0c8c3]/20 pt-6">
                <div className="flex items-center gap-2 p-3 bg-white/40 rounded-xl border border-[#c0c8c3]/10">
                  <Check className="text-[#3d6a00] w-4 h-4" />
                  <span className="text-xs font-bold text-[#1b1c17]">20% Higher Yield</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/40 rounded-xl border border-[#c0c8c3]/10">
                  <Check className="text-[#3d6a00] w-4 h-4" />
                  <span className="text-xs font-bold text-[#1b1c17]">Direct Payments</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Buyer Form (Right) */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ffe088] to-[#00261a] rounded-[2.5rem] blur opacity-15 group-hover:opacity-20 transition duration-1000" />
            <div className="relative bg-[#00261a] text-white rounded-[2.5rem] overflow-hidden p-8 md:p-10 flex flex-col h-full shadow-2xl border border-white/5">
              
              {/* Atmospheric Background Image */}
              <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
                <Image 
                  src="/farmer_family_1784145979104.png" 
                  alt="Bangladeshi farm context" 
                  fill 
                  className="object-cover grayscale"
                />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#ffe088] text-[#241a00] text-xs font-label-bold mb-4 uppercase tracking-widest font-bold">
                    For Institutional Buyers
                  </span>
                  <h2 className="text-2xl md:text-3xl font-headline-lg mb-2 text-[#fbfaf2]">Partner as Buyer</h2>
                  <p className="text-sm md:text-base text-[#beedd7] leading-relaxed mb-8">
                    Secure your supply chain with verifiable sourcing, quality assurance, and real-time logistics tracking from farm to export.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-[#aff763] w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm">Batch Traceability</h4>
                        <p className="text-xs text-[#beedd7]/80 leading-relaxed">Blockchain-backed origin certificates for every metric ton.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-[#aff763] w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm">Cold Chain Integration</h4>
                        <p className="text-xs text-[#beedd7]/80 leading-relaxed">End-to-end temperature controlled logistics network.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {buyerSubmitted ? (
                  <div className="bg-[#beedd7]/10 p-8 rounded-2xl border border-[#aff763]/20 text-center flex flex-col justify-center items-center min-h-[220px]">
                    <Sparkles className="w-10 h-10 text-[#aff763] mb-4 animate-spin" style={{ animationDuration: '4s' }} />
                    <h4 className="text-lg font-headline-md text-[#fbfaf2] mb-2">Proposal Requested</h4>
                    <p className="text-xs md:text-sm text-[#beedd7]">
                      We will reach out to {buyerEmail || "your corporate email"} with a custom partnership proposal file.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBuyerSubmit} className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-md space-y-4">
                    <div>
                      <input 
                        required
                        value={buyerCompany}
                        onChange={(e) => setBuyerCompany(e.target.value)}
                        className="w-full bg-transparent border-b border-white/30 py-3.5 text-base text-white placeholder:text-white/40 outline-none" 
                        placeholder="Company Name" 
                        type="text"
                      />
                    </div>
                    <div>
                      <input 
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-white/30 py-3.5 text-base text-white placeholder:text-white/40 outline-none" 
                        placeholder="Corporate Email" 
                        type="email"
                      />
                    </div>
                    <div>
                      <textarea 
                        required
                        value={buyerReqs}
                        onChange={(e) => setBuyerReqs(e.target.value)}
                        className="w-full bg-transparent border-b border-white/30 py-3.5 text-base text-white placeholder:text-white/40 outline-none resize-none" 
                        placeholder="Tell us about your requirements..." 
                        rows={2}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-[#aff763] text-[#0f2000] rounded-xl font-label-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-md font-bold"
                    >
                      Request Partnership Proposal
                    </button>
                  </form>
                )}

                {/* Trust symbols */}
                <div className="mt-8 flex items-center justify-between opacity-60 text-xs font-label-bold text-white border-t border-white/10 pt-6">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-4.5 h-4.5 text-[#aff763]" />
                    <span className="text-[9px] uppercase tracking-widest">ISO Certified</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="w-4.5 h-4.5 text-[#aff763]" />
                    <span className="text-[9px] uppercase tracking-widest">GAP Compliant</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Globe className="w-4.5 h-4.5 text-[#aff763]" />
                    <span className="text-[9px] uppercase tracking-widest">Global Export</span>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>

        {/* Why KrishiLink Cards */}
        <section className="py-16 border-t border-[#c0c8c3]/40 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-white border border-[#c0c8c3]/30 shadow-sm hover:border-[#3d6a00] transition-all group"
            >
              <h3 className="text-xl font-headline-md text-[#00261a] mb-2 font-bold">Price Transparency</h3>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                Removing middlemen to ensure 40% more revenue for farmers and lower costs for exporters.
              </p>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-white border border-[#c0c8c3]/30 shadow-sm hover:border-[#3d6a00] transition-all group"
            >
              <h3 className="text-xl font-headline-md text-[#00261a] mb-2 font-bold">Quality Control</h3>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                Digital soil mapping and AI-monitored growth phases ensure premium grade harvests.
              </p>
            </motion.div>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-white border border-[#c0c8c3]/30 shadow-sm hover:border-[#3d6a00] transition-all group"
            >
              <h3 className="text-xl font-headline-md text-[#00261a] mb-2 font-bold">Smart Logistics</h3>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                Real-time tracking of every crate from the village collection center to the global port.
              </p>
            </motion.div>
          </div>
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
            <Link href="/impact" className="hover:text-[#00261a] transition-colors hover:underline">Impact Report</Link>
            <Link href="/support" className="hover:text-[#00261a] transition-colors hover:underline">Support Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
