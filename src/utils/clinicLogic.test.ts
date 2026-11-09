import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLINIC_INFO,
  SPECIALTIES,
  getSpecialtyById,
  validateBookingRequest,
  buildWhatsAppBookingUrl,
} from './clinicLogic';
import { buildStandaloneHtmlDocument } from './exportHtml';

test('CLINIC_INFO matches exact business requirements for Odontólogo Damián Pérez', () => {
  assert.equal(CLINIC_INFO.name, 'Odontólogo Damián Pérez');
  assert.equal(CLINIC_INFO.address, 'Ramón González 135, Tacuarembó, Uruguay');
  assert.equal(CLINIC_INFO.hours, 'Lunes a Viernes, 08:00 a 18:00 hs');
  assert.equal(CLINIC_INFO.phoneDisplay, '099 186 996');
  assert.equal(CLINIC_INFO.rating, 4.8);
});

test('SPECIALTIES contains all 4 required specialties in order with clean treatments', () => {
  const labels = SPECIALTIES.map((s) => s.label);
  assert.deepEqual(labels, ['Estética Dental', 'Ortodoncia', 'Implantes', 'General']);
  for (const spec of SPECIALTIES) {
    assert.ok(spec.treatments.length >= 3, `${spec.label} should list treatments`);
  }
});

test('validateBookingRequest rejects empty or invalid Uruguayan phone numbers and names', () => {
  const invalidResult = validateBookingRequest({
    patientName: 'A',
    phone: '123',
    specialtyId: 'estetica',
    preferredDay: 'Domingo',
    preferredTimeSlot: '22:00 hs',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.patientName);
  assert.ok(invalidResult.errors.phone);
  assert.ok(invalidResult.errors.preferredDay);
  assert.ok(invalidResult.errors.preferredTimeSlot);
});

test('validateBookingRequest accepts valid Uruguayan mobile and clinic schedule', () => {
  const validResult = validateBookingRequest({
    patientName: 'Martín Echeverría',
    phone: '099 186 996',
    specialtyId: 'implantes',
    preferredDay: 'Martes',
    preferredTimeSlot: '10:00 a 12:00 hs',
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('buildWhatsAppBookingUrl builds valid wa.me URL with Uruguayan country code 598', () => {
  const url = buildWhatsAppBookingUrl({
    patientName: 'Valentina Suárez',
    phone: '098 765 432',
    specialtyId: 'ortodoncia',
    preferredDay: 'Jueves',
    preferredTimeSlot: '16:00 a 18:00 hs',
    notes: 'Consulta por ortodoncia',
  });

  assert.ok(url.startsWith('https://wa.me/59899186996?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('Valentina Suárez'));
  assert.ok(decoded.includes('Ortodoncia'));
  assert.ok(decoded.includes('Jueves (16:00 a 18:00 hs)'));
  assert.ok(decoded.includes('Consulta por ortodoncia'));
  assert.equal(getSpecialtyById('estetica').label, 'Estética Dental');
});

test('buildStandaloneHtmlDocument generates a complete valid HTML document with embedded SVG sample images and direct WhatsApp link', () => {
  const html = buildStandaloneHtmlDocument('light');
  assert.ok(html.startsWith('<!doctype html>'));
  assert.ok(html.includes('Odontólogo Damián Pérez'));
  assert.ok(html.includes('Ramón González 135, Tacuarembó, Uruguay'));
  assert.ok(html.includes('099 186 996'));
  assert.ok(html.includes('data:image/svg+xml;charset=UTF-8,'));
  assert.ok(html.includes('href="https://wa.me/59899186996"'));
  assert.ok(html.includes('theme-toggle-btn'));
  assert.ok(html.includes('</html>'));
});
