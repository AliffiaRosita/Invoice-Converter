import { getToken } from "next-auth/jwt";
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from "next/server";
import { match } from "path-to-regexp";

const onlyAdminPage = ["/user", "/user/create", "/user/edit/:id"];
export default function withAuth(
	middleware: NextMiddleware,
	requireUrl: string[] = []
) {
	return async (req: NextRequest, next: NextFetchEvent) => {
		const pathname = req.nextUrl.pathname;

		const isAuthenticateRoute = requireUrl.some((route) => {
			const matcher = match(route, { decode: decodeURIComponent });
			return matcher(pathname);
		});

		const isAdminRoute = (path: any) =>
			onlyAdminPage.some((route) => {
				const matcher = match(route, { decode: decodeURIComponent });
				return matcher(path);
			});
		if (isAuthenticateRoute) {
			const token = await getToken({
				req,
				secret: process.env.NEXTAUTH_SECRET,
			});
			if (!token) {
				const url = new URL("/authentication/login", req.url);
				return NextResponse.redirect(url);
			}
			if (token.role === "employee" && isAdminRoute(pathname)) {
				return NextResponse.redirect(new URL("/", req.url));
			}
		}
		return middleware(req, next);
	};
}
