export function formatMonthYear(isoDate: string): string {
  const [year, month] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
