import {
  CreateTableBodyType,
  TableListResType,
  TableResType,
  UpdateTableBodyType,
} from "@/schemaValidations/table.schema";
import { http } from "@/utils/http";

const tableApiRequest = {
  list: () =>
    http<IBackendRes<TableListResType>>({
      url: "/api/v1/tables",
      method: "GET",
    }),

  getTable: (id: number) =>
    http<IBackendRes<TableResType>>({
      url: `/api/v1/tables/${id}`,
      method: "GET",
    }),

  add: (token: string, body: CreateTableBodyType) =>
    http<IBackendRes<TableResType>>({
      url: "/api/v1/tables",
      method: "POST",
      body: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateTable: (token: string, body: UpdateTableBodyType & { id: number }) => {
    const { id, ...rest } = body;

    return http<IBackendRes<TableResType>>({
      url: `/api/v1/tables/${id}`,
      method: "PATCH",
      body: {
        ...rest,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteTable: (token: string, id: number) =>
    http<IBackendRes<TableResType>>({
      url: `/api/v1/tables/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default tableApiRequest;
