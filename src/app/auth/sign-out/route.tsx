import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest) {
	req.cookies.delete("accessToken")

	return new NextResponse(null, {
		status: 302,
		headers: {
			Location: `${process.env.NEXT_PUBLIC_APP_URL}/auth`,
			"Set-Cookie": "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;",
		},
	})
}
