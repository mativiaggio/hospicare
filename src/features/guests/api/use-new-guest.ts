import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<(typeof client.api.guests.new)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.guests.new)["$post"]>;

export const useNewGuest = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.guests.new["$post"]({ json });
      return await response.json();
    },
    // onSuccess: () => {
    //   window.location.replace("/huespedes");
    // },
  });

  return mutation;
};
