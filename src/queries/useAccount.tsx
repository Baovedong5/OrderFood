import accountApiRequest from "@/apiRequests/account";
import {
  CreateEmployeeAccountBodyType,
  UpdateEmployeeAccountBodyType,
} from "@/schemaValidations/account.schema";
import {
  ChangePasswordBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/auth.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetAccountList = (token: string) => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountApiRequest.list(token),
    enabled: !!token,
  });
};

export const useGetAccount = (token: string, id: number) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => accountApiRequest.getEmployee(id, token),
    enabled: !!token && !!id,
  });
};

export const useAddAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      token: string;
      body: CreateEmployeeAccountBodyType;
    }) => accountApiRequest.addEmployee(data.token, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      token: string;
      body: UpdateEmployeeAccountBodyType & { id: number }; // Include id in the body
    }) => accountApiRequest.updateEmployee(data.token, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
        exact: true,
      });
    },
  });
};

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { token: string; id: number }) =>
      accountApiRequest.deleteEmployee(data.id, data.token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
    },
  });
};
