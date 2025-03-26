import { AxiosResponse } from "axios";
import {
	ResponseDownloadFileInvoice,
	ResponseGenerateFileInvoice,
	ResponseGetFileInvoices,
} from "./types";
import axiosInstance from "@/utils/axios";
import { ResponseGetInvoices } from "../invoices/type";

export const GetInvoices = async (): Promise<
	AxiosResponse<ResponseGetFileInvoices>
> => {
	return await axiosInstance.get("/file-invoices");
};

export const GetInvoiceById = async (
	id: string
): Promise<AxiosResponse<ResponseGetInvoices>> => {
	return await axiosInstance.get(`/file-invoice/${id}/invoices`);
};

export const GenerateInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseGenerateFileInvoice>> => {
	return await axiosInstance.get(`/file-invoice/generate-excel/${id}`);
};

export const DownloadInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseDownloadFileInvoice>> => {
	return await axiosInstance.get(`/file-invoice/download-excel/${id}`, {
		responseType: "blob",
	});
};
export const DeleteInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseGetFileInvoices>> => {
	return await axiosInstance.delete(`/file-invoice/${id}`);
};
export const UploadInvoice = async (file: FormData): Promise<AxiosResponse> => {
	return await axiosInstance.post(`/file-invoice/upload`, file, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
};
