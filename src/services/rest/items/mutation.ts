import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import {
	RequestUpdateItem,
	ResponseDownloadItems,
	ResponseGetItemById,
	ResponseGetItems,
} from "./types";
import { DownloadItems, GetItemById, GetItems, UpdateItem } from "./request";

export const useGetItems = () =>
	useMutation({
		mutationFn: async (): Promise<AxiosResponse<ResponseGetItems>> =>
			await GetItems(),
	});
export const useDownloadItem = () =>
	useMutation({
		mutationFn: async (): Promise<AxiosResponse<ResponseDownloadItems>> =>
			await DownloadItems(),
	});

export const useGetItemById = () =>
	useMutation<AxiosResponse, Error, string>({
		mutationFn: async (id): Promise<AxiosResponse<ResponseGetItemById>> =>
			await GetItemById(id),
	});
export const useUpdateItem = () =>
	useMutation<AxiosResponse, Error, { data: RequestUpdateItem; id: string }>({
		mutationFn: async ({ data, id }): Promise<AxiosResponse> =>
			await UpdateItem(data, id),
	});
