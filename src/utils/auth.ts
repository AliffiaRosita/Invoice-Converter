import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "./axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function decodeToken(token: JWT, user: any) {
	const decodedAccToken = jwt.decode(user.token);

	if (decodedAccToken && typeof decodedAccToken !== "string") {
		token.id = user.user.id;
		token.email = decodedAccToken.email;
		token.name = user.user.name;
		token.role = user.user.role;
		token.accessTokenExpires = Date.now() + 3 * 60 * 60 * 1000;
		token.token = user.token;
	}
	// if (user.refreshToken) {
	// 	const decodedRefToken = jwt.decode(user.refreshToken);

	// 	if (decodedRefToken && typeof decodedRefToken !== "string") {
	// 		token.refreshToken = user.refreshToken;
	// 		token.refreshTokenExp = decodedRefToken.exp
	// 			? decodedRefToken.exp
	// 			: 0;
	// 	}
	// }
	return token;
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: {
					label: "email",
					type: "text",
				},
				password: { label: "Password", type: "password" },
			},

			async authorize(credentials: any, req): Promise<any> {
				if (!credentials?.email || !credentials?.password) return null;
				try {
					const response = await fetch(`${baseUrl}/login`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
					});
					const data = await response.json();

					if (response.ok) {
						return {
							token: data.data.token,
							user: data.data.user,
						};
					} else {
						return {
							error: data.message,
						};
					}
				} catch (e) {
					console.error(e);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user }: any) {
			if (user?.error) {
				throw new Error(user.error);
			}
			return true;
		},
		async jwt({ token, user }: any) {
			if (user) {
				const decodedToken = decodeToken(token, user);
				if (decodedToken) {
					token = decodedToken;
				} else {
					return null;
				}
			}
			if (Date.now() > token.accessTokenExpires) {
				return null;
			}
			// if (Date.now() > token.accessTokenExp * 1000) {
			// 	const response = await axiosInstance(`/auth/refresh-token`, {
			// 		method: "POST",
			// 		data: { refreshToken: token.refreshToken },
			// 	});
			// 	const data = await response.data.data;
			// 	console.log("ini response refresh token", data);
			// 	if (response.status === 200) {
			// 		token = decodeToken(token, data);
			// 	}
			// }
			return token;
		},
		async session({ session, token }: any) {
			if (token) {
				session.user = {
					id: token.id,
					email: token.email,
					name: token.name,
					role: token.role,
					accessTokenExpires: token.accessTokenExpires,
					token: token.token,
				} as {
					id: string;
					email: string;
					name: string;
					role: string;
					accessTokenExpires: number;
					token: string;
				};
			} else {
				return null;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 3 * 60 * 60,
	},
	pages: {
		signIn: "/login",
	},
};
