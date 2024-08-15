import { uploadImageResType } from "@/schemaValidations/media.schema";
import { sendRequestFile } from "@/utils/http";

export const uploadApiRequest = {
  upload: (formData: FormData, type: string) =>
    sendRequestFile<IBackendRes<uploadImageResType>>({
      method: "POST",
      url: "/api/v1/files/upload",
      body: formData,
      headers: {
        folder_type: `${type}`,
      },
    }),
};
