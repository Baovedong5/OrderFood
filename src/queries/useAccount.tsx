import accountApiRequest from "@/apiRequests/account";
import {
  ChangePasswordBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/auth.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAccountMe = (token: string) => {
  return useQuery({
    queryKey: ["account-profile"],
    queryFn: () => accountApiRequest.me(token),
    enabled: !!token,
  });
};

export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; body: UpdateMeBodyType }) =>
      accountApiRequest.updateMe(data.token, data.body),
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; body: ChangePasswordBodyType }) =>
      accountApiRequest.changePassword(data.token, data.body),
  });
};
