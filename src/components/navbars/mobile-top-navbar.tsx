import MobileUserButton from "../buttons/mobile/mobile-user-button";

interface Props {
  width?: number;
}
export const MobileTopNavbar = ({ width }: Props) => {
  return (
    <div
      className={`flex min-h-[65px] h-fit items-center justify-between px-4 py-2 !w-[${width}px]`}>
      <MobileUserButton />
    </div>
  );
};
