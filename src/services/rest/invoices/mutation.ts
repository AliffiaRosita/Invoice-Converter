import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import {
	RequestUpdateInvoice,
	ResponseGetInvoices,
	ResponseInvoiceById,
	ResponsePdfInvoice,
	ResponseXlsInvoice,
} from "./type";
import {
	DownloadPdfInvoice,
	DownloadXlsInvoice,
	GetInvoiceById,
	GetInvoices,
	UpdateInvoice,
} from "./request";

export const useGetInvoices = () =>
	useMutation({
		mutationFn: async (): Promise<AxiosResponse<ResponseGetInvoices>> =>
			await GetInvoices(),
	});
export const useDownloadXlsInvoice = () =>
	useMutation<AxiosResponse, Error, string>({
		mutationFn: async (id): Promise<AxiosResponse<ResponseXlsInvoice>> =>
			await DownloadXlsInvoice(id),
	});

export const useDownloadPdfInvoice = () =>
	useMutation<AxiosResponse, Error, string>({
		mutationFn: async (id): Promise<AxiosResponse<ResponsePdfInvoice>> =>
			await DownloadPdfInvoice(id),
	});

export const useGetInvoiceById = () =>
	useMutation<AxiosResponse, Error, string>({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseInvoiceById>> =>
			await GetInvoiceById(id),
	});

export const useUpdateInvoice = () =>
	useMutation<
		AxiosResponse,
		Error,
		{ data: RequestUpdateInvoice; id: string }
	>({
		mutationFn: async ({ data, id }): Promise<AxiosResponse> =>
			await UpdateInvoice(data, id),
	});
