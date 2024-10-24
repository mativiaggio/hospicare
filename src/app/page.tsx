import { Logout } from "@/components/buttons/logout-button";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  console.log(user);
  return (
    <>
      Autenticado
      <Logout />
    </>
  );
}
