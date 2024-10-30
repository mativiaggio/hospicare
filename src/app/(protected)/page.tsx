import { Welcome } from "@/components/welcome";
import { getCurrent } from "@/features/auth/actions";
import GuestsDataContainer from "@/features/guests/components/guests-data-container";
import MedicationsDataContainer from "@/features/medications/components/medications-data-container";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return (
    <>
      <div className="page-wrapper">
        <Welcome user={user} />
        <GuestsDataContainer />
        <MedicationsDataContainer />
      </div>
    </>
  );
}
