import { format, toZonedTime } from 'date-fns-tz';
import dayjs from './dayjs';

/**
 * Retorna a data e hora atual no fuso horário de São Paulo no formato ISO 8601.
 * @returns {string} Data e hora formatada no fuso horário de São Paulo.
 */
export function getCurrentDate(): string {
  const timeZone = 'America/Sao_Paulo';
  const currentDate = new Date();
  const zonedDate = toZonedTime(currentDate, timeZone);
  return zonedDate.toISOString(); // Garante o formato ISO-8601 UTC
}

export function createDateTime(day: string | number, month: string | number, year: string | number): string {
  // Garantir que os parâmetros sejam números
  const dayNumber = Number(day);
  const monthNumber = Number(month) - 1; // Os meses começam de 0
  const yearNumber = Number(year);

  // Criar a data UTC
  const utcDate = new Date(Date.UTC(yearNumber, monthNumber, dayNumber, 0, 0, 0));
  const timeZone = 'America/Sao_Paulo';  
  const zonedDate = toZonedTime(utcDate, timeZone);
  
  return zonedDate.toISOString();
}

export function convertDateForDateTime(date: string | Date): string {
  const timeZone = 'America/Sao_Paulo';
  const currentDate = new Date(date);
  const zonedDate = toZonedTime(currentDate, timeZone);
  return zonedDate.toISOString(); // Garante o formato ISO-8601 UTC
}

export function convertUTCForTimezoneLocal(date: string | Date, timezone: string = 'America/Sao_Paulo'): string {
  return dayjs(date).tz(timezone).format('YYYY-MM-DD HH:mm:ss'); // Formata para o fuso horário especificado
}