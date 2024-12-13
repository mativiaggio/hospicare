import { Welcome } from "@/components/welcome";
import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import HomeDashboard from "./_components/home-dashboard";
import PageWrapper from "@/components/page-wrapper";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <>
      <PageWrapper>
        <Welcome user={user} />
        <HomeDashboard />
      </PageWrapper>
    </>
  );
}
