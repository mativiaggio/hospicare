import { PageTitle } from "@/components/page-title";
import GuestsDataContainer from "@/features/guests/components/guests-data-container";
import { User } from "lucide-react";

export default function GuestsOutputPage() {
  return (
    <>
      {" "}
      <PageTitle
        title="Huéspedes"
        icon={<User className="w-10 h-10" />}
        subtitle="Comienza a gestionar los huéspedes"
      />
      <GuestsDataContainer />
    </>
  );
}
