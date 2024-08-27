import { Role } from "@/constants/type";
import z from "zod";
import { OrderSchema } from "./order.schema";

export const GuestLoginBody = z
  .object({
    name: z.string().min(2).max(50),
    tableNumber: z.number(),
    token: z.string(),
  })
  .strict();

export type GuestLoginBodyType = z.TypeOf<typeof GuestLoginBody>;

export const GuestLoginRes = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  guest: z.object({
    id: z.number(),
    name: z.string(),
    role: z.enum([Role.Guest]),
    tableNumber: z.number().nullable(),
  }),
});

export type GuestLoginResType = z.TypeOf<typeof GuestLoginRes>;

export const GuestCreateOrdersBody = z.array(
  z.object({
    dishId: z.number(),
    quantity: z.number(),
  })
);

export type GuestCreateOrdersBodyType = z.TypeOf<typeof GuestCreateOrdersBody>;

export const GuestCreateOrdersRes = z.array(OrderSchema);

export type GuestCreateOrdersResType = z.TypeOf<typeof GuestCreateOrdersRes>;

export const GuestGetOrdersRes = GuestCreateOrdersRes;

export type GuestGetOrdersResType = z.TypeOf<typeof GuestGetOrdersRes>;
