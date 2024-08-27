"use client";

import { useAppContext } from "@/components/app-provider";
import { Role, RoleType } from "@/constants/type";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";

const menuItems: {
  title: string;
  href: string;
  role?: RoleType[];
  hideWhenLogin?: boolean;
}[] = [
  {
    title: "Trang chủ",
    href: "/",
  },
  {
    title: "Menu",
    href: "/guest/menu",
    role: [Role.Guest],
  },
  {
    title: "Đăng nhập",
    href: "/login",
    hideWhenLogin: true,
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    role: [Role.Owner, Role.Employee],
  },
];

const NavItems = ({ className }: { className?: string }) => {
  const { role } = useAppContext();

  return (
    <>
      {menuItems.map((item) => {
        // Trường hợp đăng nhập chỉ hiện thị menu đăng nhập
        const isAuth = item.role && role && item.role.includes(role);
        //Trường hợp menu item có thể hiện thị dù cho đăng nhập hay chưa
        const isShow =
          (item.role === undefined && !item.hideWhenLogin) ||
          (!role && item.hideWhenLogin);

        if (isAuth || isShow) {
          return (
            <Link href={item.href} key={item.href} className={className}>
              {item.title}
            </Link>
          );
        }
        return null;
      })}
      {role && (
        <div
          className={cn(className, "cursor-pointer")}
          onClick={() => signOut()}
        >
          Đăng xuất
        </div>
      )}
    </>
  );
};

export default NavItems;
