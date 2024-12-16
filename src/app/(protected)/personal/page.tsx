import { PageTitle } from "@/components/page-title";
import StaffDataContainer from "@/features/staff/components/staff-data-container";
import { Users } from "lucide-react";

export default function StaffOutputPage() {
  return (
    <>
      <PageTitle
        title="Perosnal"
        icon={<Users className="w-10 h-10" />}
        subtitle="Comienza a gestionar los huéspedes"
      />
      <StaffDataContainer />
    </>
  );
}
