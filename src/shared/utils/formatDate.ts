const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium' });

export function formatDate(isoDate: string): string {
  return DATE_FORMATTER.format(new Date(isoDate));
}
