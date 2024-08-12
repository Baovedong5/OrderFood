import { uploadImageResType } from "@/schemaValidations/media.schema";
import { sendRequestFile } from "@/utils/http";

export const uploadApiRequest = {
  upload: (formData: FormData, token: string, type: string) =>
    sendRequestFile<IBackendRes<uploadImageResType>>({
      method: "POST",
      url: "/api/v1/files/upload",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        folder_type: `${type}`,
      },
    }),
};
