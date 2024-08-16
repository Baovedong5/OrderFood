"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useAccountMe, useUpdateMeMutation } from "@/queries/useAccount";
import { useUploadMediaMutation } from "@/queries/useMedia";
import {
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuUpload } from "react-icons/lu";

const UpdateProfileForm = () => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const { data: session } = useSession();
  const token = session?.access_token as string;

  const { data, refetch } = useAccountMe(token);

  const updateMeMutation = useUpdateMeMutation();
  const uploadMediaMutation = useUploadMediaMutation();

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: "",
      avatar: undefined,
    },
  });

  const avatar = form.watch("avatar");
  const name = form.watch("name");

  const previewAvatar = useMemo(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      return objectUrl;
    }
    return avatar ? `http://localhost:8080/images/avatar/${avatar}` : undefined;
  }, [avatar, file]);

  useEffect(() => {
    if (data) {
      const { avatar, name } = data.data;
      form.reset({
        avatar: avatar ?? undefined,
        name,
      });
    }
  }, [data, form]);

  const reset = () => {
    form.reset();
    setFile(null);
  };

  const onSubmit = async (values: UpdateMeBodyType) => {
    if (updateMeMutation.isPending) return;

    try {
      let body = values;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadImageResult = await uploadMediaMutation.mutateAsync({
          formData,
          type: "avatar",
        });

        const imageUrl = uploadImageResult.data.fileName;

        body = { ...values, avatar: imageUrl };
      }
      const result = await updateMeMutation.mutateAsync({ token, body });

      if (result.data) {
        toast({
          description: "Cập nhật thông tin thành công",
        });
        refetch();
      } else {
        toast({
          description: "Cập nhật thông tin thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form
        noValidate
        className="grid auto-rows-max items-center gap-4 md:gap-8"
        onReset={reset}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
                        <AvatarImage src={previewAvatar} />
                        <AvatarFallback className="rounded-none"></AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={avatarInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                          }
                        }}
                      />
                      <button
                        className="flex aspect-square w-[100px] items-center justify-center rounded-md border border-dashed"
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <LuUpload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Tên</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className=" items-center gap-2 md:ml-auto flex">
                <Button variant="outline" size="sm" type="reset">
                  Hủy
                </Button>
                <Button size="sm" type="submit">
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
