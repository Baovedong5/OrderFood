"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuMinus, LuPlus } from "react-icons/lu";

interface IProps {
  onChange: (value: number) => void;
  value: number;
}

export const Quantity = (props: IProps) => {
  const { onChange, value } = props;

  return (
    <div className="flex gap-1 ">
      <Button
        className="h-6 w-6 p-0"
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
      >
        <LuMinus className="w-3 h-3" />
      </Button>
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="h-6 p-1 w-8 text-center"
        value={Number(value)}
        onChange={(e) => {
          let value = e.target.value;
          const numberValue = Number(value);
          if (isNaN(numberValue)) {
            return;
          }
          onChange(numberValue);
        }}
      />
      <Button className="h-6 w-6 p-0" onClick={() => onChange(value + 1)}>
        <LuPlus className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default Quantity;
