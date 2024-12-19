import { getCurrent } from "@/features/auth/actions";
import PasswordResetForm from "@/features/auth/components/password-reset";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getCurrent();

  if (user) redirect("/");

  return (
    <div>
      <PasswordResetForm />
    </div>
  );
}
