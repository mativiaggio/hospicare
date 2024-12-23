"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCurrent } from "@/features/auth/api/use-current";
import { AlertCircle } from "lucide-react";
import ProfileSettingsForm from "./_components/profile-settings-form";
import ProfileSettingsSkeleton from "./_components/profile-settings-skeleton";
import { PageTitle } from "@/components/page-title";
import { Separator } from "@/components/ui/separator";

export default function ProfileSettings() {
  const { data, isLoading } = useCurrent();

  if (isLoading) {
    return (
      <>
        <ProfileSettingsSkeleton />
      </>
    );
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
      {" "}
      <div className="space-y-6">
        <PageTitle
          title="Datos personales"
          subtitle="Administre la configuración de su cuenta y establezca las
    preferencias de correo electrónico."
        />
      </div>
      <Separator />
      <ProfileSettingsForm data={data!} />
    </>
  );
}
