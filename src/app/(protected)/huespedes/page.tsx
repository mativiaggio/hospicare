import { PageTitle } from "@/components/page-title";
import GuestsDataContainer from "@/features/guests/components/guests-data-container";
import { User } from "lucide-react";

export default function GuestsOutputPage() {
  return (
    <>
      {" "}
      <PageTitle
        title="Huéspedes"
        icon={<User className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />}
        subtitle="Comienza a gestionar los huéspedes"
      />
      <GuestsDataContainer />
    </>
  );
}
