import { Welcome } from "@/components/welcome";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";
import HomeDashboard from "./_components/home-dashboard";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/iniciar-sesion");

  return (
    <>
      <PageWrapper>
        <Welcome user={user} />
        <HomeDashboard />
      </PageWrapper>
    </>
  );
}
