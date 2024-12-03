import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
// import { InferResponseType } from "hono";

// type ResponseType = InferResponseType<
//   (typeof client.api.users)["find-user-document"]["$get"]
// >;
type ResponseType = {
  success: boolean;
  documentId?: string;
  message?: string;
};

export const useGetUserDocument = (userId: string | null) => {
  return useQuery<ResponseType, Error>({
    queryKey: ["user-document", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const response = await client.api.users["find-user-document"]["$get"]({
        params: { userId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user document");
      }

      return await response.json();
    },
    enabled: !!userId,
  });
};
