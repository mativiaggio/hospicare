import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.social_security.new)["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.social_security.new)["$post"]
>;

export const useNewSocialSecurity = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.social_security.new["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      window.location.replace("/obras-sociales");
    },
    onError: (error) => {
      console.error("Put Error:", error.message);
    },
  });

  return mutation;
};
