import {
  LuHome,
  LuShoppingCart,
  LuTable,
  LuSalad,
  LuUsers2,
} from "react-icons/lu";

const menuItems = [
  {
    title: "Dashboard",
    Icon: LuHome,
    href: "/manage/dashboard",
  },
  {
    title: "Đơn hàng",
    Icon: LuShoppingCart,
    href: "/manage/orders",
  },
  {
    title: "Bàn ăn",
    Icon: LuTable,
    href: "/manage/tables",
  },
  {
    title: "Món ăn",
    Icon: LuSalad,
    href: "/manage/dishes",
  },
  {
    title: "Nhân viên",
    Icon: LuUsers2,
    href: "/manage/accounts",
  },
];

export default menuItems;
