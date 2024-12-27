import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import {
	RequestCreateUser,
	ResponseDetailUsers,
	ResponseGetUsers,
} from "./type";
import {
	CreateUser,
	DeleteUser,
	DetailUser,
	GetUsers,
	UpdateUser,
} from "./request";

export const useGetUsers = () =>
	useMutation<AxiosResponse, Error, undefined>({
		mutationFn: async (): Promise<AxiosResponse<ResponseGetUsers>> => {
			return GetUsers();
		},
	});

export const useCreateUser = () =>
	useMutation<AxiosResponse, Error, RequestCreateUser>({
		mutationFn: async (data: RequestCreateUser): Promise<AxiosResponse> => {
			return CreateUser(data);
		},
	});

export const useDetailUser = () =>
	useMutation<AxiosResponse, Error, string>({
		mutationFn: async (
			id: string
		): Promise<AxiosResponse<ResponseDetailUsers>> => {
			return DetailUser(id);
		},
	});
export const useUpdateUser = () =>
	useMutation<AxiosResponse, Error, { data: RequestCreateUser; id?: string }>(
		{
			mutationFn: async ({ data, id }): Promise<AxiosResponse> => {
				return UpdateUser(data, id);
			},
		}
	);

export const useDeleteUser = () =>
	useMutation<AxiosResponse, Error, string>({
		mutationFn: async (id: string): Promise<AxiosResponse> => {
			return DeleteUser(id);
		},
	});
