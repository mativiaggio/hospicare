import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindGuestById = () => {
  const query = useQuery({
    queryKey: ["guests"],
    queryFn: async () => {
      const response = await client.api.guests.$get();

      if (!response.ok) {
        return null;
      }

      const { guests } = await response.json();

      return guests;
    },
  });

  return query;
};
