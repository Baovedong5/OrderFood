"use client";

import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { useDishListQuery } from "@/queries/useDish";
import Image from "next/image";
import Quantity from "./quantity";
import { useMemo, useState } from "react";
import { GuestCreateOrdersBodyType } from "@/schemaValidations/guest.schema";
import { useGetOrderMutation } from "@/queries/useGuest";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DishStatus } from "@/constants/type";

const MenuOrder = () => {
  const { data } = useDishListQuery();
  const dishes = useMemo(() => data?.data || [], [data]);
  const router = useRouter();

  const { data: session } = useSession();
  const token = session?.access_token as string;

  const { mutateAsync } = useGetOrderMutation();

  const [orders, setOrders] = useState<GuestCreateOrdersBodyType>([]);

  const handleQuantityChange = (dishId: number, quantity: number) => {
    setOrders((prev) => {
      if (quantity === 0) {
        return prev.filter((order) => order.dishId !== dishId);
      }
      const index = prev.findIndex((order) => order.dishId === dishId);
      if (index === -1) {
        return [...prev, { dishId, quantity }];
      }
      const newOrders = [...prev];
      newOrders[index] = { ...newOrders[index], quantity };
      return newOrders;
    });
  };

  const totalPrice = useMemo(() => {
    return dishes.reduce((result, dish) => {
      const order = orders.find((order) => order.dishId === dish.id);
      if (!order) return result;
      return result + order.quantity * dish.price;
    }, 0);
  }, [dishes, orders]);

  const handleOrder = async () => {
    const result = await mutateAsync({ token, body: orders });
    if (result && result.data) {
      router.push("/guest/orders");
    }
  };

  return (
    <>
      {dishes
        .filter((dish) => dish.status !== DishStatus.Hidden)
        .map((dish) => (
          <div
            key={dish.id}
            className={cn("flex gap-4", {
              "pointer-events-none": dish.status === DishStatus.Unavailable,
            })}
          >
            <div className="flex-shrink-0 relative">
              {dish.status === DishStatus.Unavailable && (
                <span className="absolute inset-0 flex items-center justify-center text-sm">
                  Hết hàng
                </span>
              )}
              <Image
                src={`http:localhost:8080/images/dish/${dish.image}`}
                alt={dish.name}
                height={100}
                width={100}
                quality={100}
                className="object-cover w-[80px] h-[80px] rounded-md"
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm">{dish.name}</h3>
              <p className="text-xs">{dish.description}</p>
              <p className="text-xs font-semibold">
                {formatCurrency(dish.price)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-auto flex justify-center items-center">
              <Quantity
                onChange={(value) => handleQuantityChange(dish.id, value)}
                value={
                  orders.find((order) => order.dishId === dish.id)?.quantity ??
                  0
                }
              />
            </div>
          </div>
        ))}
      <div className="sticky bottom-0">
        <Button
          className="w-full justify-between"
          onClick={handleOrder}
          disabled={orders.length === 0}
        >
          <span>Đặt hàng · {orders.length} món</span>
          <span>{formatCurrency(totalPrice)}</span>
        </Button>
      </div>
    </>
  );
};

export default MenuOrder;
