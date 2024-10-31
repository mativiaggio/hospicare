import { Welcome } from "@/components/welcome";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import HomeDashboard from "./_components/home-dashboard";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <>
      <div className="page-wrapper">
        <Welcome user={user} />
        <HomeDashboard />
      </div>
    </>
  );
}
