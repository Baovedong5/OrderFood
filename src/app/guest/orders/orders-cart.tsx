"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import socket from "@/lib/socket";
import { formatCurrency, getVietnameseOrderStatus } from "@/lib/utils";
import { useGetOrderListQuery } from "@/queries/useGuest";
import { UpdateOrderResType } from "@/schemaValidations/order.schema";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo } from "react";

const OrdersCart = () => {
  const { data: session } = useSession();

  const token = session?.access_token as string;

  const { data, refetch } = useGetOrderListQuery(token);

  const orders = useMemo(() => data?.data ?? [], [data]);

  const totalPrice = useMemo(() => {
    return orders.reduce((result, order) => {
      return result + order.dishSnapshot.price * order.quantity;
    }, 0);
  }, [orders]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socket.id);
    }

    function onUpdateOrder(data: UpdateOrderResType["OrderSchema"]) {
      console.log(data);
      const {
        dishSnapshot: { name },
      } = data;
      toast({
        description: `Món ${name} (SL: ${
          data.quantity
        }) vừa được cập nhật sang trạng thái ${getVietnameseOrderStatus(
          data.status
        )}`,
      });
      refetch();
    }

    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("update-order", onUpdateOrder);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("update-order", onUpdateOrder);
    };
  }, [refetch]);

  return (
    <>
      {orders.map((order, index) => (
        <div key={order.id} className="flex gap-4">
          <div className="text-sm font-semibold">{index + 1}</div>
          <div className="flex-shrink-0">
            <Image
              src={`http:localhost:8080/images/dish/${order.dishSnapshot.image}`}
              alt={order.dishSnapshot.name}
              height={100}
              width={100}
              quality={100}
              className="object-cover w-[80px] h-[80px] rounded-md"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm">{order.dishSnapshot.name}</h3>
            <div className="text-xs font-semibold">
              {formatCurrency(order.dishSnapshot.price)} x{" "}
              <Badge className="px-1">{order.quantity}</Badge>
            </div>
          </div>
          <div className="flex-shrink-0 ml-auto flex justify-center items-center">
            <Badge variant={"outline"}>
              {getVietnameseOrderStatus(order.status)}
            </Badge>
          </div>
        </div>
      ))}
      <div className="sticky bottom-0">
        <Button className="w-full justify-between">
          <span>Tổng cộng · {orders.length} món</span>
          <span>{formatCurrency(totalPrice)}</span>
        </Button>
      </div>
    </>
  );
};

export default OrdersCart;
