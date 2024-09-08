import orderApiRequest from "@/apiRequests/order";
import {
  GetOrdersQueryParamsType,
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

export const useGetOrderDetailQuery = (token: string, orderNumber: number) => {
  return useQuery({
    queryKey: ["orders", orderNumber, token],
    queryFn: () => orderApiRequest.getOrderDetail(token, orderNumber),
    enabled: !!orderNumber,
  });
};
