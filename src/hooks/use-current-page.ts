import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useCurrentPage() {
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState<string>("");
  const [pageSubtitle, setPageSubtitle] = useState<string>("");

  useEffect(() => {
    switch (pathname) {
      case "/":
        setPageTitle("Bienvenido");
        setPageSubtitle("Comienza a gestionar la organización");
        break;

      case "/huespedes":
        setPageTitle("Huéspedes");
        setPageSubtitle("Comienza a gestionar los huéspedes");
        break;

      case "/medicamentos":
        setPageTitle("Medicamentos");
        setPageSubtitle("Comienza a gestionar los medicamentos");
        break;

      case "/obras-sociales":
        setPageTitle("Obras Sociales");
        setPageSubtitle("Comienza a gestionar las obras sociales");
        break;

      case "/personal":
        setPageTitle("Personal");
        setPageSubtitle("Comienza a gestionar al personal");
        break;

      case "/soporte":
        setPageTitle("Soporte");
        setPageSubtitle("Registra las peticiones de soporte");
        break;

      default:
        setPageTitle("Hospicare");
        setPageSubtitle("por Madre Teresa Hospice");
        break;
    }
  }, [pathname]);

  return { title: pageTitle, subtitle: pageSubtitle };
}