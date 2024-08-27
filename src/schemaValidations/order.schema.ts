import z from "zod";
import { AccountSchema } from "./account.schema";
import { DishStatusValues, OrderStatusValues } from "@/constants/type";

const DishSnapshotSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string(),
  status: z.enum(DishStatusValues),
  dishId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const OrderSchema = z.object({
  id: z.number(),
  guestId: z.number().nullable(),
  guest: z
    .object({
      id: z.number(),
      name: z.string(),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .nullable(),
  tableNumber: z.number().nullable(),
  dishSnapshotId: z.number(),
  dishSnapshot: DishSnapshotSchema,
  quantity: z.number(),
  orderHandlerId: z.number().nullable(),
  orderHandler: AccountSchema.nullable(),
  status: z.enum(OrderStatusValues),
});

export const GetOrderRes = z.array(OrderSchema);

export type GetOrderResType = z.TypeOf<typeof GetOrderRes>;

export const UpdateOrderBody = z.object({
  status: z.enum(OrderStatusValues),
  dishId: z.number(),
  quantity: z.number(),
});

export type UpdateOrderBodyType = z.TypeOf<typeof UpdateOrderBody>;

export const UpdateOrderRes = z.object({
  OrderSchema,
});

export type UpdateOrderResType = z.TypeOf<typeof UpdateOrderRes>;
