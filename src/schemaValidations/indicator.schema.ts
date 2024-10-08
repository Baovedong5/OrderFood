import z from "zod";
import { DishSchema } from "./dish.schema";

export const DashboardIndicatorQueryParams = z.object({
  fromDate: z.coerce.date(),
  toDate: z.coerce.date(),
});

export type DashboardIndicatorQueryParamsType = z.TypeOf<
  typeof DashboardIndicatorQueryParams
>;

export const DashboardIndicatorRes = z.object({
  revenue: z.number(),
  guestCount: z.number(),
  orderCount: z.number(),
  servingTableCount: z.number(),
  dishIndicator: z.array(
    DishSchema.extend({
      successOrders: z.number(),
    })
  ),
  revenueByDate: z.array(
    z.object({
      date: z.string(),
      revenue: z.number(),
    })
  ),
});

export type DashboardIndicatorResType = z.TypeOf<typeof DashboardIndicatorRes>;
