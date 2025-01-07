import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { ResponseGetDashboardReport } from "./types";

export const GetDashboardReport = async (): Promise<
	AxiosResponse<ResponseGetDashboardReport>
> => {
	return await axiosInstance.get("/dashboard-data");
};
