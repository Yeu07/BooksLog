export function formatMonthYear(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-AR", { month: "long", year: "numeric" });
}

export function formatShortDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
