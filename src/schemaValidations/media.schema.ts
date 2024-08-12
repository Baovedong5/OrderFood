import { z } from "zod";

export const uploadImageRes = z.object({
  data: z.object({
    fileName: z.string(),
  }),
});

export type uploadImageResType = z.TypeOf<typeof uploadImageRes>;
