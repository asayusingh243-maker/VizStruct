import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ExecutionSection from "../components/ExecutionSection";
import MistakeSection from "../components/MistakeSection";
import FeatureSection from "../components/FeatureSection";
import ComparisonSection from "../components/ComparisonSection";
import LearningPathSection from "../components/LearningPathSection";
import DiagnosticCTA from "../components/DiagnosticCTA";
import Footer from "../components/Footer";
import LearningCompanionSection from "../components/LearningCompanionSection";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FC] text-[#17172B]">
      {/* Soft page background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#ECE9FF] blur-[100px]" />

        <div className="absolute right-[-80px] top-[320px] h-80 w-80 rounded-full bg-[#E4F7F5] blur-[100px]" />

        <div className="absolute bottom-[-100px] left-1/3 h-72 w-72 rounded-full bg-[#F1ECFF] blur-[100px]" />
      </div>

      {/* Very subtle decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,43,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,43,0.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
      <Navbar />
      <Hero />
      <ExecutionSection />
      <FeatureSection />
      <MistakeSection />
      <ComparisonSection />
      <LearningPathSection />
      <DiagnosticCTA />
      <LearningCompanionSection />
      <FinalCTA />
      <Footer />
      </div>
    </main>
  );
}