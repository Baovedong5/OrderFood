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
};

export default accountApiRequest;
