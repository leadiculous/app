const browserDefaultLocale = undefined;

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(browserDefaultLocale, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}
