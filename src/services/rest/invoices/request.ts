import { AxiosResponse } from "axios";
import {
	ResponseDownloadInvoice,
	ResponseGenerateInvoice,
	ResponseGetInvoices,
} from "./types";
import axiosInstance from "@/utils/axios";

export const GetInvoices = async (): Promise<
	AxiosResponse<ResponseGetInvoices>
> => {
	return await axiosInstance.get("/invoices");
};

export const GenerateInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseGenerateInvoice>> => {
	return await axiosInstance.get(`/invoice/generate-excel/${id}`);
};

export const DownloadInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseDownloadInvoice>> => {
	return await axiosInstance.get(`/invoice/download-excel/${id}`, {
		responseType: "blob",
	});
};
export const DeleteInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseGetInvoices>> => {
	return await axiosInstance.delete(`invoice/${id}`);
};
export const UploadInvoice = async (file: FormData): Promise<AxiosResponse> => {
	return await axiosInstance.post(`/invoice/upload`, file, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
