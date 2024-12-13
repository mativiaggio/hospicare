import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.medications.new)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.medications.new)["$post"]
>;

export const useNewMedication = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.medications.new["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      window.location.replace("/medicamentos");
    },
    onError: (error) => {
      console.error("Put Error:", error.message);
    },
  });

  return mutation;
};
