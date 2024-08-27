import {
  GuestCreateOrdersBodyType,
  GuestCreateOrdersResType,
  GuestGetOrdersResType,
} from "@/schemaValidations/guest.schema";
import { http } from "@/utils/http";

const guestApiRequest = {
  order: (token: string, body: GuestCreateOrdersBodyType) =>
    http<IBackendRes<GuestCreateOrdersResType>>({
      url: "/api/v1/guests/orders",
      method: "POST",
      body: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${token})}`,
      },
    }),

  getOrderList: (token: string) =>
    http<IBackendRes<GuestGetOrdersResType>>({
      url: "/api/v1/guests/orders",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token})}`,
      },
    }),
};

export default guestApiRequest;
