import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindMedicationById = (id: string) => {
  const query = useQuery({
    queryKey: ["medications", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is required to fetch a medication");
      }

      const response = await client.api.medications["find-by-id"][":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      const { medication } = await response.json();

      return medication;
    },
  });

  return query;
};
