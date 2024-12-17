import { MedicationsApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetMedications = () => {
  return useQuery<MedicationsApiResponse, Error>({
    queryKey: ["medications"],
    queryFn: async () => {
      const response = await client.api.medications.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch medications");
      }

      const data: MedicationsApiResponse = await response.json();
      return data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
