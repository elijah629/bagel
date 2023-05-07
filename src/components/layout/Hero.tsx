import Link from "next/link";

export default function Hero() {
	return (
		<div className="hero h-full">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">BagelChat</h1>
					<p className="py-6">Talk to anyone!</p>
					<Link
						href={"talk"}
						className="btn-primary btn">
						Get Talking
					</Link>
				</div>
			</div>
		</div>
	);
}
