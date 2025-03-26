"use client";
import { AxiosResponse } from "axios";

import {
	DeleteInvoice,
	DownloadInvoice,
	GenerateInvoice,
	GetInvoiceById,
	GetInvoices,
	UploadInvoice,
} from "./request";
import { useMutation } from "react-query";
import {
	ResponseDownloadFileInvoice,
	ResponseGenerateFileInvoice,
	ResponseGetFileInvoices,
} from "./types";
import { ResponseGetInvoices } from "../invoices/type";

export const useGetInvoices = () =>
	useMutation({
		mutationFn: async (): Promise<AxiosResponse<ResponseGetFileInvoices>> =>
			await GetInvoices(),
	});
export const useGetInvoiceById = () =>
	useMutation({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseGetInvoices>> =>
			await GetInvoiceById(id),
	});
export const useGenerateInvoice = () =>
	useMutation<AxiosResponse<ResponseGenerateFileInvoice>, Error, string>({
		mutationFn: async (id: string) => GenerateInvoice(id),
	});

export const useDownloadInvoice = () =>
	useMutation({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseDownloadFileInvoice>> =>
			await DownloadInvoice(id),
	});

export const useDeleteInvoice = () =>
	useMutation({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseGetFileInvoices>> =>
			await DeleteInvoice(id),
	});

export const useUploadInvoice = () =>
	useMutation<AxiosResponse, Error, FormData>({
		mutationFn: async (formData: FormData): Promise<AxiosResponse> => {
			return UploadInvoice(formData);
		},
	});
