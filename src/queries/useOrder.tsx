import orderApiRequest from "@/apiRequests/order";
import {
  CreateOrderBodyType,
  GetOrdersQueryParamsType,
  PayGuestOrdersBodyType,
  UpdateOrderBodyType,
} from "@/schemaValidations/order.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: {
      token: string;
      body: UpdateOrderBodyType & { id: number };
    }) => orderApiRequest.updateOrder(data.token, data.body),
  });
};

export const useGetOrderListQuery = (
  token: string,
  queryParams?: GetOrdersQueryParamsType
) => {
  return useQuery({
    queryKey: ["order-list", token, queryParams],
    queryFn: () => orderApiRequest.getOrderList(token, queryParams),
    enabled: !!token,
  });
};

export const useGetOrderDetailQuery = (token: string, id: number) => {
  return useQuery({
    queryKey: ["orders", id, token],
    queryFn: () => orderApiRequest.getOrderDetail(token, id),
    enabled: !!id,
  });
};

export const usePayForGuestMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; body: PayGuestOrdersBodyType }) =>
      orderApiRequest.pay(data.token, data.body),
  });
};

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; body: CreateOrderBodyType }) =>
      orderApiRequest.createOrders(data.token, data.body),
  });
};
