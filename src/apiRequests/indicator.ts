import {
  DashboardIndicatorQueryParamsType,
  DashboardIndicatorResType,
} from "@/schemaValidations/indicator.schema";
import { http } from "@/utils/http";

const indicatorApiRequest = {
  getDashboardIndicators: (
    token: string,
    queryParams: DashboardIndicatorQueryParamsType
  ) =>
    http<IBackendRes<DashboardIndicatorResType>>({
      url: "/api/v1/indicator/dashboard",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      queryParams: {
        fromDate: queryParams.fromDate?.toISOString(),
        toDate: queryParams.toDate?.toISOString(),
      },
    }),
};

export default indicatorApiRequest;
