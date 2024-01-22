/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [],
	},
	async rewrites() {
		return [
			{
				source: "/api/sign-out",
				destination: `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-out`,
			},
			{
				source: "/api/:path*",
				destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
			},
		]
	},
}

module.exports = nextConfig
