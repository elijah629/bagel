import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="navbar rounded-xl bg-neutral">
			<Link
				href={"/"}
				className="ml-2 text-xl font-bold normal-case">
				Bagel
			</Link>
			<div className="ml-auto flex flex-none gap-2">
				<Link
					href={"chat"}
					className="btn-primary btn">
					Chat
				</Link>
				<Link
					href={"talk"}
					className="btn-primary btn">
					Talk
				</Link>
			</div>
		</nav>
	);
}
