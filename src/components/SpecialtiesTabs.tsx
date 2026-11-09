import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, MessageCircle } from 'lucide-react';
import {
  SPECIALTIES,
  SpecialtyId,
  SpecialtyData,
} from '../utils/clinicLogic';

interface SpecialtiesTabsProps {
  activeSpecialtyId: SpecialtyId;
  onSelectSpecialty: (id: SpecialtyId) => void;
  onBookSpecialty: (specialtyId: SpecialtyId) => void;
}

export const SpecialtiesTabs: React.FC<SpecialtiesTabsProps> = ({
  activeSpecialtyId,
  onSelectSpecialty,
  onBookSpecialty,
}) => {
  const [fallbackActiveMap, setFallbackActiveMap] = useState<Record<string, boolean>>({});

  const activeSpecialty: SpecialtyData =
    SPECIALTIES.find((s) => s.id === activeSpecialtyId) ?? SPECIALTIES[0];

  const currentImgSrc = fallbackActiveMap[activeSpecialty.id]
    ? activeSpecialty.fallbackSvgUri
    : activeSpecialty.imageUrl;

  return (
    <section
      id="especialidades"
      aria-labelledby="heading-especialidades"
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Clean Mobile-First Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF] mb-1">
          Nuestras Especialidades
        </p>
        <h2
          id="heading-especialidades"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]"
        >
          Tratamientos pensados para tu salud y estética dental.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
          Tocá cada especialidad para ver los tratamientos que realizamos en el consultorio:
        </p>
      </div>

      {/* Simple, Mobile-Friendly 2x2 or 4-Button Tab Selector */}
      <div
        role="tablist"
        aria-label="Especialidades odontológicas"
        className="grid grid-cols-2 sm:inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 mb-6 w-full sm:w-auto"
      >
        {SPECIALTIES.map((specialty) => {
          const isSelected = specialty.id === activeSpecialtyId;
          return (
            <button
              key={specialty.id}
              role="tab"
              id={`tab-${specialty.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${specialty.id}`}
              type="button"
              onClick={() => onSelectSpecialty(specialty.id)}
              className={`relative px-4 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-sky-600 dark:bg-[#00E5FF] text-white dark:text-[#0A0F1C] shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <span>{specialty.label}</span>
            </button>
          );
        })}
      </div>

      {/* Smooth Cross-Fading Specialty Card (Simple, Clean, Zero Sub-Menus) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSpecialty.id}
          role="tabpanel"
          id={`panel-${activeSpecialty.id}`}
          aria-labelledby={`tab-${activeSpecialty.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 sm:p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-semibold text-sky-700 dark:text-[#00E5FF]">
                  Especialidad · {activeSpecialty.label}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1 [text-wrap:balance]">
                  {activeSpecialty.headline}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {activeSpecialty.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                  Principales tratamientos en {activeSpecialty.label}:
                </p>
                <ul className="space-y-2.5">
                  {activeSpecialty.treatments.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-200"
                    >
                      <Check
                        className="w-4 h-4 text-sky-600 dark:text-[#00E5FF] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {activeSpecialty.consultationNote}
                </p>
                <button
                  type="button"
                  onClick={() => onBookSpecialty(activeSpecialty.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] font-semibold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Consultar por {activeSpecialty.label}</span>
                </button>
              </div>
            </div>

            {/* Right Sample Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 aspect-[4/3]">
                <img
                  src={currentImgSrc}
                  alt={activeSpecialty.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (!fallbackActiveMap[activeSpecialty.id]) {
                      setFallbackActiveMap((prev) => ({
                        ...prev,
                        [activeSpecialty.id]: true,
                      }));
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-900/75 backdrop-blur-md text-[11px] font-medium text-white">
                  Imagen de ejemplo · {activeSpecialty.label}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
