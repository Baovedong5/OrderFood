import { DishStatus, OrderStatus, TableStatus } from "@/constants/type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { format } from "date-fns";
import { LuBookX, LuHelpingHand, LuLoader, LuTruck } from "react-icons/lu";
import { PiCookingPot, PiHandCoinsLight } from "react-icons/pi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getVietnameseDishStatus = (
  status: (typeof DishStatus)[keyof typeof DishStatus]
) => {
  switch (status) {
    case DishStatus.Available:
      return "Có sẵn";
    case DishStatus.Unavailable:
      return "Không có sẵn";
    default:
      return "Ẩn";
  }
};

export const getVietnameseTableStatus = (
  status: (typeof TableStatus)[keyof typeof TableStatus]
) => {
  switch (status) {
    case TableStatus.Available:
      return "Có sẵn";
    case TableStatus.Reserved:
      return "Đã đặt";
    default:
      return "Ẩn";
  }
};

export const getVietnameseOrderStatus = (
  status: (typeof OrderStatus)[keyof typeof OrderStatus]
) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "Đã giao";
    case OrderStatus.Paid:
      return "Đã thanh toán";
    case OrderStatus.Pending:
      return "Chờ xác nhận";
    case OrderStatus.Processing:
      return "Đang xử lý";
    default:
      return "Từ chối";
  }
};

export const getTableLink = ({
  token,
  tableNumber,
}: {
  token: string;
  tableNumber: number;
}) => {
  return (
    process.env.NEXT_PUBLIC_URL + "/tables/" + tableNumber + "?token=" + token
  );
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export function removeAccents(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

export const simpleMatchText = (fullText: string, matchText: string) => {
  return removeAccents(fullText.toLowerCase()).includes(
    removeAccents(matchText.trim().toLowerCase())
  );
};

export const formatDateTimeToLocaleString = (date: string | Date) => {
  return format(
    date instanceof Date ? date : new Date(date),
    "HH:mm:ss dd/MM/yyyy"
  );
};

export const formatDateTimeToTimeString = (date: string | Date) => {
  return format(date instanceof Date ? date : new Date(date), "HH:mm:ss");
};

export const decodeToken = (token: string) => {
  return jwt.decode(token) as { role: string };
};

export const OrderStatusIcon = {
  [OrderStatus.Pending]: LuLoader,
  [OrderStatus.Processing]: PiCookingPot,
  [OrderStatus.Rejected]: LuBookX,
  [OrderStatus.Delivered]: LuTruck,
  [OrderStatus.Paid]: PiHandCoinsLight,
};
