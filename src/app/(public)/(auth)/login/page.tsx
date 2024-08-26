import { getServerSession } from "next-auth";
import LoginForm from "./login-form";
import { authOptions } from "@/app/api/auth/auth.options";
import { redirect } from "next/navigation";

const Login = async () => {
  const session = await getServerSession(authOptions);

  // if (session) {
  //   redirect("/");
  // }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
