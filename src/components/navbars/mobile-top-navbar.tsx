"use client";
import MobileUserButton from "../buttons/mobile/mobile-user-button";
import { useCurrentPage } from "@/hooks/use-current-page";

interface Props {
  width?: number;
}
export const MobileTopNavbar = ({ width }: Props) => {
  const { title, subtitle } = useCurrentPage();

  return (
    <div
      className={`flex min-h-[65px] h-fit items-center justify-between px-4 py-2 !w-[${width}px]`}>
      <MobileUserButton title={title} subtitle={subtitle} />
    </div>
  );
};
