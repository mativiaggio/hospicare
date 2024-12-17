import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindEpicrisisByGuestId = (id: string) => {
  const query = useQuery({
    queryKey: ["epicrisis", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is required to fetch an epicrisis");
      }

      const response = await client.api.epicrisis["find-by-guest-id"][
        ":id"
      ].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch epicrisis");
      }

      const { epicrisis } = await response.json();
      return epicrisis;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
