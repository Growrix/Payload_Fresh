"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import CaseStudies from "../components/CaseStudies";
import ProcessTimeline from "../components/ProcessTimeline";
import StatsSection from "../components/StatsSection";
import ShopPreview from "../components/ShopPreview";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />
      <HeroSection />
      <Features />
      <CaseStudies />
      <ProcessTimeline />
      <StatsSection />
      <ShopPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
