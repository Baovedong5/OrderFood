import indicatorApiRequest from "@/apiRequests/indicator";
import { DashboardIndicatorQueryParamsType } from "@/schemaValidations/indicator.schema";
import { useQuery } from "@tanstack/react-query";

export const useDashboardIndicators = (
  token: string,
  queryParams: DashboardIndicatorQueryParamsType
) => {
  return useQuery({
    queryKey: ["dashboardIndicators", queryParams, token],
    queryFn: () =>
      indicatorApiRequest.getDashboardIndicators(token, queryParams),
  });
};
