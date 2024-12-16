import { StaffApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetStaff = () => {
  return useQuery<StaffApiResponse, Error>({
    queryKey: ["staff"],
    queryFn: async () => {
      const response = await client.api["staff"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }

      const data: StaffApiResponse = await response.json();
      return data;
    },
  });
};
