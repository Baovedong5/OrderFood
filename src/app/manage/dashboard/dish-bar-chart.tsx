"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardIndicatorResType } from "@/schemaValidations/indicator.schema";
import { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const colors = [
  "var(--color-chrome)",
  "var(--color-safari)",
  "var(--color-firefox)",
  "var(--color-edge)",
  "var(--color-other)",
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const DishBarChart = ({
  chartData,
}: {
  chartData: Pick<
    DashboardIndicatorResType["dishIndicator"][0],
    "name" | "successOrders"
  >[];
}) => {
  const chartDataColors = useMemo(
    () =>
      chartData.map((data, index) => {
        return {
          ...data,
          fill: colors[index] ?? colors[colors.length - 1],
        };
      }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Xếp hạng món ăn</CardTitle>
        <CardDescription>Được gọi nhiều nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartDataColors}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) => {
                return value;
              }}
            />
            <XAxis dataKey="successOrders" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="successOrders"
              name="Đơn thanh toán &nbsp;"
              layout="vertical"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
};

export default DishBarChart;
