import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType } from "hono";

type ResponseType = number;
type RequestType = InferRequestType<
  (typeof client.api.medications.delete)[":id"]["$delete"]
>;

export const useDeleteMedication = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const { id } = param;

      const response = await client.api.medications.delete[":id"]["$delete"]({
        param: { id },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete medication with ID: ${id} ${JSON.stringify(
            response
          )}`
        );
      }

      console.log("response", response);

      return response.status;
    },
    onSuccess: () => {
      window.location.replace("/medicamentos");
    },
    onError: (error) => {
      console.error("Delete Error", error.message);
    },
  });

  return mutation;
};
