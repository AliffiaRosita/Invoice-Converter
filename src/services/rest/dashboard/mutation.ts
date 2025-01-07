import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { ResponseGetDashboardReport } from "./types";
import { GetDashboardReport } from "./request";

export const useGetDashboardReport = () =>
	useMutation({
		mutationFn: async (): Promise<
			AxiosResponse<ResponseGetDashboardReport>
		> => await GetDashboardReport(),
	});
