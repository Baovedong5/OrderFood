import {
  CreateOrdersBodyType,
  CreateOrdersResType,
  GetOrderDetailResType,
  GetOrderResType,
  GetOrdersQueryParamsType,
  PayGuestOrderResType,
  PayGuestOrdersBodyType,
  UpdateOrderBodyType,
  UpdateOrderResType,
} from "@/schemaValidations/order.schema";
import { http } from "@/utils/http";

const orderApiRequest = {
  createOrders: (token: string, body: CreateOrdersBodyType) =>
    http<IBackendRes<CreateOrdersResType>>({
      url: "/api/v1/orders",
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getOrderList: (token: string, queryParams?: GetOrdersQueryParamsType) =>
    http<IBackendRes<GetOrderResType>>({
      url: "/api/v1/orders",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      queryParams: {
        fromDate: queryParams?.fromDate?.toISOString(),
        toDate: queryParams?.toDate?.toISOString(),
      },
    }),

  updateOrder: (token: string, body: UpdateOrderBodyType & { id: number }) => {
    const { id, ...rest } = body;

    return http<IBackendRes<UpdateOrderResType>>({
      url: `/api/v1/orders/${id}`,
      method: "PATCH",
      body: {
        ...rest,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getOrderDetail: (token: string, orderNumber: number) =>
    http<IBackendRes<GetOrderDetailResType>>({
      url: `/api/v1/orders/${orderNumber}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  pay: (token: string, body: PayGuestOrdersBodyType) =>
    http<IBackendRes<PayGuestOrderResType>>({
      url: "/api/v1/orders/pay",
      method: "POST",
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default orderApiRequest;
