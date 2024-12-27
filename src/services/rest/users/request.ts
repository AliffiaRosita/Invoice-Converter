import axiosInstance from "@/utils/axios";
import { AxiosResponse } from "axios";
import { RequestCreateUser } from "./type";

export const CreateUser = async (
	data: RequestCreateUser
): Promise<AxiosResponse> => {
	return await axiosInstance.post(`/users`, data);
};

export const GetUsers = async (): Promise<AxiosResponse> => {
	return await axiosInstance.get(`/users`);
};

export const DetailUser = async (id: string): Promise<AxiosResponse> => {
	return await axiosInstance.get(`/users/${id}`);
};

export const UpdateUser = async (
	data: RequestCreateUser,
	id?: string
): Promise<AxiosResponse> => {
	return await axiosInstance.put(`/users/${id}`, data);
};
export const DeleteUser = async (id: string): Promise<AxiosResponse> => {
	return await axiosInstance.delete(`/users/${id}`);
};
