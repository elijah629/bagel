import Navbar from "@/components/layout/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "BagelChat",
	description: "Talk to anyone!",
	icons: {
		apple: "/apple-touch-icon.png",
		icon: [
			{ sizes: "32x32", url: "/favicon-32x32.png" },
			{ sizes: "16x16", url: "/favicon-16x16.png" }
		]
	},
	manifest: "/site.webmanifest"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`flex flex-col ${inter.className}`}>
				<Navbar />
				<main className="scrollable">{children}</main>
			</body>
		</html>
	);
}
