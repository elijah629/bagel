import Navbar from "@/components/layout/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

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
	manifest: "/manifest.json"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`flex flex-col gap-3 p-2 ${inter.className}`}>
				<Navbar />
				<main className="scrollable">{children}</main>
				<Analytics />
			</body>
		</html>
	);
}
