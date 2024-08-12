import { AccountMeResType } from "@/schemaValidations/auth.schema";
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
};

export default accountApiRequest;
