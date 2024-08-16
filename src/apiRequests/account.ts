import {
  AccountListResType,
  AccountResType,
  CreateEmployeeAccountBodyType,
  UpdateEmployeeAccountBodyType,
} from "@/schemaValidations/account.schema";
import {
  AccountMeResType,
  ChangePasswordBodyType,
  UpdateMeBodyType,
} from "@/schemaValidations/auth.schema";
import { http } from "@/utils/http";

const accountApiRequest = {
  me: (token: string) => {
    return http<IBackendRes<AccountMeResType>>({
      url: `/api/v1/auth/me`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateMe: (token: string, body: UpdateMeBodyType) => {
    return http<IBackendRes<AccountMeResType>>({
      url: "/api/v1/auth/me",
      method: "PATCH",
      body: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  changePassword: (token: string, body: ChangePasswordBodyType) => {
    return http<IBackendRes<AccountMeResType>>({
      url: "/api/v1/auth/change-password",
      method: "PATCH",
      body: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  list: (token: string) => {
    return http<IBackendRes<AccountListResType>>({
      url: "/api/v1/accounts",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getEmployee: (id: number, token: string) => {
    return http<IBackendRes<AccountResType>>({
      url: `/api/v1/accounts/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  addEmployee: (token: string, body: CreateEmployeeAccountBodyType) => {
    return http<IBackendRes<AccountResType>>({
      url: "/api/v1/accounts",
      method: "POST",
      body: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateEmployee: (
    token: string,
    body: UpdateEmployeeAccountBodyType & { id: number }
  ) => {
    const { id, ...rest } = body;

    return http<IBackendRes<AccountResType>>({
      url: `/api/v1/accounts/${id}`,
      method: "PATCH",
      body: {
        ...rest,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteEmployee: (id: number, token: string) => {
    return http<IBackendRes<AccountResType>>({
      url: `/api/v1/accounts/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default accountApiRequest;
