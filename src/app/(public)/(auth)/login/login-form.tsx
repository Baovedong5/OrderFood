"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/components/app-provider";
import { RoleType } from "@/constants/type";

const LoginForm = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const role = session?.user?.role as RoleType;

  const { setRole } = useAppContext();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginBodyType) => {
    const res = await signIn("credentials-admin", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (!res?.error) {
      toast({
        description: "Đăng nhập thành công",
      });
      setRole(role);
      route.push("/manage/dashboard");
    } else {
      toast({
        description: "Tài khoản hoặc mật khẩu không đúng",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-[550px] ">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <Link href={"/"}>
            <BiArrowBack />
          </Link>
          <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email và mật khẩu của bạn để đăng nhập vào hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Tài khoản</Label>
                        <Input id="username" type="email" required {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Label>Mật khẩu</Label>
                        <Input
                          id="password"
                          type="password"
                          required
                          {...field}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Đăng nhập
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  Đăng nhập bằng Google
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
