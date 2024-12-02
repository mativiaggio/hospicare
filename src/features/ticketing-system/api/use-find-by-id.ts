import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindMedicationById = () => {
  const query = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await client.api.tickets.$get();

      if (!response.ok) {
        return null;
      }

      const { tickets } = await response.json();

      return tickets;
    },
  });

  return query;
};
