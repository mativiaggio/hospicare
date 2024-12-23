import Link from "next/link";
import Image from "next/image";
import { UserDropdown } from "../dropdowns/user-dropdown";

export const MobileTopNavbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b">
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
      <UserDropdown />
    </div>
  );
};
