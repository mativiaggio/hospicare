import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Pill, Building2, HardHat } from "lucide-react";

export const MobileBottomNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background m-[1rem] rounded-full shadow-md">
      <ul className="flex justify-between p-[1rem]">
        <li className="min-w-1/5 w-fit">
          <Link className="w-full flex justify-center items-center" href="/">
            <div
              className={`flex gap-1 font-bold items-center rounded-full p-[0.5rem]  hover:bg-hover transition-all ${
                pathname === "/" ? "bg-hover" : ""
              }`}>
              <Home size={20} className={pathname === "/" ? "bg-hover" : ""} />
              {pathname === "/" && <span className="text-sm">Inicio</span>}
            </div>
          </Link>
        </li>
        <li className="min-w-1/5 w-fit">
          <Link
            className="w-full flex justify-center items-center"
            href="/huespedes">
            <div
              className={`flex gap-1 font-bold items-center rounded-full p-[0.5rem]  hover:bg-hover transition-all ${
                pathname === "/huespedes" ? "bg-hover" : ""
              }`}>
              <Users
                size={20}
                className={pathname === "/huespedes" ? "bg-hover" : ""}
              />
              {pathname === "/huespedes" && (
                <span className="text-sm">Huéspedes</span>
              )}
            </div>
          </Link>
        </li>
        <li className="min-w-1/5 w-fit">
          <Link
            className="w-full flex justify-center items-center"
            href="/medicamentos">
            <div
              className={`flex gap-1 font-bold items-center rounded-full p-[0.5rem]  hover:bg-hover transition-all ${
                pathname === "/medicamentos" ? "bg-hover" : ""
              }`}>
              <Pill
                size={20}
                className={pathname === "/medicamentos" ? "bg-hover" : ""}
              />
              {pathname === "/medicamentos" && (
                <span className="text-sm">Medicamentos</span>
              )}
            </div>
          </Link>
        </li>
        <li className="min-w-1/5 w-fit">
          <Link
            className="w-full flex justify-center items-center"
            href="/obras-sociales">
            <div
              className={`flex gap-1 font-bold items-center rounded-full p-[0.5rem]  hover:bg-hover transition-all ${
                pathname === "/obras-sociales" ? "bg-hover" : ""
              }`}>
              <Building2
                size={20}
                className={pathname === "/obras-sociales" ? "bg-hover" : ""}
              />
              {pathname === "/obras-sociales" && (
                <span className="text-sm">Obras Sociales</span>
              )}
            </div>
          </Link>
        </li>
        <li className="min-w-1/5 w-fit">
          <Link
            className="w-full flex justify-center items-center"
            href="/personal">
            <div
              className={`flex gap-1 font-bold items-center rounded-full p-[0.5rem]  hover:bg-hover transition-all ${
                pathname === "/personal" ? "bg-hover" : ""
              }`}>
              <HardHat
                size={20}
                className={pathname === "/personal" ? "bg-hover" : ""}
              />
              {pathname === "/personal" && (
                <span className="text-sm">Personal</span>
              )}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
