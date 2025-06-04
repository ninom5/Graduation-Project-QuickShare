import { useMutation } from "@tanstack/react-query";
import { api } from "api/base";
import { toast } from "react-toastify";

const session = (connectionId: string) => {
  return api.post<string, string>(`/sessions/connect/${connectionId}`);
};

export const useSession = () => {
  return useMutation({
    mutationFn: session,
    mutationKey: ["mobile-hit"],
    onSuccess: () => {
      toast.success("Successfully notified backend");
    },
    onError: (error) => {
      toast.error("Error notifying backend" + error);
      console.error(`Error: ${error}`);
    },
  });
};
