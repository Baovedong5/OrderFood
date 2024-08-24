import { httpRevalidate } from "@/utils/http";

const revalidateApiRequest = (tag: string) =>
  httpRevalidate<IBackendRes<any>>({
    method: "POST",
    url: `/api/revalidate`,
    queryParams: {
      tag: `${tag}`,
    },
  });

export default revalidateApiRequest;
