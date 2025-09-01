"use client";

import Navbar from "@/components/growrix/Navbar";
import Footer from "@/components/growrix/Footer";
import DemoWallHeader from "@/components/growrix/DemoWallHeader";
import DemoGrid from "@/components/growrix/DemoGrid";
import DemoFilters from "@/components/growrix/DemoFilters";
import DemoCTA from "@/components/growrix/DemoCTA";

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
