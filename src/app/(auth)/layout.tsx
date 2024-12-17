import { ModeToggle } from "@/components/buttons/theme-toggle";
import Image from "next/image";

interface AuthLayuotProps {
  children: React.ReactNode;
}

const AuthLayuot = ({ children }: AuthLayuotProps) => {
  return (
    <main className="bg-neutral-100 dark:bg-black min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <div className="flex justify-between items-center">
          <span className="flex items-center justify-between gap-2 w-full">
            <span className="flex items-center gap-2">
              <Image
                src={"/HMT-logo.svg"}
                height={22}
                width={22}
                alt="Logo"
                className="block dark:hidden"
              />
              <Image
                src={"/HMT-logo-dark.svg"}
                height={22}
                width={22}
                alt="Logo"
                className="hidden dark:block"
              />
              <h1 className="font-bold text-xl">Hospicare</h1>
            </span>
            <ModeToggle />
          </span>
        </div>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayuot;
