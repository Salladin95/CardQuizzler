// eslint-disable-next-line @typescript-eslint/no-var-requires
const createNextIntlPlugin = require("next-intl/plugin")

const withNextIntl = createNextIntlPlugin("./src/app/i18n/i18n.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
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

module.exports = withNextIntl(nextConfig)
