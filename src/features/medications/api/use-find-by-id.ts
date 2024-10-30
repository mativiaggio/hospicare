import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindMedicationById = () => {
  const query = useQuery({
    queryKey: ["medications"],
    queryFn: async () => {
      const response = await client.api.medications.$get();

      if (!response.ok) {
        return null;
      }

      const { medications } = await response.json();

      return medications;
    },
  });

  return query;
};
