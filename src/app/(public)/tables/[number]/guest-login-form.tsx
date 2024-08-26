"use client";

import { useAppContext } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  GuestLoginBody,
  GuestLoginBodyType,
} from "@/schemaValidations/guest.schema";
import { http } from "@/utils/http";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const GuestLoginForm = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const { setRole } = useAppContext();

  const tableNumber = Number(params.number);
  const token = searchParams.get("token");

  const form = useForm<GuestLoginBodyType>({
    resolver: zodResolver(GuestLoginBody),
    defaultValues: {
      name: "",
      token: token ?? "",
      tableNumber,
    },
  });

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const onSubmit = async (values: GuestLoginBodyType) => {
    const res = await signIn("credentials-guest", {
      name: values.name,
      token: values.token,
      tableNumber: values.tableNumber,
      redirect: false,
    });

    if (!res?.error) {
      setRole("Guest");
      router.push("/guest/menu");
    } else {
      toast({
        description: "Tài khoản hoặc mật khẩu không đúng",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Đăng nhập gọi món</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
            onSubmit={form.handleSubmit(onSubmit, (e) => {
              console.log(e);
            })}
          >
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Label htmlFor="name">Tên khách hàng</Label>
                      <Input id="name" type="text" required {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GuestLoginForm;
