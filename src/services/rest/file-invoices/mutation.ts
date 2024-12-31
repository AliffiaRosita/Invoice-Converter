"use client";
import { AxiosResponse } from "axios";
import {
	ResponseDownloadInvoice,
	ResponseGenerateInvoice,
	ResponseGetInvoices,
} from "./types";
import {
	DeleteInvoice,
	DownloadInvoice,
	GenerateInvoice,
	GetInvoices,
	UploadInvoice,
} from "./request";
import { useMutation } from "react-query";

export const useGetInvoices = () =>
	useMutation({
		mutationFn: async (): Promise<AxiosResponse<ResponseGetInvoices>> =>
			await GetInvoices(),
	});
export const useGenerateInvoice = () =>
	useMutation<AxiosResponse<ResponseGenerateInvoice>, Error, string>({
		mutationFn: async (id: string) => GenerateInvoice(id),
	});

export const useDownloadInvoice = () =>
	useMutation({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseDownloadInvoice>> =>
			await DownloadInvoice(id),
	});

export const useDeleteInvoice = () =>
	useMutation({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseGetInvoices>> =>
			await DeleteInvoice(id),
	});

export const useUploadInvoice = () =>
	useMutation<AxiosResponse, Error, FormData>({
		mutationFn: async (formData: FormData): Promise<AxiosResponse> => {
			return UploadInvoice(formData);
		},
	});
