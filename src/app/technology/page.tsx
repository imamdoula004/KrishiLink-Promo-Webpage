"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Brain, WifiOff, RefreshCw, Shield } from "lucide-react";
import Link from "next/link";

// Dynamically load FarmlandCanvas
const FarmlandCanvas = dynamic(() => import("../../components/FarmlandCanvas"), {
  ssr: false,
});

export default function TechnologyPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

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
        
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto min-h-[500px] flex items-center mb-16">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#3d6a00] font-label-bold text-sm uppercase tracking-widest mb-4 block font-bold"
            >
              The Infrastructure of Agriculture
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-display-xl text-[#00261a] leading-tight mb-8"
            >
              Engineering the <br />
              <span className="text-[#3d6a00] italic font-serif">Digital Harvest.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl font-body-lg text-[#414944] max-w-3xl leading-relaxed"
            >
              KrishiLink is not just a platform; it&apos;s a high-performance stack designed to bridge the connectivity gap. From edge-ML soil analysis to blockchain-traceable logistics, we build for the field.
            </motion.p>
          </div>
        </section>

        {/* Bento Grid with larger text & shadow cards */}
        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* AI-Driven Advisory (8-col) */}
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -6 }}
              className="lg:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-[#0f3d2e] p-8 md:p-12 text-white min-h-[480px] flex flex-col justify-end shadow-xl border border-white/10"
            >
              <div 
                className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-1000 bg-cover bg-center"
                style={{ backgroundImage: "url('/farmer_family_1784145979104.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00261a] via-[#00261a]/60 to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-4 text-[#aff763]">
                  <Brain className="w-6 h-6 animate-pulse" />
                  <span className="text-xs uppercase font-label-bold tracking-wider font-bold">Machine Learning</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-headline-lg mb-4 text-[#fbfaf2]">AI-Driven Predictive Advisory</h3>
                <p className="text-base md:text-lg font-body-md text-[#beedd7]/90 max-w-2xl leading-relaxed">
                  Our proprietary ML models ingest hyper-local weather patterns and real-time soil NPK data to deliver precision harvest windows and pest forecasting directly to farmers via low-latency nodes.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <div className="glass-panel p-5 rounded-2xl flex-1 bg-white/5 border-white/10">
                    <span className="text-xs uppercase font-caption opacity-70 block text-white">Accuracy Rate</span>
                    <div className="text-2xl md:text-3xl font-headline-md text-[#aff763] mt-1">94.2%</div>
                  </div>
                  <div className="glass-panel p-5 rounded-2xl flex-1 bg-white/5 border-white/10">
                    <span className="text-xs uppercase font-caption opacity-70 block text-white">Model Latency</span>
                    <div className="text-2xl md:text-3xl font-headline-md text-[#aff763] mt-1">&lt;200ms</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* PWA Resiliency (4-col) */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="lg:col-span-4 glass-panel rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border-[#00261a]/15 shadow-lg bg-white/40"
            >
              <div>
                <div className="flex items-center gap-2 mb-4 text-[#3d6a00]">
                  <WifiOff className="w-6 h-6" />
                  <span className="text-xs uppercase font-label-bold tracking-wider font-bold">Offline-First</span>
                </div>
                <h3 className="text-2xl font-headline-md text-[#00261a] mb-4">PWA Resiliency</h3>
                <p className="text-base font-body-md text-[#414944] leading-relaxed">
                  Engineered for rural connectivity with aggressive service-worker caching and background sync, ensuring critical market access even in zero-GPRS zones.
                </p>
              </div>
              <div className="mt-8">
                <div className="bg-[#00261a] p-5 rounded-2xl font-mono text-xs text-[#beedd7] overflow-hidden shadow-inner leading-relaxed">
                  <code className="block text-[#7ba894]">self.addEventListener(&apos;fetch&apos;, (event) =&gt; &#123;</code>
                  <code className="block pl-4">event.respondWith(</code>
                  <code className="block pl-8">caches.match(event.request).then((res) =&gt; &#123;</code>
                  <code className="block pl-12">return res || fetch(event.request);</code>
                  <code className="block pl-8">&#125;)</code>
                  <code className="block pl-4">);</code>
                  <code className="block text-[#7ba894]">&#125;);</code>
                </div>
              </div>
            </motion.div>

            {/* Blockchain Logistics (6-col) */}
            <motion.div 
              {...fadeInUp}
              whileHover={{ y: -6 }}
              className="lg:col-span-6 bg-[#efeee6] rounded-[2.5rem] p-8 md:p-10 border border-[#c0c8c3] flex flex-col md:flex-row gap-6 shadow-md"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#3d6a00]">
                    <RefreshCw className="w-6 h-6 animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="text-xs uppercase font-label-bold tracking-wider font-bold">Optimization</span>
                  </div>
                  <h3 className="text-2xl font-headline-md text-[#00261a] mb-4">Blockchain Logistics</h3>
                  <p className="text-base font-body-md text-[#414944] leading-relaxed">
                    A transparent ledger tracking every harvest from field to fork. Route optimization algorithms reduce carbon footprint by 22% through intelligent load aggregation.
                  </p>
                </div>
              </div>
              <div className="flex-grow min-h-[220px] relative rounded-2xl overflow-hidden shadow-inner md:w-1/2">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.05]"
                  style={{ backgroundImage: "url('/farmer_woman_1784145966179.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00261a]/60 to-transparent" />
              </div>
            </motion.div>

            {/* Security Shield (6-col) */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="lg:col-span-6 bg-[#00261a] text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group shadow-xl border border-white/5"
            >
              <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <Shield className="w-48 h-48 text-[#aff763]" />
              </div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-[#aff763]">
                    <Shield className="w-6 h-6" />
                    <span className="text-xs uppercase font-label-bold tracking-wider font-bold">Security</span>
                  </div>
                  <h3 className="text-2xl font-headline-md mb-4 text-[#fbfaf2]">End-to-End Encryption</h3>
                  <p className="text-base font-body-md text-[#beedd7]/90 leading-relaxed max-w-lg">
                    Farmer-buyer negotiations are secured using Signal-protocol inspired E2EE. Your data, your harvest, your privacy. No third-party observation, ever.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-[#aff763] animate-pulse" />
                  <span className="text-sm font-caption text-[#aff763] font-bold">AES-256 GCM Active</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Technical Specs Table */}
        <section className="py-24 bg-[#f5f4ec] border-y border-[#c0c8c3]/40">
          <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl font-headline-lg text-[#00261a] mb-10"
            >
              Core Engine Metrics
            </motion.h2>
            <div className="overflow-x-auto rounded-[2rem] border border-[#c0c8c3]/50 bg-white/40 backdrop-blur-md">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#c0c8c3] bg-[#efeee6]/50">
                    <th className="p-6 text-sm uppercase font-label-bold text-[#414944]">Component</th>
                    <th className="p-6 text-sm uppercase font-label-bold text-[#414944]">Technology Stack</th>
                    <th className="p-6 text-sm uppercase font-label-bold text-[#414944]">Key Performance Indicator</th>
                  </tr>
                </thead>
                <tbody className="text-base font-body-md text-[#1b1c17] divide-y divide-[#c0c8c3]/30">
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="p-6 font-bold">Inference Engine</td>
                    <td className="p-6">TensorFlow Lite / WASM Edge</td>
                    <td className="p-6 text-[#3d6a00] font-bold">98% Offline Availability (Projected)</td>
                  </tr>
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="p-6 font-bold">Real-time Messaging</td>
                    <td className="p-6">MQTT / WebSockets with E2EE</td>
                    <td className="p-6 text-[#3d6a00] font-bold">&lt;150ms Latency (Simulated)</td>
                  </tr>
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="p-6 font-bold">Distributed Ledger</td>
                    <td className="p-6">Hyperledger Fabric Integration</td>
                    <td className="p-6 text-[#3d6a00] font-bold">Full Provenance Sandbox Log</td>
                  </tr>
                  <tr className="hover:bg-white/60 transition-colors">
                    <td className="p-6 font-bold">Geo-Spatial Analysis</td>
                    <td className="p-6">GeoJSON / PostGIS / Sentinel-2 API</td>
                    <td className="p-6 text-[#3d6a00] font-bold">10m² Target Spatial Resolution</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>      </main>

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
