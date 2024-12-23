"use client";

import { PageTitle } from "@/components/page-title";
import ProfilePasswordForm from "./_components/profile-password-form";
import { Separator } from "@/components/ui/separator";

export default function ProfilePassword() {
  return (
    <>
      {" "}
      <PageTitle
        title="Seguridad"
        subtitle="Gestione la seguridad de su cuenta"
      />
      <Separator />
      <ProfilePasswordForm />
    </>
  );
}
