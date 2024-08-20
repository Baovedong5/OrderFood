import tableApiRequest from "@/apiRequests/table";
import {
  CreateTableBodyType,
  UpdateTableBodyType,
} from "@/schemaValidations/table.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTableListQuery = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: tableApiRequest.list,
  });
};

export const useGetTableQuery = (id: number) => {
  return useQuery({
    queryKey: ["tables", id],
    queryFn: () => tableApiRequest.getTable(id),
    enabled: !!id,
  });
};

export const useAddTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { token: string; body: CreateTableBodyType }) =>
      tableApiRequest.add(data.token, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};

export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      token: string;
      body: UpdateTableBodyType & { id: number };
    }) => tableApiRequest.updateTable(data.token, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
        exact: true,
      });
    },
  });
};

export const useDeleteTableMutation = () => {
  const quueryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { token: string; id: number }) =>
      tableApiRequest.deleteTable(data.token, data.id),
    onSuccess: () => {
      quueryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};
