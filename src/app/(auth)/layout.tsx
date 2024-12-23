"use client";
import PageWrapper from "@/components/page-wrapper";
import { useCurrent } from "@/features/auth/api/use-current";
// import { getCurrent } from "@/features/auth/actions";
import AuthNavbar from "@/features/auth/components/auth-navbar";
import { Loader2 } from "lucide-react";

interface AuthLayuotProps {
  children: React.ReactNode;
}

const AuthLayuot = ({ children }: AuthLayuotProps) => {
  const { data, isLoading } = useCurrent();

  if (isLoading) {
    console.log("if", data);
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  } else {
    if (data) window.location.replace("/");
    console.log("else", data);
    return (
      <main className="bg-neutral-100 dark:bg-main min-h-screen">
        <AuthNavbar />
        <PageWrapper>
          <div className="mx-auto max-w-screen-2xl">
            <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
              {children}
            </div>
          </div>
        </PageWrapper>
      </main>
    );
  }
};

export default AuthLayuot;
