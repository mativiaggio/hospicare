import { SocialSecurityApiResponse } from "@/lib/appwrite-types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetSocialSecurity = () => {
  return useQuery<SocialSecurityApiResponse, Error>({
    queryKey: ["social_security"],
    queryFn: async () => {
      const response = await client.api["social_curity"].$get();

      if (!response.ok) {
        throw new Error("Failed to fetch social_security");
      }

      const data: SocialSecurityApiResponse = await response.json();
      return data;
    },
  });
};
