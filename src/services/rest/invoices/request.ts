import { AxiosResponse } from "axios";
import {
	RequestUpdateInvoice,
	ResponseGetInvoices,
	ResponseInvoiceById,
	ResponseXlsInvoice,
} from "./type";
import axiosInstance from "@/utils/axios";

export const GetInvoices = async (): Promise<
	AxiosResponse<ResponseGetInvoices>
> => {
	return await axiosInstance.get("/invoices");
};

export const DownloadXlsInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseXlsInvoice>> => {
	return await axiosInstance.get(`/invoice/download-excel/${id}`, {
		responseType: "blob",
	});
};
export const DownloadPdfInvoice = async (
	id: string
): Promise<AxiosResponse<ResponseXlsInvoice>> => {
	return await axiosInstance.get(`/invoice/download-pdf/${id}`, {
		responseType: "blob",
	});
};
export const GetInvoiceById = async (
	id: string
): Promise<AxiosResponse<ResponseInvoiceById>> => {
	return await axiosInstance.get(`/invoice/items/${id}`);
};
export const UpdateInvoice = async (
	data: RequestUpdateInvoice,
	id: string
): Promise<AxiosResponse<ResponseInvoiceById>> => {
	return await axiosInstance.put(`/invoices/${id}`, data);
};
