export const routeOfAdministration: Record<string, string> = {
  ORAL: "Oral",
  INTRAVENOUS: "Intravenosa",
};

export function formatRouteOfAdministration(route: string): string {
  return routeOfAdministration[route] || route;
}
