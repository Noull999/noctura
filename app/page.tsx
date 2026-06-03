"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { CRTOverlay } from "@/components/crt/Bezel";
import { LoadingScreen } from "@/components/intro/LoadingScreen";
import { StickyHeader } from "@/components/header/StickyHeader";
import { AsciiRainController } from "@/components/effects/AsciiRainController";
import { AudioLoop } from "@/components/audio/AudioLoop";
import { DripCursor } from "@/components/effects/DripCursor";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { ShadowHourMode } from "@/components/effects/ShadowHourMode";
import { CandleFlame } from "@/components/effects/CandleFlame";
import { ChapterNav } from "@/components/ui/ChapterNav";
import { ContactModal } from "@/components/ui/ContactModal";
import { Hero3D } from "@/components/sections/Hero3D";

const Manifiesto = dynamic(() => import("@/components/sections/Manifiesto").then(m => ({ default: m.Manifiesto })), { ssr: false });
const Origen = dynamic(() => import("@/components/sections/Origen").then(m => ({ default: m.Origen })), { ssr: false });
const Cuerpo = dynamic(() => import("@/components/sections/Cuerpo").then(m => ({ default: m.Cuerpo })), { ssr: false });
const Vestigios = dynamic(() => import("@/components/sections/Vestigios").then(m => ({ default: m.Vestigios })), { ssr: false });
const Codice = dynamic(() => import("@/components/sections/Codice").then(m => ({ default: m.Codice })), { ssr: false });
const FooterSection = dynamic(() => import("@/components/sections/Footer").then(m => ({ default: m.FooterSection })), { ssr: false });

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [sectionsReady, setSectionsReady] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setSectionsReady(true), 1500);
    return () => clearTimeout(t);
  }, [entered]);

  return (
    <main className="relative w-full bg-void text-ink">
      {/* Globales — siempre activos */}
      <DripCursor />
      <GrainOverlay />
      <ScrollProgress />
      <ChapterNav />
      <ShadowHourMode />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <LoadingScreen onEnter={(withAudio) => {
        setAudioEnabled(withAudio);
        setEntered(true);
      }} />

      {entered && (
        <>
          {audioEnabled && <AudioLoop />}
          <CRTOverlay />
          <AsciiRainController />
          <StickyHeader onContact={() => setContactOpen(true)} />

          {/* Vela decorativa fija en esquina inferior izquierda — solo desktop */}
          <div className="hidden md:block fixed bottom-8 left-8 z-[40] pointer-events-none">
            <CandleFlame />
          </div>

          <Hero3D onBreak={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })} />
        </>
      )}

      {sectionsReady && (
        <>
          <Manifiesto />
          <Origen />
          <Cuerpo />
          <Vestigios />
          <Codice />
          <FooterSection onContact={() => setContactOpen(true)} />
        </>
      )}
    </main>
  );
}
