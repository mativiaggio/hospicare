import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.staff.new)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.staff.new)["$post"]
>;

export const useNewStaff = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.staff.new["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      window.location.replace("/personal");
    },
    onError: (error) => {
      console.error("Put Error:", error.message);
    },
  });

  return mutation;
};
