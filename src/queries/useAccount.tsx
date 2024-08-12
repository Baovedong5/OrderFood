import accountApiRequest from "@/apiRequests/account";
import { AccountMeResType } from "@/schemaValidations/auth.schema";
import { useQuery } from "@tanstack/react-query";

export const useAccountProfile = (token: string) => {
  return useQuery({
    queryKey: ["account-profile"],
    queryFn: () => accountApiRequest.me(token),
    enabled: !!token,
  });
};
