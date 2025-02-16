import { format, Locale } from "date-fns";

export function formatHour(date: string, locale: Locale) {
  if (!date) {
    return date;
  }

  return format(date, "p", { locale: locale });
}


export function makeId(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}