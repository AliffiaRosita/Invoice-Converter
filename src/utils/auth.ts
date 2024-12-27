import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "./axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

function decodeToken(token: JWT, user: any) {
	const decodedAccToken = jwt.decode(user.accessToken);

	if (decodedAccToken && typeof decodedAccToken !== "string") {
		token.id = decodedAccToken.id;
		token.email = decodedAccToken.email;
		token.name = decodedAccToken.name;
		token.accessToken = user.accessToken;
		token.accessTokenExp = decodedAccToken.exp;
		token.isAdmin = decodedAccToken.isAdmin;
	}
	if (user.refreshToken) {
		const decodedRefToken = jwt.decode(user.refreshToken);

		if (decodedRefToken && typeof decodedRefToken !== "string") {
			token.refreshToken = user.refreshToken;
			token.refreshTokenExp = decodedRefToken.exp
				? decodedRefToken.exp
				: 0;
		}
	}
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
					const response = await fetch(`${baseUrl}/auth/signin`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
							isAdmin: true,
						}),
					});
					const data = await response.json();

					if (response.ok) {
						return {
							accessToken: data.authorization.accessToken,
							refreshToken: data.authorization.refreshToken,
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
		async signIn({ user }) {
			if (user?.error) {
				throw new Error(user.error);
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token = decodeToken(token, user);
			}
			if (Date.now() > token.accessTokenExp * 1000) {
				const response = await axiosInstance(`/auth/refresh-token`, {
					method: "POST",
					data: { refreshToken: token.refreshToken },
				});
				const data = await response.data.data;
				console.log("ini response refresh token", data);
				if (response.status === 200) {
					token = decodeToken(token, data);
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					id: token.id,
					email: token.email,
					name: token.name,
					accessToken: token.accessToken,
					accessTokenExp: token.accessTokenExp,
					refreshToken: token.refreshToken,
					refreshTokenExp: token.refreshTokenExp,
					onboarded: token.onboarded,
					isEmailVerified: token.isEmailVerified,
				};
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/sign-in",
	},
};
