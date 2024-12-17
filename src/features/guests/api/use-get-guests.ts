import { GuestsApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetGuests = () => {
  return useQuery<GuestsApiResponse, Error>({
    queryKey: ["guests"],
    queryFn: async () => {
      const response = await client.api.guests.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch guests");
      }

      const data: GuestsApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
