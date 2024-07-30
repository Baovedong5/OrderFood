import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_AUTH_URL: z.string(),
  NO_SECRET: z.string(),
});

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_AUTH_URL: process.env.NEXT_AUTH_URL,
  NO_SECRET: process.env.NO_SECRET,
});

if (!configProject.success) {
  console.error(configProject.error.errors);
  throw new Error("Các khai báo biến môi trường không hợp lệ!");
}

const envConfig = configProject.data;

export default envConfig;
