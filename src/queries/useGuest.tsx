import guestApiRequest from "@/apiRequests/guest";
import { GuestCreateOrdersBodyType } from "@/schemaValidations/guest.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetOrderMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string; body: GuestCreateOrdersBodyType }) =>
      guestApiRequest.order(data.token, data.body),
  });
};

export const useGetOrderListQuery = (token: string) => {
  return useQuery({
    queryKey: ["guest-orders"],
    queryFn: () => guestApiRequest.getOrderList(token),
    enabled: !!token,
  });
};
