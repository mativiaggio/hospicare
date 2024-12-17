import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.epicrisis.new)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.epicrisis.new)["$post"]>;

export const useNewEpicrisis = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.epicrisis.new["$post"]({ json });
      return await response.json();
    },
    onError: (error) => {
      console.error("Put Error:", error.message);
    },
  });

  return mutation;
};
