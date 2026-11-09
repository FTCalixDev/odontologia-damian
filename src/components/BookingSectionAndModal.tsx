import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  X,
  Calendar,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  CLINIC_INFO,
  SPECIALTIES,
  VALID_DAYS,
  VALID_TIME_SLOTS,
  SpecialtyId,
  BookingInput,
  validateBookingRequest,
  buildWhatsAppBookingUrl,
} from '../utils/clinicLogic';

interface BookingSectionAndModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  initialSpecialtyId: SpecialtyId;
  onBookingConfirmed: (bookingSummary: {
    patientName: string;
    specialtyLabel: string;
    day: string;
    timeSlot: string;
    whatsappUrl: string;
  }) => void;
}

export const BookingSectionAndModal: React.FC<BookingSectionAndModalProps> = ({
  isModalOpen,
  onCloseModal,
  initialSpecialtyId,
  onBookingConfirmed,
}) => {
  const [formState, setFormState] = useState<BookingInput>({
    patientName: '',
    phone: '',
    specialtyId: initialSpecialtyId,
    preferredDay: VALID_DAYS[0],
    preferredTimeSlot: VALID_TIME_SLOTS[1],
    notes: '',
  });

  const [errors, setErrors] = useState<{
    patientName?: string;
    phone?: string;
    preferredDay?: string;
    preferredTimeSlot?: string;
  }>({});

  const [submittedBooking, setSubmittedBooking] = useState<{
    patientName: string;
    specialtyLabel: string;
    day: string;
    timeSlot: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      specialtyId: initialSpecialtyId,
    }));
  }, [initialSpecialtyId]);

  const currentSpecialty =
    SPECIALTIES.find((s) => s.id === formState.specialtyId) ?? SPECIALTIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingRequest(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const whatsappUrl = buildWhatsAppBookingUrl(formState);
    const summary = {
      patientName: formState.patientName.trim(),
      specialtyLabel: currentSpecialty.label,
      day: formState.preferredDay,
      timeSlot: formState.preferredTimeSlot,
      whatsappUrl,
    };
    setSubmittedBooking(summary);
    onBookingConfirmed(summary);
  };

  const renderFormFields = (idPrefix: string) => (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-patientName`}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Tu Nombre y Apellido *
          </label>
          <input
            id={`${idPrefix}-patientName`}
            type="text"
            required
            placeholder="Ej: Juan Pérez"
            value={formState.patientName}
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, patientName: e.target.value }));
              if (errors.patientName) {
                setErrors((prev) => ({ ...prev, patientName: undefined }));
              }
            }}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-600 dark:focus:border-[#00E5FF]"
          />
          {errors.patientName && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.patientName}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Tu Celular o Teléfono *
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            required
            placeholder="Ej: 099 186 996"
            value={formState.phone}
            onChange={(e) => {
              setFormState((prev) => ({ ...prev, phone: e.target.value }));
              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-600 dark:focus:border-[#00E5FF] font-mono-tabular"
          />
          {errors.phone && (
            <p
              role="alert"
              className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-specialty`}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Especialidad
          </label>
          <select
            id={`${idPrefix}-specialty`}
            value={formState.specialtyId}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                specialtyId: e.target.value as SpecialtyId,
              }))
            }
            className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-600 dark:focus:border-[#00E5FF]"
          >
            {SPECIALTIES.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-day`}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Día Preferido
          </label>
          <select
            id={`${idPrefix}-day`}
            value={formState.preferredDay}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                preferredDay: e.target.value,
              }))
            }
            className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-600 dark:focus:border-[#00E5FF]"
          >
            {VALID_DAYS.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-timeSlot`}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Horario Preferido
          </label>
          <select
            id={`${idPrefix}-timeSlot`}
            value={formState.preferredTimeSlot}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                preferredTimeSlot: e.target.value,
              }))
            }
            className="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-600 dark:focus:border-[#00E5FF] font-mono-tabular"
          >
            {VALID_TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-notes`}
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
        >
          Comentario opcional (motivo de consulta)
        </label>
        <input
          id={`${idPrefix}-notes`}
          type="text"
          placeholder="Ej: Limpieza, consulta por implante, dolor de muela..."
          value={formState.notes}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, notes: e.target.value }))
          }
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-600 dark:focus:border-[#00E5FF]"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] font-semibold text-sm transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span>Preparar Mensaje para Agendar</span>
        </button>
      </div>
    </form>
  );

  const renderConfirmationCard = () => {
    if (!submittedBooking) return null;
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl bg-sky-50 dark:bg-[#0A0F1C] border border-sky-200 dark:border-[#00E5FF]/50 p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2
              className="w-6 h-6 text-sky-600 dark:text-[#00E5FF] shrink-0"
              aria-hidden="true"
            />
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Solicitud lista para enviar por WhatsApp
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {submittedBooking.patientName} · {submittedBooking.specialtyLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSubmittedBooking(null)}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:underline cursor-pointer whitespace-nowrap"
          >
            Modificar
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Día seleccionado: <strong>{submittedBooking.day}</strong> ({submittedBooking.timeSlot}). Tocá el botón para enviar tu mensaje al{' '}
          <strong className="font-mono-tabular">099 186 996</strong>:
        </p>

        <div>
          <a
            href={submittedBooking.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>Enviar WhatsApp al 099 186 996</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* In-Page Contact & Consultation Section */}
      <section
        id="contacto"
        aria-labelledby="heading-contacto"
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Clinic Details */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF] mb-1">
                  Contacto y Ubicación
                </p>
                <h2
                  id="heading-contacto"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]"
                >
                  Agendá tu consulta en Tacuarembó.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Escribinos directamente por WhatsApp al{' '}
                  <span className="font-mono-tabular font-semibold text-slate-900 dark:text-white">
                    {CLINIC_INFO.phoneDisplay}
                  </span>{' '}
                  o completá tus datos para armar el mensaje de turno.
                </p>
              </div>

              <div className="space-y-3.5 pt-4 border-t border-slate-100 dark:border-white/10 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-sky-600 dark:text-[#00E5FF] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Dirección</p>
                    <p className="text-slate-600 dark:text-slate-300">{CLINIC_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="w-5 h-5 text-sky-600 dark:text-[#00E5FF] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Horarios de Atención</p>
                    <p className="text-slate-600 dark:text-slate-300 font-mono-tabular">
                      {CLINIC_INFO.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="w-5 h-5 text-sky-600 dark:text-[#00E5FF] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Teléfono / WhatsApp
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 font-mono-tabular">
                      {CLINIC_INFO.phoneDisplay}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Simple Booking Form */}
            <div className="lg:col-span-7">
              {submittedBooking ? (
                renderConfirmationCard()
              ) : (
                renderFormFields('section')
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Drawer for Quick Booking */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-booking-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-white/15 p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-semibold text-sky-700 dark:text-[#00E5FF]">
                    {CLINIC_INFO.name}
                  </p>
                  <h3
                    id="modal-booking-title"
                    className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
                  >
                    Agendar Consulta
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onCloseModal}
                  aria-label="Cerrar ventana"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {submittedBooking ? (
                renderConfirmationCard()
              ) : (
                renderFormFields('modal')
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
