import orderApiRequest from "@/apiRequests/order";
import { UpdateOrderBodyType } from "@/schemaValidations/order.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: (data: {
      token: string;
      body: UpdateOrderBodyType & { id: number };
    }) => orderApiRequest.updateOrder(data.token, data.body),
  });
};

export const useGetOrderListQuery = (token: string) => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApiRequest.getOrderList(token),
  });
};
