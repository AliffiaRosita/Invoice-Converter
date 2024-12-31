import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import {
	RequestUpdateItem,
	ResponseDownloadItems,
	ResponseGetItemById,
	ResponseGetItems,
} from "./types";

export const GetItems = async (): Promise<AxiosResponse<ResponseGetItems>> => {
	return await axiosInstance.get("/items");
};

export const DownloadItems = async (): Promise<
	AxiosResponse<ResponseDownloadItems>
> => {
	return await axiosInstance.get("/items/download-excel", {
		responseType: "blob",
	});
};
export const GetItemById = async (
	id: string
): Promise<AxiosResponse<ResponseGetItemById>> => {
	return await axiosInstance.get(`/items/${id}`);
};
export const UpdateItem = async (
	data: RequestUpdateItem,
	id: string
): Promise<AxiosResponse> => {
	return await axiosInstance.put(`/items/${id}`, data);
};
