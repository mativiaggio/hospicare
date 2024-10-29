import { Welcome } from "@/components/welcome";
import { getCurrent } from "@/features/auth/actions";
import { GuestsDataTable } from "@/features/guests/components/guests-data-table";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <>
      <div className="page-wrapper">
        <Welcome user={user} />
        <GuestsDataTable />
      </div>
    </>
  );
}
