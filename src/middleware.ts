import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(request: NextRequest) {
	const res = NextResponse.next();
	return res;
}

export default withAuth(mainMiddleware, [
	"/",
	"/report",
	"/user",
	"/user/create",
	"/user/edit/:id",
	"/items",
	"/items/:id",
	"/items/edit/:id",
	"/invoice",
	"/invoice/edit/:id",
]);
