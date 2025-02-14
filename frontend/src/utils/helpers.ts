import { format, Locale } from "date-fns";

export function formatHour(date: string, locale: Locale) {
  if (!date) {
    return date;
  }

  return format(date, "p", { locale: locale });
}
