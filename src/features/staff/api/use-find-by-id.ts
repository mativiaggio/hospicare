import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useFindStaffById = (id: string) => {
  const query = useQuery({
    queryKey: ["staff", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("ID is required to fetch a staff");
      }

      const response = await client.api.staff["find-by-id"][":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ticket");
      }

      const { staff } = await response.json();

      return staff;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
