import { CLINIC_INFO, SPECIALTIES, VALID_DAYS, VALID_TIME_SLOTS } from './clinicLogic';

export function buildStandaloneHtmlDocument(initialTheme: 'light' | 'dark' = 'light'): string {
  const specialtiesJson = JSON.stringify(SPECIALTIES);
  const darkClass = initialTheme === 'dark' ? 'dark' : '';

  return `<!doctype html>
<html lang="es-UY" class="scroll-smooth ${darkClass}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${CLINIC_INFO.name} — Consultorio Odontológico en Tacuarembó</title>
  <meta name="description" content="Consultorio odontológico del Dr. Damián Pérez en Tacuarembó, Uruguay. Estética Dental, Ortodoncia, Implantes y Odontología General. ${CLINIC_INFO.address}." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Outfit:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            display: ['Outfit', 'sans-serif'],
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    };
  </script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
    h1, h2, h3, h4, .font-display { font-family: 'Outfit', sans-serif; }
    .font-mono-tabular { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 dark:bg-[#0A0F1C] dark:text-slate-100 antialiased min-h-screen relative pb-24 transition-colors duration-200">

  <!-- Barra Superior -->
  <div class="sticky top-2 z-40 px-3 sm:px-6 max-w-6xl mx-auto">
    <header class="flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 py-3 rounded-2xl bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm">
      <a href="#" class="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display whitespace-nowrap shrink-0">
        ${CLINIC_INFO.name}
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
        <a href="#especialidades" class="hover:text-sky-600 dark:hover:text-[#00E5FF] transition-colors">Especialidades</a>
        <a href="#consultorio" class="hover:text-sky-600 dark:hover:text-[#00E5FF] transition-colors">Consultorio</a>
        <a href="#contacto" class="hover:text-sky-600 dark:hover:text-[#00E5FF] transition-colors">Ubicación y Contacto</a>
      </nav>
      <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button id="theme-toggle-btn" type="button" class="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer">
          <span id="theme-toggle-label">${initialTheme === 'dark' ? '☀️ Claro' : '🌙 Oscuro'}</span>
        </button>
        <a href="#contacto" class="px-3 sm:px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap">
          Agendar<span class="hidden sm:inline"> Consulta</span>
        </a>
      </div>
    </header>
  </div>

  <!-- Contenido Principal -->
  <main class="relative z-10">
    <!-- Hero -->
    <section class="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-6 sm:pt-12 pb-10 sm:pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div class="lg:col-span-7 space-y-5">
          <p class="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF]">
            Consultorio Odontológico en Tacuarembó · ${CLINIC_INFO.address}
          </p>
          <h1 class="text-3xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Cuidamos tu salud y estética dental con atención personalizada.
          </h1>
          <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Odontología general, estética, ortodoncia e implantes en un ambiente cálido, puntual y de confianza. Atendemos de lunes a viernes de 08:00 a 18:00 hs.
          </p>
          <div class="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="https://wa.me/${CLINIC_INFO.whatsappNumberInternational}?text=Hola%20Dr.%20Dami%C3%A1n%20P%C3%A9rez%2C%20quisiera%20agendar%20una%20consulta." target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] font-semibold text-base shadow-sm transition-colors">
              Agendar por WhatsApp
            </a>
            <a href="#contacto" class="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-sm sm:text-base font-semibold text-slate-800 dark:text-white transition-colors">
              Elegir Día y Horario
            </a>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg">
            <!-- Reemplazar src por tu imagen real -->
            <div class="aspect-[4/3] w-full bg-slate-200 dark:bg-slate-800 relative flex items-center justify-center">
              <img src="https://placehold.co/800x600/e2e8f0/0f172a?text=Foto+Principal+Consultorio" alt="Consultorio Odontólogo Damián Pérez" class="w-full h-full object-cover" />
              <div class="absolute top-3 left-3 px-3 py-1 rounded-lg bg-slate-900/75 text-[11px] font-medium text-white">
                Imagen de ejemplo · Consultorio
              </div>
            </div>
            <div class="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-4">
              <div class="space-y-0.5 text-xs">
                <p class="font-medium text-slate-700 dark:text-slate-200">${CLINIC_INFO.address}</p>
                <p class="text-slate-500 dark:text-slate-400">${CLINIC_INFO.hours}</p>
              </div>
              <div class="shrink-0 text-right pl-3 border-l border-slate-200 dark:border-white/10">
                <p class="font-bold text-sm text-slate-900 dark:text-white font-mono-tabular">★ ${CLINIC_INFO.rating}/5</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Especialidades -->
    <section id="especialidades" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div class="mb-6 sm:mb-8">
        <p class="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF] mb-1">Nuestras Especialidades</p>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Tratamientos pensados para tu salud y estética dental.
        </h2>
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
          Tocá cada especialidad para ver los tratamientos que realizamos en el consultorio:
        </p>
      </div>

      <div id="specialty-tabs" class="grid grid-cols-2 sm:inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-white/5 border border-slate-300/80 dark:border-white/10 mb-6 w-full sm:w-auto"></div>

      <div id="specialty-panel" class="rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 sm:p-8 shadow-sm"></div>
    </section>

    <!-- Nuestro Consultorio -->
    <section id="consultorio" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div class="max-w-2xl mb-8">
        <p class="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF] mb-1">Nuestro Consultorio en Tacuarembó</p>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Atención profesional, cálida y puntual en cada consulta.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <article class="md:col-span-2 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs font-semibold text-sky-700 dark:text-[#00E5FF]">Trato Directo y Claro</span>
            <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Atención sin apuros y explicaciones claras antes de cada tratamiento.
            </h3>
            <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              En cada cita te atiende directamente el Dr. Damián Pérez. Evaluamos tu caso con tranquilidad, te explicamos todas las alternativas disponibles y trabajamos con delicadeza para que te sientas cómodo y sin dolor.
            </p>
          </div>
          <div class="pt-5 mt-5 border-t border-slate-100 dark:border-white/10 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Higiene y esterilización rigurosa · Respeto por tu horario agendado
          </div>
        </article>

        <article class="md:col-span-1 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div class="space-y-3">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Valoración en Google</span>
            <div class="flex items-baseline gap-2 pt-1">
              <span class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white font-mono-tabular">${CLINIC_INFO.rating}</span>
              <span class="text-base text-slate-500 dark:text-slate-400 font-mono-tabular">/ 5 ★</span>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Calificación otorgada por pacientes de nuestro consultorio en Tacuarembó.
            </p>
          </div>
          <div class="pt-4 mt-4 border-t border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
            ${CLINIC_INFO.address}
          </div>
        </article>
      </div>

      <!-- Imágenes de ejemplo reemplazables -->
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <div class="aspect-[16/10] bg-slate-200 dark:bg-slate-800 relative">
            <img src="https://placehold.co/800x500/e2e8f0/0f172a?text=Imagen+de+Ejemplo+1" alt="Consultorio en Ramón González 135" class="w-full h-full object-cover" />
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-sm font-bold text-slate-900 dark:text-white">Consultorio en Ramón González 135</p>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">Ambiente cómodo, climatizado y equipado para tu atención en Tacuarembó.</p>
          </div>
        </div>
        <div class="rounded-3xl overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <div class="aspect-[16/10] bg-slate-200 dark:bg-slate-800 relative">
            <img src="https://placehold.co/800x500/e2e8f0/0f172a?text=Imagen+de+Ejemplo+2" alt="Tratamientos dentales" class="w-full h-full object-cover" />
          </div>
          <div class="p-4 sm:p-5">
            <p class="text-sm font-bold text-slate-900 dark:text-white">Odontología General, Estética, Ortodoncia e Implantes</p>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">Horarios de atención de Lunes a Viernes de 08:00 a 18:00 hs.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacto y Agenda -->
    <section id="contacto" class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div class="rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 sm:p-8 lg:p-10 shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-5 space-y-4">
            <p class="text-xs sm:text-sm font-semibold text-sky-700 dark:text-[#00E5FF]">Contacto y Ubicación</p>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Agendá tu consulta en Tacuarembó.</h2>
            <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Escribinos directamente por WhatsApp al <strong class="font-mono-tabular text-slate-900 dark:text-white">${CLINIC_INFO.phoneDisplay}</strong> o completá tus datos para enviar el mensaje.
            </p>
            <div class="pt-4 border-t border-slate-100 dark:border-white/10 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Dirección:</strong> ${CLINIC_INFO.address}</p>
              <p><strong>Horario:</strong> ${CLINIC_INFO.hours}</p>
              <p><strong>WhatsApp:</strong> ${CLINIC_INFO.phoneDisplay}</p>
            </div>
          </div>
          <div class="lg:col-span-7">
            <form id="booking-form" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tu Nombre y Apellido *</label>
                  <input id="f-name" type="text" required placeholder="Ej: Juan Pérez" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tu Celular o Teléfono *</label>
                  <input id="f-phone" type="tel" required placeholder="Ej: 099 186 996" class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white font-mono-tabular" />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Especialidad</label>
                  <select id="f-spec" class="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white">
                    ${SPECIALTIES.map((s) => `<option value="${s.label}">${s.label}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Día Preferido</label>
                  <select id="f-day" class="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white">
                    ${VALID_DAYS.map((d) => `<option value="${d}">${d}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Horario Preferido</label>
                  <select id="f-time" class="w-full px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-[#0A0F1C] border border-slate-300 dark:border-white/15 text-sm text-slate-900 dark:text-white font-mono-tabular">
                    ${VALID_TIME_SLOTS.map((t) => `<option value="${t}">${t}</option>`).join('')}
                  </select>
                </div>
              </div>
              <button type="submit" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] font-semibold text-sm transition-colors cursor-pointer">
                Enviar Consulta por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-slate-200 dark:border-white/10 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-xs sm:text-sm text-slate-500 dark:text-slate-400">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <p class="font-bold text-slate-900 dark:text-white font-display">${CLINIC_INFO.name}</p>
        <p class="mt-0.5">${CLINIC_INFO.address} · ${CLINIC_INFO.hours}</p>
      </div>
      <p class="font-mono-tabular text-slate-700 dark:text-slate-200 font-semibold">Tel / WhatsApp: ${CLINIC_INFO.phoneDisplay}</p>
    </div>
  </footer>

  <!-- Barra Inferior Fija para Móvil -->
  <div class="fixed bottom-0 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 pb-3">
    <div class="max-w-3xl mx-auto pointer-events-auto rounded-2xl bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border border-slate-200 dark:border-white/15 px-3.5 py-2.5 shadow-lg flex items-center justify-between gap-3">
      <div class="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
        <span class="font-bold text-slate-900 dark:text-white">${CLINIC_INFO.name}</span> · <span>Ramón González 135, Tacuarembó</span>
      </div>
      <a href="https://wa.me/${CLINIC_INFO.whatsappNumberInternational}?text=Hola%20Dr.%20Dami%C3%A1n%20P%C3%A9rez%2C%20quisiera%20agendar%20una%20consulta." target="_blank" rel="noopener noreferrer" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors">
        Agendar vía WhatsApp: ${CLINIC_INFO.phoneDisplay}
      </a>
    </div>
  </div>

  <script>
    const specialties = ${specialtiesJson};
    let activeId = specialties[0].id;

    function renderSpecialties() {
      const tabsEl = document.getElementById('specialty-tabs');
      const panelEl = document.getElementById('specialty-panel');
      const current = specialties.find(s => s.id === activeId) || specialties[0];

      tabsEl.innerHTML = specialties.map(s => {
        const active = s.id === activeId;
        return '<button type="button" onclick="selectSpecialty(\\'' + s.id + '\\')" class="px-4 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ' +
          (active ? 'bg-sky-600 dark:bg-[#00E5FF] text-white dark:text-[#0A0F1C] shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white') +
          '">' + s.label + '</button>';
      }).join('');

      panelEl.innerHTML = '<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">' +
        '<div class="lg:col-span-7 space-y-5">' +
          '<div>' +
            '<span class="text-xs font-semibold text-sky-700 dark:text-[#00E5FF]">Especialidad · ' + current.label + '</span>' +
            '<h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">' + current.headline + '</h3>' +
            '<p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">' + current.description + '</p>' +
          '</div>' +
          '<div class="pt-4 border-t border-slate-100 dark:border-white/10">' +
            '<p class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">Principales tratamientos en ' + current.label + ':</p>' +
            '<ul class="space-y-2">' +
              current.treatments.map(t => '<li class="flex items-start gap-2 text-sm sm:text-base text-slate-700 dark:text-slate-200"><span class="text-sky-600 dark:text-[#00E5FF] font-bold">✓</span><span>' + t + '</span></li>').join('') +
            '</ul>' +
          '</div>' +
          '<div class="pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">' +
            '<p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">' + current.consultationNote + '</p>' +
            '<a href="#contacto" class="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-[#00E5FF] dark:hover:bg-[#33EBFF] text-white dark:text-[#0A0F1C] font-semibold text-sm">Consultar por ' + current.label + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="lg:col-span-5">' +
          '<div class="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-slate-800 aspect-[4/3]">' +
            '<img src="https://placehold.co/800x600/e2e8f0/0f172a?text=' + encodeURIComponent(current.label) + '" alt="' + current.label + '" class="w-full h-full object-cover" />' +
          '</div>' +
        '</div>' +
      '</div>';
    }

    window.selectSpecialty = function(id) {
      activeId = id;
      renderSpecialties();
    };

    document.getElementById('theme-toggle-btn').addEventListener('click', function() {
      const root = document.documentElement;
      const isDark = root.classList.toggle('dark');
      document.getElementById('theme-toggle-label').textContent = isDark ? '☀️ Claro' : '🌙 Oscuro';
    });

    document.getElementById('booking-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const phone = document.getElementById('f-phone').value.trim();
      const spec = document.getElementById('f-spec').value;
      const day = document.getElementById('f-day').value;
      const time = document.getElementById('f-time').value;
      if (!name || !phone) return;
      const msg = [
        'Hola Dr. Damián Pérez, quisiera agendar una consulta.',
        '• Nombre: ' + name,
        '• Teléfono: ' + phone,
        '• Consulta por: ' + spec,
        '• Día y horario preferido: ' + day + ' (' + time + ')'
      ].join('\\n');
      window.open('https://wa.me/${CLINIC_INFO.whatsappNumberInternational}?text=' + encodeURIComponent(msg), '_blank');
    });

    renderSpecialties();
  </script>
</body>
</html>`;
}

export function triggerStandaloneHtmlDownload(currentTheme: 'light' | 'dark' = 'light'): void {
  const htmlContent = buildStandaloneHtmlDocument(currentTheme);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'odontologo-damian-perez.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
