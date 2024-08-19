import {
  CreateDishBodyType,
  DishListResType,
  DishResType,
  UpdateDishBodyType,
} from "@/schemaValidations/dish.schema";
import { http } from "@/utils/http";

const dishApiRequest = {
  list: () =>
    http<IBackendRes<DishListResType>>({
      method: "GET",
      url: "/api/v1/dishs",
    }),

  getDish: (id: number) =>
    http<IBackendRes<DishResType>>({
      url: `/api/v1/dishs/${id}`,
      method: "GET",
    }),

  add: (token: string, body: CreateDishBodyType) =>
    http<IBackendRes<DishResType>>({
      url: "/api/v1/dishs",
      method: "POST",
      body: {
        ...body,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateDish: (token: string, body: UpdateDishBodyType & { id: number }) => {
    const { id, ...rest } = body;

    return http<IBackendRes<DishResType>>({
      url: `/api/v1/dishs/${id}`,
      method: "PATCH",
      body: {
        ...rest,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteDish: (token: string, id: number) =>
    http<IBackendRes<DishResType>>({
      url: `/api/v1/dishs/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default dishApiRequest;
