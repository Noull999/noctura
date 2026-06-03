"use client";

import { useState, useEffect } from "react";
import { CRTOverlay } from "@/components/crt/Bezel";
import { LoadingScreen } from "@/components/intro/LoadingScreen";
import { StickyHeader } from "@/components/header/StickyHeader";
import { AsciiRainController } from "@/components/effects/AsciiRainController";
import { AudioLoop } from "@/components/audio/AudioLoop";
import { Hero3D } from "@/components/sections/Hero3D";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Origen } from "@/components/sections/Origen";
import { Cuerpo } from "@/components/sections/Cuerpo";
import { Vestigios } from "@/components/sections/Vestigios";
import { FooterSection } from "@/components/sections/Footer";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  // Las secciones inferiores montan 1.5s después para no competir con el Hero
  const [sectionsReady, setSectionsReady] = useState(false);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setSectionsReady(true), 1500);
    return () => clearTimeout(t);
  }, [entered]);

  return (
    <main className="relative w-full bg-void text-ink">
      <LoadingScreen onEnter={(withAudio) => {
        setAudioEnabled(withAudio);
        setEntered(true);
      }} />

      {entered && (
        <>
          {audioEnabled && <AudioLoop />}
          <CRTOverlay />
          <AsciiRainController />
          <StickyHeader />
          <Hero3D onBreak={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} />
        </>
      )}

      {sectionsReady && (
        <>
          <Manifiesto />
          <Origen />
          <Cuerpo />
          <Vestigios />
          <FooterSection />
        </>
      )}
    </main>
  );
}
