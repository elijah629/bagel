import BottomNav from "@/components/layout/BottomNav";
import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Bagel",
	description: "Connect with anyone!",
	icons: {
		apple: "/apple-touch-icon.png",
		icon: [
			{ sizes: "32x32", url: "/favicon-32x32.png" },
			{ sizes: "16x16", url: "/favicon-16x16.png" }
		]
	},
	viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
	manifest: "/manifest.json"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={clsx(
					"flex flex-col gap-3 p-0 sm:p-3",
					inter.className
				)}>
				<Navbar />
				<main className="scrollable p-3 sm:p-0">{children}</main>
				<BottomNav />
				<Analytics />
			</body>
		</html>
	);
}
