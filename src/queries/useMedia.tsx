import { uploadApiRequest } from "@/apiRequests/upload";
import { useMutation } from "@tanstack/react-query";

export const useUploadMediaMutation = () => {
  return useMutation({
    mutationFn: (data: { formData: FormData; type: string }) =>
      uploadApiRequest.upload(data.formData, data.type),
  });
};
