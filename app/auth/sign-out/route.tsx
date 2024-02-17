import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest) {
	req.cookies.delete("refresh-token")
	return new NextResponse(null, {
		status: 302,
		headers: {
			Location: `${process.env.NEXT_PUBLIC_APP_URL}/auth`,
			"Set-Cookie": "refresh-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;",
		},
	})
}
