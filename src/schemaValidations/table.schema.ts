import { TableStatusValues } from "@/constants/type";
import z from "zod";

export const CreateTableBody = z.object({
  number: z.coerce.number().positive(),
  capacity: z.coerce.number().positive(),
  status: z.enum(TableStatusValues).optional(),
});

export type CreateTableBodyType = z.TypeOf<typeof CreateTableBody>;

export const TableSchema = z.object({
  number: z.coerce.number(),
  capacity: z.coerce.number(),
  status: z.enum(TableStatusValues),
  token: z.string(),
});

export type TableResType = z.TypeOf<typeof TableSchema>;

export const TableListRes = z.array(TableSchema);

export type TableListResType = z.TypeOf<typeof TableListRes>;

export const UpdateTableBody = z.object({
  changeToken: z.boolean(),
  capacity: z.coerce.number().positive(),
  status: z.enum(TableStatusValues).optional(),
});

export type UpdateTableBodyType = z.TypeOf<typeof UpdateTableBody>;
