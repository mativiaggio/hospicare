"use client";

import { PageTitle } from "@/components/page-title";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useCurrent } from "@/features/auth/api/use-current";
import GenerateRegisterLink from "@/features/auth/components/generate-sign-up";
import UsersDataContainer from "@/features/users/components/users-data-container";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSettings() {
  const { data, isLoading } = useCurrent();
  const router = useRouter();

  if (isLoading) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        </div>
      </>
    );
  }

  if (!data?.labels.includes("admin")) {
    router.push("/no-autorizado");
    return null;
  }

  if (!data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Ocurrió un error y no podemos encontrar tu cuenta. Si el error
          persiste, comunicate con soporte.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <GenerateRegisterLink />
      <Separator />
      <PageTitle title="Usuarios" subtitle="Lista de usuarios del sistema" />
      <UsersDataContainer />
    </>
  );
}
