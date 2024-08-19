import dishApiRequest from "@/apiRequests/dish";
import {
  CreateDishBodyType,
  UpdateDishBodyType,
} from "@/schemaValidations/dish.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDishListQuery = () => {
  return useQuery({
    queryKey: ["dishes"],
    queryFn: dishApiRequest.list,
  });
};

export const useGetDishQuery = (id: number) => {
  return useQuery({
    queryKey: ["dishes", id],
    queryFn: () => dishApiRequest.getDish(id),
    enabled: !!id,
  });
};

export const useAddDishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { token: string; body: CreateDishBodyType }) =>
      dishApiRequest.add(data.token, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
  });
};

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      token: string;
      body: UpdateDishBodyType & { id: number };
    }) => dishApiRequest.updateDish(data.token, data.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes"],
        exact: true,
      });
    },
  });
};

export const useDeleteDishMutation = () => {
  const quueryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { token: string; id: number }) =>
      dishApiRequest.deleteDish(data.token, data.id),
    onSuccess: () => {
      quueryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
  });
};
