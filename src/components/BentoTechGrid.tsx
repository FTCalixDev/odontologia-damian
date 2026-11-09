import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  HeartHandshake,
  ShieldCheck,
  Clock,
  MapPin,
} from 'lucide-react';
import { CLINIC_INFO, SAMPLE_IMAGES } from '../utils/clinicLogic';

export const BentoTechGrid: React.FC = () => {
  const [sample1Src, setSample1Src] = useState<string>(SAMPLE_IMAGES.clinicInterior);
  const [sample2Src, setSample2Src] = useState<string>(SAMPLE_IMAGES.heroSmile);

  return (
    <section
      id="consultorio"
      aria-labelledby="heading-consultorio"
      className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="max-w-2xl mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF] mb-1">
          Nuestro Consultorio en Tacuarembó
        </p>
        <h2
          id="heading-consultorio"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]"
        >
          Atención profesional, cálida y puntual en cada consulta.
        </h2>
      </div>

      {/* Clean Bento Grid: Honest Clinical Values + Real 4.8 Rating */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Atención Personalizada (2 cols on desktop) */}
        <motion.article
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
          className="md:col-span-2 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700 dark:text-[#00E5FF]">
              <HeartHandshake className="w-4 h-4" aria-hidden="true" />
              <span>Trato Directo y Claro</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Atención sin apuros y explicaciones claras antes de cada tratamiento.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              En cada cita te atiende directamente el Dr. Damián Pérez. Evaluamos tu caso con tranquilidad, te explicamos todas las alternativas disponibles y trabajamos con delicadeza para que te sientas cómodo y sin dolor.
            </p>
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/10 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-[#00E5FF]" aria-hidden="true" />
              Higiene y esterilización rigurosa
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-600 dark:text-[#00E5FF]" aria-hidden="true" />
              Respeto por tu horario agendado
            </span>
          </div>
        </motion.article>

        {/* Card 2: Calificación 4.8/5 en Google (Real Business Fact, Zero Fake Quotes) */}
        <motion.article
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.15 }}
          className="md:col-span-1 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Valoración en Google
              </span>
              <div
                className="flex items-center gap-0.5 text-amber-400"
                aria-label="4.8 de 5 estrellas"
              >
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white font-mono-tabular">
                {CLINIC_INFO.rating}
              </span>
              <span className="text-base text-slate-500 dark:text-slate-400 font-mono-tabular">
                / 5 estrellas
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Calificación otorgada por pacientes de nuestro consultorio en Tacuarembó.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-4 h-4 text-sky-600 dark:text-[#00E5FF] shrink-0" aria-hidden="true" />
            <span>{CLINIC_INFO.address}</span>
          </div>
        </motion.article>
      </div>

      {/* Sample Photos Section (Ready to be replaced when the user provides real photos) */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative">
            <img
              src={sample1Src}
              alt="Imagen de ejemplo del consultorio odontológico"
              referrerPolicy="no-referrer"
              onError={() => {
                if (sample1Src !== SAMPLE_IMAGES.clinicInteriorFallback) {
                  setSample1Src(SAMPLE_IMAGES.clinicInteriorFallback);
                }
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/75 backdrop-blur-md text-[11px] font-medium text-white">
              Imagen de ejemplo 1 (Espacio para foto real)
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Consultorio en Ramón González 135
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Ambiente cómodo, climatizado y equipado para tu atención en Tacuarembó.
            </p>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative">
            <img
              src={sample2Src}
              alt="Imagen de ejemplo de tratamientos dentales"
              referrerPolicy="no-referrer"
              onError={() => {
                if (sample2Src !== SAMPLE_IMAGES.heroSmileFallback) {
                  setSample2Src(SAMPLE_IMAGES.heroSmileFallback);
                }
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/75 backdrop-blur-md text-[11px] font-medium text-white">
              Imagen de ejemplo 2 (Espacio para foto real)
            </div>
          </div>
          <div className="p-4 sm:p-5">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Odontología General, Estética, Ortodoncia e Implantes
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Horarios de atención de Lunes a Viernes de 08:00 a 18:00 hs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
