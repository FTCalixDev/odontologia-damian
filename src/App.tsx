/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll } from 'motion/react';
import {
  Calendar,
  MessageCircle,
  Sun,
  Moon,
  CheckCircle2,
  PhoneCall,
  Download,
} from 'lucide-react';
import {
  CLINIC_INFO,
  SpecialtyId,
} from './utils/clinicLogic';
import { triggerStandaloneHtmlDownload } from './utils/exportHtml';
import { CrystalTooth3D } from './components/CrystalTooth3D';
import { SpecialtiesTabs } from './components/SpecialtiesTabs';
import { BentoTechGrid } from './components/BentoTechGrid';
import { BookingSectionAndModal } from './components/BookingSectionAndModal';

export default function App() {
  const { scrollYProgress } = useScroll();

  // Default to Light Mode ("tema claro")
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('dp_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  const [htmlDownloadedNotice, setHtmlDownloadedNotice] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('dp_theme', theme);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [theme]);

  const handleDownloadHtml = useCallback(() => {
    triggerStandaloneHtmlDownload(theme);
    setHtmlDownloadedNotice(true);
    setTimeout(() => {
      setHtmlDownloadedNotice(false);
    }, 4000);
  }, [theme]);

  // Keyboard shortcut: Alt + D or Ctrl/Cmd + Shift + D to download the complete .html file
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isAltD = e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'd';
      const isCtrlShiftD =
        (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd';

      if (isAltD || isCtrlShiftD) {
        e.preventDefault();
        handleDownloadHtml();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDownloadHtml]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [activeSpecialtyId, setActiveSpecialtyId] =
    useState<SpecialtyId>('estetica');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [lastConfirmedBooking, setLastConfirmedBooking] = useState<{
    patientName: string;
    specialtyLabel: string;
    day: string;
    timeSlot: string;
    whatsappUrl: string;
  } | null>(null);

  const directWhatsAppHref = `https://wa.me/${CLINIC_INFO.whatsappNumberInternational}`;

  const handleOpenBooking = (specialtyId: SpecialtyId = activeSpecialtyId) => {
    setActiveSpecialtyId(specialtyId);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0A0F1C] dark:text-slate-100 relative pb-24 transition-colors duration-200">
      {/* Notification Toast when HTML Download is Triggered via Keyboard Shortcut */}
      {htmlDownloadedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-16 right-4 z-50 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-2"
        >
          <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Descargando odontologo-damian-perez.html completo...</span>
        </div>
      )}

      {/* 1. Clean Top Bar (Mobile-First, Light/Dark Toggle + Primary CTA) */}
      <div className="sticky top-2 z-40 px-3 sm:px-6 max-w-6xl mx-auto">
        <header className="flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 py-3 rounded-2xl bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap shrink-0"
          >
            {CLINIC_INFO.name}
          </a>

          {/* Simple Desktop Navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <a
              href="#especialidades"
              className="hover:text-sky-600 dark:hover:text-[#00E5FF] transition-colors whitespace-nowrap"
            >
              Especialidades
            </a>
            <a
              href="#consultorio"
              className="hover:text-sky-600 dark:hover:text-[#00E5FF] transition-colors whitespace-nowrap"
            >
              Consultorio
            </a>
            <a
              href="#contacto"
              className="hover:text-sky-600 dark:hover:text-[#00E5FF] transition-colors whitespace-nowrap"
            >
              Ubicación y Contacto
            </a>
          </nav>

          {/* Actions: Light/Dark Theme Switch + Agendar Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'light'
                  ? 'Cambiar a modo oscuro'
                  : 'Cambiar a modo claro'
              }
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" aria-hidden="true" />
                  <span>Oscuro</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>Claro</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleOpenBooking(activeSpecialtyId)}
              className="px-3 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Agendar</span>
              <span className="hidden sm:inline"> Consulta</span>
            </button>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* 2. Mobile-First Professional Hero Section */}
        <section
          aria-label="Presentación principal"
          className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-6 sm:pt-12 pb-10 sm:pb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Hero Text Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
                className="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF]"
              >
                Consultorio Odontológico en Tacuarembó · Ramón González 135
              </motion.p>

              <motion.h1
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] [text-wrap:balance]"
              >
                Cuidamos tu salud y estética dental con atención personalizada.
              </motion.h1>

              <motion.p
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
              >
                Odontología general, estética, ortodoncia e implantes en un ambiente cálido, puntual y de confianza. Atendemos de lunes a viernes de 08:00 a 18:00 hs.
              </motion.p>

              {/* Primary Mobile-Friendly CTAs */}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] font-semibold text-base shadow-sm transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Agendar por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenBooking(activeSpecialtyId)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-sm sm:text-base font-semibold text-slate-800 dark:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4 text-sky-600 dark:text-[#00E5FF]" aria-hidden="true" />
                  <span>Elegir Día y Horario</span>
                </button>
              </motion.div>

              {lastConfirmedBooking && (
                <div
                  role="status"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-sky-50 dark:bg-[#00E5FF]/15 border border-sky-200 dark:border-[#00E5FF]/40 text-xs sm:text-sm text-slate-900 dark:text-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-[#00E5FF] shrink-0" aria-hidden="true" />
                  <span>
                    Turno preparado para <strong>{lastConfirmedBooking.patientName}</strong> ({lastConfirmedBooking.specialtyLabel} · {lastConfirmedBooking.day})
                  </span>
                </div>
              )}
            </div>

            {/* Hero Visual Card (5 cols) */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="lg:col-span-5"
            >
              <CrystalTooth3D scrollYProgress={scrollYProgress} />
            </motion.div>
          </div>
        </section>

        {/* 3. Simplified Specialties Tabs (Estética Dental, Ortodoncia, Implantes, General) */}
        <SpecialtiesTabs
          activeSpecialtyId={activeSpecialtyId}
          onSelectSpecialty={setActiveSpecialtyId}
          onBookSpecialty={(specId) => handleOpenBooking(specId)}
        />

        {/* 4. Clean Clinic Overview, 4.8 Google Rating & Sample Photos */}
        <BentoTechGrid />

        {/* 5. Contact & Appointment Section + Modal */}
        <BookingSectionAndModal
          isModalOpen={isBookingModalOpen}
          onCloseModal={() => setIsBookingModalOpen(false)}
          initialSpecialtyId={activeSpecialtyId}
          onBookingConfirmed={(summary) => setLastConfirmedBooking(summary)}
        />
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-900 dark:text-white font-display">
              {CLINIC_INFO.name}
            </p>
            <p className="mt-0.5">
              {CLINIC_INFO.address} · {CLINIC_INFO.hours}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono-tabular text-slate-700 dark:text-slate-200 font-semibold">
            <PhoneCall className="w-4 h-4 text-sky-600 dark:text-[#00E5FF]" aria-hidden="true" />
            <span>Tel / WhatsApp: {CLINIC_INFO.phoneDisplay}</span>
          </div>
        </div>
      </footer>

      {/* 6. Mobile-First Sticky Bottom WhatsApp Bar (z-50) */}
      <div
        role="region"
        aria-label="Contacto directo por WhatsApp"
        className="fixed bottom-0 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 pb-3"
      >
        <div className="max-w-3xl mx-auto pointer-events-auto rounded-2xl bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 px-3.5 py-2.5 shadow-lg flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 whitespace-nowrap">
            <span className="font-bold text-slate-900 dark:text-white">{CLINIC_INFO.name}</span>
            <span aria-hidden="true">·</span>
            <span>Ramón González 135, Tacuarembó</span>
          </div>

          <a
            href={directWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Agendar vía WhatsApp: {CLINIC_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
