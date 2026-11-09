export type SpecialtyId = 'estetica' | 'ortodoncia' | 'implantes' | 'general';

export interface SpecialtyData {
  id: SpecialtyId;
  label: string;
  headline: string;
  description: string;
  treatments: string[];
  consultationNote: string;
  imageUrl: string;
  imageAlt: string;
}

export interface BookingInput {
  patientName: string;
  phone: string;
  specialtyId: SpecialtyId;
  preferredDay: string;
  preferredTimeSlot: string;
  notes?: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: {
    patientName?: string;
    phone?: string;
    preferredDay?: string;
    preferredTimeSlot?: string;
  };
}

export const CLINIC_INFO = {
  name: 'Odontólogo Damián Pérez',
  address: 'Ramón González 135, Tacuarembó, Uruguay',
  hours: 'Lunes a Viernes, 08:00 a 18:00 hs',
  phoneDisplay: '099 186 996',
  whatsappNumberInternational: '59899186996',
  rating: 4.8,
  maxRating: 5.0,
} as const;

export const VALID_DAYS = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
] as const;

export const VALID_TIME_SLOTS = [
  '08:00 a 10:00 hs',
  '10:00 a 12:00 hs',
  '14:00 a 16:00 hs',
  '16:00 a 18:00 hs',
] as const;

export const SPECIALTIES: SpecialtyData[] = [
  {
    id: 'estetica',
    label: 'Estética Dental',
    headline: 'Mejorá el color y la armonía de tu sonrisa con resultados naturales.',
    description:
      'Realizamos tratamientos estéticos conservadores que cuidan tus dientes naturales, buscando siempre una sonrisa armónica, saludable y acorde a tus facciones.',
    treatments: [
      'Blanqueamiento dental profesional en consultorio y ambulatorio',
      'Carillas estéticas de porcelana y resina de alta estética',
      'Restauraciones invisibles sin metal en dientes anteriores y posteriores',
      'Cierre de espacios interdentales y remodelado estético del esmalte',
    ],
    consultationNote: 'Evaluación personalizada y presupuesto claro en tu primera consulta.',
    imageUrl: '/src/assets/images/aesthetic_smile_macro_1794264096229.jpg',
    imageAlt: 'Imagen de referencia de estética dental',
  },
  {
    id: 'ortodoncia',
    label: 'Ortodoncia',
    headline: 'Alineación dental y corrección de la mordida para niños, jóvenes y adultos.',
    description:
      'Corregimos la posición de los dientes y mejoramos la función masticatoria con controles mensuales prolijos y opciones adaptadas a tu estilo de vida.',
    treatments: [
      'Ortodoncia convencional con brackets metálicos de perfil cómodo',
      'Brackets estéticos discretos del color del diente',
      'Ortodoncia interceptiva y funcional para niños en etapa de crecimiento',
      'Placas de descanso y contención para bruxismo o tensión mandibular',
    ],
    consultationNote: 'Seguimiento mensual directo con el Dr. Damián Pérez.',
    imageUrl: '/src/assets/images/dental_clinic_interior_1794264094702.jpg',
    imageAlt: 'Imagen de referencia de atención ortodóncica',
  },
  {
    id: 'implantes',
    label: 'Implantes',
    headline: 'Recuperá piezas dentales perdidas con seguridad y firmeza al masticar.',
    description:
      'Reemplazamos dientes ausentes mediante implantes de titanio biocompatible y coronas definitivas que devuelven tanto la estética como la comodidad al comer y hablar.',
    treatments: [
      'Implantes unitarios para reponer una pieza dental sin desgastar dientes vecinos',
      'Puentes fijos y coronas sobre implantes de aspecto natural',
      'Rehabilitación integral y estabilización de prótesis dentales',
      'Procedimientos cuidadosos con anestesia local sin dolor y controles postoperatorios',
    ],
    consultationNote: 'Plan de tratamiento detallado paso a paso antes de comenzar.',
    imageUrl: '/src/assets/images/dental_clinic_interior_1794264094702.jpg',
    imageAlt: 'Imagen de referencia de consultorio para implantes',
  },
  {
    id: 'general',
    label: 'General',
    headline: 'Prevención, limpiezas y atención integral para toda la familia.',
    description:
      'Nuestro objetivo principal es mantener tu boca sana, resolver urgencias o dolores de forma rápida y conservar tus piezas dentales naturales por muchos años.',
    treatments: [
      'Control odontológico integral y limpieza profunda por ultrasonido',
      'Arreglo de caries con resinas estéticas del color de tu diente',
      'Tratamientos de conducto (endodoncia) y alivio de dolor dental',
      'Extracciones simples, prótesis removibles y odontología preventiva',
    ],
    consultationNote: 'Atención puntual de lunes a viernes en el centro de Tacuarembó.',
    imageUrl: '/src/assets/images/aesthetic_smile_macro_1794264096229.jpg',
    imageAlt: 'Imagen de referencia de odontología general',
  },
];

export function getSpecialtyById(id: SpecialtyId): SpecialtyData {
  const found = SPECIALTIES.find((item) => item.id === id);
  return found ?? SPECIALTIES[0];
}

export function validateBookingRequest(input: BookingInput): BookingValidationResult {
  const errors: BookingValidationResult['errors'] = {};

  const trimmedName = (input.patientName || '').trim();
  if (trimmedName.length < 3) {
    errors.patientName = 'Ingresá tu nombre y apellido.';
  }

  const cleanPhone = (input.phone || '').replace(/[\s\-()]/g, '');
  const phoneRegex = /^(\+?598|0)?[249]\d{6,8}$/;
  if (!cleanPhone) {
    errors.phone = 'Ingresá tu número de celular o teléfono.';
  } else if (!phoneRegex.test(cleanPhone)) {
    errors.phone = 'Ingresá un número válido de Uruguay (ej: 099 186 996).';
  }

  if (!VALID_DAYS.includes(input.preferredDay as (typeof VALID_DAYS)[number])) {
    errors.preferredDay = 'Seleccioná un día de Lunes a Viernes.';
  }

  if (!VALID_TIME_SLOTS.includes(input.preferredTimeSlot as (typeof VALID_TIME_SLOTS)[number])) {
    errors.preferredTimeSlot = 'Seleccioná un horario entre las 08:00 y las 18:00 hs.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppBookingUrl(input: BookingInput): string {
  const specialty = getSpecialtyById(input.specialtyId);

  const messageLines = [
    `Hola Dr. Damián Pérez, quisiera agendar una consulta.`,
    `• Nombre: ${input.patientName.trim()}`,
    `• Teléfono: ${input.phone.trim()}`,
    `• Consulta por: ${specialty.label}`,
    `• Día y horario preferido: ${input.preferredDay} (${input.preferredTimeSlot})`,
  ];

  if (input.notes && input.notes.trim().length > 0) {
    messageLines.push(`• Comentario: ${input.notes.trim()}`);
  }

  const encodedText = encodeURIComponent(messageLines.join('\n'));
  return `https://wa.me/${CLINIC_INFO.whatsappNumberInternational}?text=${encodedText}`;
}
