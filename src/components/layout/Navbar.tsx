export default function Navbar() {
	return (
		<nav className="p-2">
			<div className="navbar rounded-xl bg-neutral">
				<h1 className="ml-2 text-xl font-bold normal-case">
					BagelChat
				</h1>
				<div className="ml-auto flex-none">
					<a className="btn-primary btn">Talk</a>
				</div>
			</div>
		</nav>
	);
}
