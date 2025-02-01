"use client";
import AuthNavbar from "./_components/auth-navbar";

interface AuthLayuotProps {
  children: React.ReactNode;
}

const AuthLayuot = ({ children }: AuthLayuotProps) => {
  return (
    <main className="min-h-screen flex flex-col gap-8">
      <AuthNavbar />
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayuot;
