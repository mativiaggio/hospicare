import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "../buttons/theme-toggle";
import { UserDropdown } from "../dropdowns/user-dropdown";

export const DesktopNavbar = () => {
  return (
    <div className="flex w-full items-center justify-between border-b px-10 py-2">
      <div className="flex w-1/6">
        <Link className="flex items-center justify-center" href="/">
          <Image
            src="/static/svg/logo2.svg"
            height={30}
            width={30}
            alt="Logo"
            className="block dark:hidden"
          />
          <Image
            src="/static/svg/logo2-dark.svg"
            height={30}
            width={30}
            alt="Logo"
            className="hidden dark:block"
          />
          <span className="flex flex-col text-primary ml-2 font-bold">
            <h1 className="text-2xl">Hospicare</h1>
            <p className="text-xs text-nowrap font-normal">
              por Hospice Madre Teresa
            </p>
          </span>
        </Link>
      </div>
      <nav>
        <ul className="flex items-center justify-between gap-6">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/huespedes">Huéspedes</Link>
          </li>
          <li>
            <Link href="/medicamentos">Medicamentos</Link>
          </li>
          <li>
            <Link href="/obras-sociales">Obras Sociales</Link>
          </li>
          <li>
            <Link href="/personal">Personal</Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
      <div className="w-1/6 flex justify-end">
        <UserDropdown />
      </div>
    </div>
  );
};
