import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindMedicationById = () => {
  const query = useQuery({
    queryKey: ["social_security"],
    queryFn: async () => {
      const response = await client.api["social_curity"].$get();

      if (!response.ok) {
        return null;
      }

      const { social_security } = await response.json();

      return social_security;
    },
  });

  return query;
};
