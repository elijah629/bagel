import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="p-2">
			<div className="navbar rounded-xl bg-neutral">
				<Link href={"/"} className="ml-2 text-xl font-bold normal-case">
					BagelChat
				</Link>
				<div className="ml-auto flex-none">
					<Link
						href={"talk"}
						className="btn-primary btn">
						Talk
					</Link>
				</div>
			</div>
		</nav>
	);
}
