import { authOptions } from "@/app/api/auth/auth.options";
import { Role } from "@/constants/type";
import { decodeToken } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MenuOrder from "./menu-order";

const MenuPage = async () => {
  const session = await getServerSession(authOptions);

  const access_token = session?.access_token as string;

  const role = decodeToken(access_token)?.role;

  if (role !== Role.Guest) {
    redirect("/");
  }

  return (
    <div className="max-w-[400px] mx-auto space-y-4">
      <h1 className="text-center text-xl font-bold">🍕 Menu quán</h1>
      <MenuOrder />
    </div>
  );
};

export default MenuPage;
