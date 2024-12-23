import { PageTitle } from "@/components/page-title";
import StaffDataContainer from "@/features/staff/components/staff-data-container";
import { Users } from "lucide-react";

export default function StaffOutputPage() {
  return (
    <>
      <PageTitle
        title="Perosnal"
        icon={<Users className="w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10" />}
        subtitle="Comienza a gestionar los huéspedes"
      />
      <StaffDataContainer />
    </>
  );
}
