import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import { MapPin, Clock, Star } from 'lucide-react';
import { CLINIC_INFO, SAMPLE_IMAGES } from '../utils/clinicLogic';

interface CrystalTooth3DProps {
  scrollYProgress: MotionValue<number>;
}

export const CrystalTooth3D: React.FC<CrystalTooth3DProps> = ({ scrollYProgress }) => {
  const [imgSrc, setImgSrc] = useState<string>(SAMPLE_IMAGES.heroSmile);
  const yParallax = useTransform(scrollYProgress, [0, 0.4], [0, -30]);

  return (
    <motion.div
      style={{ y: yParallax }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Main Clean Hero Image Card (Sample Image ready for real clinic photo) */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg">
        <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800 relative">
          <img
            src={imgSrc}
            alt="Sonrisa saludable — Consultorio Odontólogo Damián Pérez"
            referrerPolicy="no-referrer"
            onError={() => {
              if (imgSrc !== SAMPLE_IMAGES.heroSmileFallback) {
                setImgSrc(SAMPLE_IMAGES.heroSmileFallback);
              }
            }}
            className="w-full h-full object-cover"
          />

          {/* Subtle Sample Photo Tag */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/75 backdrop-blur-md text-[11px] font-medium text-white">
            Imagen de ejemplo · Consultorio
          </div>
        </div>

        {/* Clean Clinical Summary Footer inside the Hero Card */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-[#00E5FF] shrink-0" aria-hidden="true" />
              <span>{CLINIC_INFO.address}</span>
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-[#00E5FF] shrink-0" aria-hidden="true" />
              <span>{CLINIC_INFO.hours}</span>
            </p>
          </div>

          <div className="shrink-0 text-right pl-3 border-l border-slate-200 dark:border-white/10">
            <div className="inline-flex items-center gap-1 text-amber-500 font-bold text-sm font-mono-tabular">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
              <span className="text-slate-900 dark:text-white">{CLINIC_INFO.rating}/5</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Google</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
