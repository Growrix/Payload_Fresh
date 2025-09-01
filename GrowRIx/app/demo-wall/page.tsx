"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DemoWallHeader from "../../components/DemoWallHeader";
import DemoGrid from "../../components/DemoGrid";
import DemoFilters from "../../components/DemoFilters";
import DemoCTA from "../../components/DemoCTA";

export default function DemoWallPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white">
      <Navbar />

      <DemoWallHeader />

      <DemoFilters />

      <DemoGrid />

      <DemoCTA />

      <Footer />
    </main>
  );
}
