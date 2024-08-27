import {
  GetOrderResType,
  UpdateOrderBodyType,
  UpdateOrderResType,
} from "@/schemaValidations/order.schema";
import { http } from "@/utils/http";

const orderApiRequest = {
  getOrderList: (token: string) =>
    http<IBackendRes<GetOrderResType>>({
      url: "api/v1/orders",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateOrder: (token: string, body: UpdateOrderBodyType & { id: number }) => {
    const { id, ...rest } = body;

    return http<IBackendRes<UpdateOrderResType>>({
      url: `api/v1/orders/${id}`,
      method: "PATCH",
      body: {
        ...rest,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default orderApiRequest;
