"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowDown, 
  TrendingDown, 
  Smartphone, 
  Users, 
  AlertTriangle,
  ArrowRight,
  MapPin,
  Check
} from "lucide-react";
import Link from "next/link";

// Dynamically import Three.js Farmland Canvas to bypass SSR
const FarmlandCanvas = dynamic(() => import("../components/FarmlandCanvas"), {
  ssr: false,
});

export default function PromoPageContent() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Middlemen Simulator States
  const [middlemenCount, setMiddlemenCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute simulator results based on middlemen count
  const getSimulatorStats = (count: number) => {
    switch (count) {
      case 0:
        return {
          farmerShare: 85,
          buyerMarkup: 15,
          wasteRate: 4,
          path: ["Farm", "KrishiLink Hub", "Retail Buyer"],
          description: "Optimized direct network: Maximum profit to farmer, minimal wastage, complete data provenance."
        };
      case 1:
        return {
          farmerShare: 70,
          buyerMarkup: 45,
          wasteRate: 12,
          path: ["Farm", "Local Faria", "Buyer"],
          description: "Local aggregator markup adds transactional friction and initial post-harvest storage delays."
        };
      case 2:
        return {
          farmerShare: 60,
          buyerMarkup: 85,
          wasteRate: 18,
          path: ["Farm", "Faria", "Bepari", "Buyer"],
          description: "Multi-layered collection loops. Quality degrades as produce is exposed to humidity."
        };
      case 3:
        return {
          farmerShare: 50,
          buyerMarkup: 130,
          wasteRate: 24,
          path: ["Farm", "Faria", "Bepari", "Aratdar", "Buyer"],
          description: "Traditional wholesale arat commissions. Pricing transparency is completely obscured."
        };
      case 4:
        return {
          farmerShare: 42,
          buyerMarkup: 190,
          wasteRate: 30,
          path: ["Farm", "Faria", "Bepari", "Aratdar", "Wholesaler", "Buyer"],
          description: "Severe urban logistics lag. Fresh produce starts rotting, buyers pay inflated prices."
        };
      default:
        return {
          farmerShare: 35,
          buyerMarkup: 250,
          wasteRate: 35,
          path: ["Farm", "Faria", "Bepari", "Aratdar", "Wholesaler", "Retailer", "Consumer"],
          description: "Shattered supply chain: Middlemen swallow 65% of potential earnings. Food waste escalates to 35%."
        };
    }
  };

  const currentStats = getSimulatorStats(middlemenCount);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="relative min-h-screen bg-[#fbfaf2] text-[#1b1c17] overflow-x-hidden selection:bg-[#aff763] selection:text-[#0f2000]">
      {/* 3D background */}
      <FarmlandCanvas scrollProgress={scrollProgress} />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#00261a] pt-28 pb-12 sm:pt-20">
          <div className="absolute inset-0 bg-gradient-to-t from-[#00261a] via-transparent to-[#00261a]/30 z-10" />
          
          <div className="relative z-20 text-center px-6 max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-[#aff763] font-label-bold text-sm mb-8"
            >
              <span className="w-2.5 h-2.5 bg-[#aff763] rounded-full animate-ping" />
              REVOLUTIONIZING BANGLADESH AGRICULTURE
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-display-xl text-white mb-8 tracking-tight leading-none uppercase"
            >
              Bridging the Gap.<br />
              <span className="text-[#aff763] font-serif italic">Solving the $3B Leak.</span><br />
              Securing the Future.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl font-body-lg text-white/95 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              KrishiLink is an AI-powered ecosystem designed to eliminate systemic inefficiencies in Bangladesh&apos;s supply chain, turning post-harvest losses into shared prosperity.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link 
                href="/join" 
                className="w-full sm:w-auto bg-[#aff763] text-[#0f2000] px-10 py-5 rounded-full font-label-bold text-sm uppercase tracking-widest hover:bg-white hover:shadow-[0_0_25px_rgba(175,247,99,0.5)] transition-all duration-300 text-center"
              >
                Partner With Us
              </Link>
              <Link 
                href="/technology" 
                className="w-full sm:w-auto glass-panel text-white px-10 py-5 rounded-full font-label-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all text-center"
              >
                Technical Stack
              </Link>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.6 }}
              className="text-xs uppercase tracking-widest text-[#beedd7] mt-8 block animate-pulse font-bold"
            >
              Scroll down to explore interactive infographics & supply chain simulators ➔
            </motion.p>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
            <ArrowDown className="text-[#aff763] w-6 h-6" />
          </div>
        </section>

        {/* The Opportunity Section */}
        <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto" id="opportunity">
          <motion.div 
            {...fadeInUp}
            className="mb-16"
          >
            <span className="text-[#3d6a00] font-label-bold text-sm uppercase tracking-widest mb-4 block">National Landscape</span>
            <h2 className="text-3xl md:text-5xl font-headline-lg text-[#00261a] mb-4">The Opportunity</h2>
            <p className="text-lg md:text-xl font-body-lg text-[#414944] max-w-2xl leading-relaxed">
              Data-driven insights into the challenges and potential of Bangladesh&apos;s agricultural backbone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-[2rem] border border-[#c0c8c3] shadow-[0_4px_20px_rgba(0,38,26,0.02)] hover:shadow-[0_8px_30px_rgba(0,38,26,0.06)] hover:border-[#3d6a00]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ffdad6] flex items-center justify-center mb-6 text-[#ba1a1a]">
                <TrendingDown className="w-7 h-7" />
              </div>
              <div className="text-4xl md:text-5xl font-display-xl text-[#00261a] mb-2">$3 Billion</div>
              <h4 className="font-label-bold text-sm text-[#1b1c17] mb-3 uppercase tracking-wider">Post-Harvest Loss</h4>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                The annual economic drain due to mid-stream supply chain inefficiencies KrishiLink targets.
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-[2rem] border border-[#c0c8c3] shadow-[0_4px_20px_rgba(0,38,26,0.02)] hover:shadow-[0_8px_30px_rgba(0,38,26,0.06)] hover:border-[#3d6a00]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#beedd7] flex items-center justify-center mb-6 text-[#3d6a00]">
                <Smartphone className="w-7 h-7" />
              </div>
              <div className="text-4xl md:text-5xl font-display-xl text-[#00261a] mb-2">60% +</div>
              <h4 className="font-label-bold text-sm text-[#1b1c17] mb-3 uppercase tracking-wider">Mobile Penetration</h4>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                The digital leap allowing us to connect 16M+ smallholder farmers to modern markets.
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-[2rem] border border-[#c0c8c3] shadow-[0_4px_20px_rgba(0,38,26,0.02)] hover:shadow-[0_8px_30px_rgba(0,38,26,0.06)] hover:border-[#3d6a00]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#beedd7] flex items-center justify-center mb-6 text-[#3d6a00]">
                <Users className="w-7 h-7" />
              </div>
              <div className="text-4xl md:text-5xl font-display-xl text-[#00261a] mb-2">37%</div>
              <h4 className="font-label-bold text-sm text-[#1b1c17] mb-3 uppercase tracking-wider">Workforce Backbone</h4>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                Agriculture remains the nation&apos;s largest employer, now facing a critical labor transition.
              </p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-[2rem] border border-[#c0c8c3] shadow-[0_4px_20px_rgba(0,38,26,0.02)] hover:shadow-[0_8px_30px_rgba(0,38,26,0.06)] hover:border-[#3d6a00]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#ffe088]/30 flex items-center justify-center mb-6 text-[#735c00]">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="text-4xl md:text-5xl font-display-xl text-[#00261a] mb-2">35%</div>
              <h4 className="font-label-bold text-sm text-[#1b1c17] mb-3 uppercase tracking-wider">Produce Waste</h4>
              <p className="text-sm md:text-base text-[#414944] leading-relaxed">
                Staggering loss in fruits and vegetables before they reach tables. A silent food crisis.
              </p>
            </motion.div>
          </div>
        </section>

        {/* The Integrated Journey */}
        <section className="py-24 bg-[#f5f4ec] border-y border-[#c0c8c3]/40" id="how-it-works">
          <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
            <motion.div 
              {...fadeInUp}
              className="text-center mb-20"
            >
              <span className="text-[#3d6a00] font-label-bold tracking-widest uppercase text-sm block mb-2">The Digital Journey</span>
              <h2 className="text-3xl md:text-5xl font-headline-lg text-[#00261a]">The Integrated Ecosystem</h2>
            </motion.div>

            <div className="space-y-32">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-16">
                <motion.div 
                  {...fadeInUp}
                  className="flex-1 space-y-6"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00261a] text-[#aff763] flex items-center justify-center font-display-xl text-xl">01</div>
                  <h3 className="text-3xl font-headline-lg text-[#00261a]">Smart Yield Listing</h3>
                  <p className="text-base md:text-lg font-body-md text-[#414944] leading-relaxed">
                    Farmers use AI-assisted forms to list produce. Our system auto-fills descriptions and categorizes yields based on image recognition, ensuring professional listings in seconds.
                  </p>
                  <div className="flex gap-4">
                    <span className="px-5 py-2.5 rounded-xl bg-[#3d6a00]/10 text-[#3d6a00] font-label-bold text-xs uppercase">AI Recognition</span>
                    <span className="px-5 py-2.5 rounded-xl bg-[#3d6a00]/10 text-[#3d6a00] font-label-bold text-xs uppercase">Instant Upload</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  {...fadeInUp}
                  className="flex-grow w-full aspect-video md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white/50"
                >
                  <Image 
                    src="/farmer_smiling_1784145952172.png"
                    alt="Farmer Yield Listing Interface"
                    fill
                    className="object-cover grayscale-[0.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00261a]/30 to-transparent" />
                </motion.div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <motion.div 
                  {...fadeInUp}
                  className="flex-1 space-y-6"
                >
                  <div className="w-14 h-14 rounded-full bg-[#00261a] text-[#aff763] flex items-center justify-center font-display-xl text-xl">02</div>
                  <h3 className="text-3xl font-headline-lg text-[#00261a]">AI Advisory &amp; Analytics</h3>
                  <p className="text-base md:text-lg font-body-md text-[#414944] leading-relaxed">
                    Data-driven price indexes tell farmers exactly when the market is at its peak. No more guessing; the system recommends liquidation strategies based on regional demand spikes.
                  </p>
                  <div className="flex gap-4">
                    <span className="px-5 py-2.5 rounded-xl bg-[#ffe088]/20 text-[#735c00] font-label-bold text-xs uppercase">Demand Prediction</span>
                    <span className="px-5 py-2.5 rounded-xl bg-[#ffe088]/20 text-[#735c00] font-label-bold text-xs uppercase">Live Indices</span>
                  </div>
                </motion.div>

                <motion.div 
                  {...fadeInUp}
                  className="flex-grow w-full aspect-video md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white/50"
                >
                  <Image 
                    src="/farmer_woman_1784145966179.png"
                    alt="Agronomy AI advisory interface"
                    fill
                    className="object-cover grayscale-[0.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00261a]/30 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLEMEN MARKUP SIMULATOR (The Disruptive Slider) */}
        <section className="py-24 bg-[#00261a] text-white relative overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div {...fadeInUp}>
              <span className="text-[#aff763] font-label-bold text-sm uppercase tracking-widest block mb-4">Middlemen Markup Simulator</span>
              <h2 className="text-3xl md:text-5xl font-display-xl uppercase text-white mb-6">
                Disrupting the <br />
                <span className="text-[#aff763] font-serif italic">Silent Drain.</span>
              </h2>
              <p className="text-base md:text-lg font-body-md text-[#beedd7]/80 leading-relaxed mb-8 max-w-lg">
                Traditional supply chains in Bangladesh pass through 5-7 intermediaries before reaching the consumer. Every hand-off increases the price while decreasing the quality and the farmer&apos;s share.
              </p>
              
              {/* Slider Controller */}
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mb-8 max-w-md shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs uppercase font-label-bold text-[#beedd7] tracking-wider">Middlemen Layers</span>
                  <span className="bg-[#aff763] text-[#0f2000] px-4 py-1.5 rounded-full text-sm font-bold shadow-md">{middlemenCount} Layers</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  value={middlemenCount}
                  onChange={(e) => setMiddlemenCount(parseInt(e.target.value))}
                  className="w-full h-3 bg-[#0f3d2e] rounded-full appearance-none cursor-pointer outline-none border border-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#aff763] [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(175,247,99,0.8)] [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#aff763] [&::-moz-range-thumb]:border-none"
                />
                <div className="flex justify-between text-[11px] text-white/50 mt-4 font-mono">
                  <span>0 (Direct Hub)</span>
                  <span>5 (Traditional Grid)</span>
                </div>
              </div>
            </motion.div>

            {/* Dynamic Results Card */}
            <motion.div 
              {...fadeInUp}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-[#aff763] to-[#ffe088] rounded-[2.5rem] blur opacity-20" />
              <div className="relative glass-panel bg-[#031d15]/95 border border-[#aff763]/25 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                
                {/* Visual Chain Path */}
                <div className="mb-8 border-b border-white/10 pb-6">
                  <span className="text-xs uppercase font-label-bold tracking-widest text-[#aff763] block mb-3">Supply Chain Path (Simulation)</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {currentStats.path.map((node, i) => (
                      <React.Fragment key={node}>
                        <span className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          i === 0 ? "bg-[#aff763] text-[#0f2000]" : 
                          i === currentStats.path.length - 1 ? "bg-white text-[#00261a]" : "bg-white/10 text-white"
                        }`}>
                          {node}
                        </span>
                        {i < currentStats.path.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-white/40" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <div className="text-center bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-center items-center">
                    <span className="text-[10px] uppercase font-caption tracking-wider text-white/60 block mb-1">Farmer Share</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#aff763] whitespace-nowrap">{currentStats.farmerShare}%</span>
                  </div>
                  <div className="text-center bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-center items-center">
                    <span className="text-[10px] uppercase font-caption tracking-wider text-white/60 block mb-1">Buyer Markup</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-white whitespace-nowrap">+{currentStats.buyerMarkup}%</span>
                  </div>
                  <div className="text-center bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-center items-center">
                    <span className="text-[10px] uppercase font-caption tracking-wider text-white/60 block mb-1">Waste Rate</span>
                    <span className={`text-2xl sm:text-3xl font-extrabold whitespace-nowrap ${currentStats.wasteRate > 20 ? "text-[#ffdad6]" : "text-[#beedd7]"}`}>{currentStats.wasteRate}%</span>
                  </div>
                </div>

                <p className="text-sm text-[#beedd7] leading-relaxed italic bg-white/5 p-5 rounded-2xl border border-white/5">
                  {currentStats.description}
                </p>

              </div>
            </motion.div>

          </div>
        </section>

        {/* National Infrastructure Section */}
        <section className="py-24 bg-[#fbfaf2]" id="impact">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image Graphic */}
            <motion.div 
              {...fadeInUp}
              className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-2xl border-4 border-white bg-[#efeee6]"
            >
              <Image
                src="/farmer_family_1784145979104.png"
                alt="Bangladesh Agricultural Density Grid"
                fill
                className="object-cover grayscale-[0.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00261a]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap gap-3 items-center">
                <span className="flex items-center gap-1.5 bg-[#00261a]/85 text-white backdrop-blur-md px-4 py-2 rounded-xl text-xs border border-white/10 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#aff763]" /> Dhaka (Proposed Hub)
                </span>
                <span className="flex items-center gap-1.5 bg-[#00261a]/85 text-white backdrop-blur-md px-4 py-2 rounded-xl text-xs border border-white/10 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#aff763]" /> Rajshahi (Proposed Hub)
                </span>
              </div>
            </motion.div>

            {/* Right Copy */}
            <motion.div 
              {...fadeInUp}
              className="space-y-8"
            >
              <span className="inline-block px-4 py-2 bg-[#3d6a00]/10 rounded-full text-[#3d6a00] font-label-bold text-xs uppercase tracking-wider">
                Proposed Infrastructure Layout
              </span>
              <h2 className="text-3xl md:text-5xl font-headline-lg text-[#00261a]">Scaling a Nation&apos;s Digital Backbone.</h2>
              <p className="text-base md:text-lg font-body-md text-[#414944] leading-relaxed">
                With agriculture anchoring 11.5% of the GDP, our proposed digital grid plans to bridge infrastructure gaps from Rajshahi to Sylhet to enable direct value transaction routing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#c0c8c3]/40">
                <div className="p-6 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,38,26,0.01)] border-l-4 border-[#3d6a00] border-y border-r border-[#c0c8c3]/20">
                  <h4 className="font-label-bold text-[#00261a] text-sm uppercase mb-1">Target Clusters</h4>
                  <p className="text-xs text-[#414944]">Dhaka, Chattogram, Munshiganj</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-[0_4px_15px_rgba(0,38,26,0.01)] border-l-4 border-[#c0c8c3] border-y border-r border-[#c0c8c3]/20">
                  <h4 className="font-label-bold text-[#00261a] text-sm uppercase mb-1">Planned Expansion Targets</h4>
                  <p className="text-xs text-[#414944]">Sylhet Tea Belt & Rajshahi Orchards (Proposed)</p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 max-w-screen-2xl mx-auto text-center">
          <motion.div 
            {...fadeInUp}
            className="max-w-4xl mx-auto bg-[#00261a] py-24 px-8 md:px-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="text-[#aff763] font-label-bold tracking-widest text-xs uppercase mb-6 block">Join the Future</span>
              <h2 className="text-3xl md:text-5xl font-display-xl uppercase mb-8">
                Let&apos;s build the new <br />
                <span className="text-[#aff763] font-serif italic">Agricultural Standard.</span>
              </h2>
              <p className="text-base md:text-lg font-body-lg text-[#beedd7]/80 mb-12 max-w-xl mx-auto leading-relaxed">
                We are currently in the prototype phase, partnering with progressive farms and institutional buyers. Secure your spot in the beta.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/join" 
                  className="bg-[#aff763] text-[#0f2000] px-10 py-5 rounded-2xl font-label-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                >
                  Join Beta Waitlist
                </Link>
                <Link 
                  href="/join" 
                  className="glass-panel text-white px-10 py-5 rounded-2xl font-label-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all border-white/20"
                >
                  Partner as a Buyer
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
            <Link href="/impact" className="hover:text-[#00261a] transition-colors hover:underline">Impact Report</Link>
            <Link href="/support" className="hover:text-[#00261a] transition-colors hover:underline">Support Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
