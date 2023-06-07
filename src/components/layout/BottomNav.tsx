"use client";

import { Icon, IconCamera, IconHome, IconMessage } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
	icon: Icon;
	href: string;
	name: string;
};

export default function BottomNav() {
	const pathname = usePathname();

	const items: NavItem[] = [
		{
			icon: IconHome,
			href: "/",
			name: "Home"
		},
		{
			icon: IconMessage,
			href: "/chat",
			name: "Chat"
		},
		{
			icon: IconCamera,
			href: "/talk",
			name: "Talk"
		}
	];

	return (
		<div className="btm-nav static self-end text-primary sm:hidden">
			{items.map((x, i) => {
				const isCurrent = x.href === pathname;
				return (
					<Link
						href={x.href}
						key={i}
						className={clsx(isCurrent && "active")}>
						<x.icon size={24} />
						<span className="btm-nav-label text-xs">{x.name}</span>
					</Link>
				);
			})}
		</div>
	);
}
