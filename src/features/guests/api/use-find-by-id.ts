import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindGuestById = (id: string) => {
  const query = useQuery({
    queryKey: ["guests", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is required to fetch a guest");
      }

      const response = await client.api.guests["find-by-id"][":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      const { guest } = await response.json();

      return guest;
    },
  });

  return query;
};
