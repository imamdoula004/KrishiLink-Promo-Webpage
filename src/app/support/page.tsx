"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Gavel, ShieldCheck, HelpCircle, ChevronDown, Mail, Send, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dynamically load FarmlandCanvas
const FarmlandCanvas = dynamic(() => import("../../components/FarmlandCanvas"), {
  ssr: false,
});

export default function SupportPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("beta-terms");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Simple active link detection
      const sections = ["beta-terms", "privacy", "technical-support", "inquiry"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          FormType: "Support Inquiry",
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Message: formData.message
        })
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "How do I access the simulated AI Soil Advisory tool during the Prototype Phase?",
      a: "In the prototype phase, you can access the sandbox AI tool via the 'Advisory' tab in the main navigation. Simply upload a sample photo of a field or input mock sensor data strings. Response times represent projected system latency under real workloads."
    },
    {
      q: "What happens if connection drops during a simulated trade?",
      a: "KrishiLink's proposed 'Persistent State' architecture will cache transaction details locally. Once the connection is restored, the client app synchronizes with the simulated ledger to finalize the trade."
    },
    {
      q: "Are the buyer and farmer waitlists actual binding signups?",
      a: "No. The waitlist signup processes represent UI mock flows. Filling them registers interest inside our prototype simulation database. No contractual obligations are generated."
    },
    {
      q: "How are the projected yield increases calculated?",
      a: "Yield gains represent regression models built on initial test plot crops. Actual yields in production may vary based on weather models, offline coverage boundaries, and individual agronomy standards."
    }
  ];

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
        <div className="px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Navigation Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-36 h-fit">
            <div className="glass-panel p-8 rounded-[2rem] space-y-6 border-[#00261a]/15 shadow-xl bg-white/40">
              <h3 className="font-headline-lg text-2xl text-[#00261a] font-bold">Support Hub</h3>
              <nav className="flex flex-col space-y-2">
                <a
                  href="#beta-terms"
                  className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all ${
                    activeSection === "beta-terms"
                      ? "bg-[#0f3d2e]/10 border-l-4 border-[#3d6a00] text-[#00261a] font-bold shadow-sm"
                      : "text-[#414944] hover:bg-[#efeee6]/50"
                  }`}
                >
                  <Gavel className="w-5 h-5" />
                  <span className="text-sm font-label-bold uppercase tracking-wider">Beta Terms</span>
                </a>
                <a
                  href="#privacy"
                  className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all ${
                    activeSection === "privacy"
                      ? "bg-[#0f3d2e]/10 border-l-4 border-[#3d6a00] text-[#00261a] font-bold shadow-sm"
                      : "text-[#414944] hover:bg-[#efeee6]/50"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-label-bold uppercase tracking-wider">Privacy Framework</span>
                </a>
                <a
                  href="#technical-support"
                  className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all ${
                    activeSection === "technical-support"
                      ? "bg-[#0f3d2e]/10 border-l-4 border-[#3d6a00] text-[#00261a] font-bold shadow-sm"
                      : "text-[#414944] hover:bg-[#efeee6]/50"
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm font-label-bold uppercase tracking-wider">Technical FAQ</span>
                </a>
                <a
                  href="#inquiry"
                  className={`flex items-center gap-3.5 p-4 rounded-2xl transition-all ${
                    activeSection === "inquiry"
                      ? "bg-[#0f3d2e]/10 border-l-4 border-[#3d6a00] text-[#00261a] font-bold shadow-sm"
                      : "text-[#414944] hover:bg-[#efeee6]/50"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm font-label-bold uppercase tracking-wider">Inquiry Form</span>
                </a>
              </nav>
              
              <div className="pt-6 border-t border-[#c0c8c3]/40">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#aff763] animate-pulse" />
                  <span className="text-xs uppercase font-label-bold text-[#3d6a00] font-bold">Prototype Mode</span>
                </div>
                <p className="text-xs text-[#414944]/60">Last updated: Oct 2026</p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-20">
            
            {/* Header Banner */}
            <motion.div 
              {...fadeInUp}
              className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16 bg-[#0f3d2e] text-white shadow-xl border border-white/5"
            >
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-display-xl mb-4 text-[#fbfaf2]">
                  Legal &amp; Support <span className="text-[#aff763]">Hub</span>
                </h1>
                <p className="text-base md:text-lg font-body-lg text-[#beedd7] leading-relaxed">
                  Review sandbox specifications, projected security measures, and send inquiries to the developer squad.
                </p>
              </div>
            </motion.div>

            {/* Beta Terms */}
            <section id="beta-terms" className="scroll-mt-32 space-y-6">
              <motion.div 
                {...fadeInUp}
                className="flex items-center gap-4"
              >
                <div className="p-3.5 rounded-full bg-[#ffe088]/20 text-[#735c00]">
                  <Gavel className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-headline-lg text-[#00261a]">Beta Program Projections</h2>
              </motion.div>
              <motion.div 
                {...fadeInUp}
                className="glass-panel p-8 md:p-10 rounded-[2.5rem] shadow-md border-l-4 border-[#cba72f] border-[#00261a]/10 bg-white/40"
              >
                <h4 className="text-lg md:text-xl font-headline-md text-[#00261a] mb-4 font-bold">1. Prototype Sandbox Rights</h4>
                <p className="text-base font-body-md text-[#414944] leading-relaxed mb-8">
                  The KrishiLink Beta environment is a test-phase sandbox. Users are granted a revocable, non-exclusive license to explore simulated AI crop suggestions and logistics maps for feedback purposes. All metrics shown are estimated projections and simulated forecasts.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#efeee6]/50 p-6 rounded-2xl border border-[#c0c8c3]/20">
                    <h5 className="font-label-bold text-sm uppercase text-[#00261a] mb-2 font-bold font-serif">Simulated Feedback Loop</h5>
                    <p className="text-xs md:text-sm text-[#414944] leading-relaxed">
                      Your insights drive prototype updates. By participating, you agree that KrishiLink may use all mock transaction feedback to improve final production models.
                    </p>
                  </div>
                  <div className="bg-[#efeee6]/50 p-6 rounded-2xl border border-[#c0c8c3]/20">
                    <h5 className="font-label-bold text-sm uppercase text-[#00261a] mb-2 font-bold font-serif">Prototype Disclaimer</h5>
                    <p className="text-xs md:text-sm text-[#414944] leading-relaxed">
                      As an unreleased experimental prototype, services are simulated &apos;as-is&apos;. No actual transactions occur, and no financial liabilities are generated.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Privacy Framework */}
            <section id="privacy" className="scroll-mt-32 space-y-6">
              <motion.div 
                {...fadeInUp}
                className="flex items-center gap-4"
              >
                <div className="p-3.5 rounded-full bg-[#beedd7]/40 text-[#00261a]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-headline-lg text-[#00261a]">Privacy Framework Projections</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <motion.div 
                  {...fadeInUp}
                  className="md:col-span-8 glass-panel p-8 md:p-10 rounded-[2.5rem] border-[#00261a]/15 shadow-md bg-white/40"
                >
                  <h4 className="text-lg md:text-xl font-headline-md text-[#00261a] mb-4 font-bold">Proposed Farmer Data Siloing</h4>
                  <p className="text-base font-body-md text-[#414944] leading-relaxed mb-6">
                    Our proposed system uses zero-knowledge verification frameworks. This allows certified yields to be verified in database index mappings while shielding actual farmer identity parameters until direct buyer consent.
                  </p>
                  <ul className="space-y-4 text-sm font-body-md text-[#414944]">
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#3d6a00] shrink-0 mt-1.5" />
                      <span>Projected encrypted geo-tagging tracks logistics bounds without displaying household map nodes.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-[#3d6a00] shrink-0 mt-1.5" />
                      <span>Strict data boundaries prevent sharing raw agronomy logs with third-party pricing services.</span>
                    </li>
                  </ul>
                </motion.div>
                <motion.div 
                  {...fadeInUp}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-4 rounded-[2.5rem] overflow-hidden min-h-[280px] relative shadow-2xl flex flex-col justify-end p-6 text-white"
                >
                  <Image
                    src="/farmer_woman_1784145966179.png"
                    alt="Sustainable Jute Farmer"
                    fill
                    className="object-cover grayscale-[0.2]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00261a] to-transparent z-0" />
                  <div className="relative z-10">
                    <span className="text-xs uppercase font-label-bold text-[#beedd7] block">Security Grade</span>
                    <span className="text-5xl font-extrabold text-[#aff763]">A+</span>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* FAQ */}
            <section id="technical-support" className="scroll-mt-32 space-y-6">
              <motion.div 
                {...fadeInUp}
                className="flex items-center gap-4"
              >
                <div className="p-3.5 rounded-full bg-[#beedd7]/40 text-[#00261a]">
                  <HelpCircle className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-headline-lg text-[#00261a]">Prototype Technical FAQ</h2>
              </motion.div>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div 
                    key={index} 
                    {...fadeInUp}
                    className="glass-panel rounded-[1.8rem] overflow-hidden transition-all hover:shadow-md border-l-4 border-[#c0c8c3] bg-white/40"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 md:p-8 text-left flex justify-between items-center gap-4"
                    >
                      <span className="font-headline-md text-base md:text-lg text-[#00261a] font-bold">{faq.q}</span>
                      <ChevronDown 
                        className={`w-6 h-6 text-[#414944] shrink-0 transition-transform duration-300 ${
                          expandedFaq === index ? "rotate-180" : ""
                        }`} 
                      />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-[#414944] font-body-md leading-relaxed border-t border-[#c0c8c3]/15 pt-5 bg-[#efeee6]/25">
                        {faq.a}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* General Inquiry Form Card */}
            <section id="inquiry" className="scroll-mt-32 space-y-6">
              <motion.div 
                {...fadeInUp}
                className="flex items-center gap-4"
              >
                <div className="p-3.5 rounded-full bg-[#beedd7]/40 text-[#00261a]">
                  <Mail className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-headline-lg text-[#00261a]">General Inquiry</h2>
              </motion.div>
              
              <motion.div 
                {...fadeInUp}
                className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-[#00261a]/15 shadow-xl bg-white/60 relative overflow-hidden"
              >
                <div className="max-w-2xl">
                  <h3 className="text-xl md:text-2xl font-bold text-[#00261a] mb-2 font-serif">Have a question or request?</h3>
                  <p className="text-sm md:text-base text-[#414944] mb-8 leading-relaxed">
                    Submit your query below. Responses will be directly delivered to the team lead&apos;s email inbox at imamshadin004@gmail.com for review.
                  </p>
                  
                  {submitStatus === "success" ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#0f3d2e]/10 border border-[#3d6a00]/30 rounded-2xl p-6 flex items-start gap-4"
                    >
                      <CheckCircle className="w-8 h-8 text-[#3d6a00] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-[#00261a] text-lg mb-1">Inquiry Sent Successfully!</h4>
                        <p className="text-sm text-[#414944] leading-relaxed">
                          Thank you for reaching out. We have received your query and will reply directly to your email inbox shortly.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs uppercase font-label-bold text-[#414944] tracking-wider mb-2 font-bold">Your Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-white/70 border border-[#c0c8c3] rounded-xl px-5 py-3 text-base text-[#00261a] placeholder:text-[#414944]/40 focus:outline-none focus:border-[#3d6a00] focus:ring-1 focus:ring-[#3d6a00] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs uppercase font-label-bold text-[#414944] tracking-wider mb-2 font-bold">Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="name@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/70 border border-[#c0c8c3] rounded-xl px-5 py-3 text-base text-[#00261a] placeholder:text-[#414944]/40 focus:outline-none focus:border-[#3d6a00] focus:ring-1 focus:ring-[#3d6a00] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-label-bold text-[#414944] tracking-wider mb-2 font-bold">Subject</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Partnership Opportunity"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-white/70 border border-[#c0c8c3] rounded-xl px-5 py-3 text-base text-[#00261a] placeholder:text-[#414944]/40 focus:outline-none focus:border-[#3d6a00] focus:ring-1 focus:ring-[#3d6a00] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-label-bold text-[#414944] tracking-wider mb-2 font-bold">Message Details</label>
                        <textarea 
                          rows={5}
                          required
                          placeholder="Describe your inquiry..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/70 border border-[#c0c8c3] rounded-xl px-5 py-4 text-base text-[#00261a] placeholder:text-[#414944]/40 focus:outline-none focus:border-[#3d6a00] focus:ring-1 focus:ring-[#3d6a00] transition-all resize-none"
                        />
                      </div>

                      {submitStatus === "error" && (
                        <p className="text-sm font-bold text-red-600">
                          Something went wrong. Please check your internet connection or try again.
                        </p>
                      )}

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#00261a] hover:bg-[#3d6a00] text-[#aff763] hover:text-white px-8 py-4 rounded-full font-label-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          "Sending Message..."
                        ) : (
                          <>
                            Send Message <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            </section>

          </div>
        </div>
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
            <Link href="/support" className="hover:text-[#00261a] transition-colors hover:underline text-[#3d6a00] font-bold">Support Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
