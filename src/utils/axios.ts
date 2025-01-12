import axios, { AxiosInstance } from "axios";
import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const session: any = await getSession();

		if (session && session.user.token) {
			config.headers.Authorization = `Bearer ${session.user.token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const session: any = await getSession();
		if (error.response && error.response.status === 401) {
			session.user = null;
			session.token = null;
			await signOut({ callbackUrl: "/authentication/login" });
		}
		return Promise.reject(error);
	}
);
export default axiosInstance;
