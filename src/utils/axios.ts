import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		// const session = await getSession();
		// if (session && session.user.accessToken) {
		// 	config.headers.Authorization = `Bearer ${session.user.accessToken}`;
		// }
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
