import MobileUserButton from "../buttons/mobile-user-botton";
import { MobileModeToggle } from "../buttons/theme-toggle";

export const MobileTopNavbar = () => {
  return (
    <div className="flex min-h-[65px] h-fit items-center justify-between px-4 py-2">
      <MobileUserButton />
      <MobileModeToggle />
    </div>
  );
};
