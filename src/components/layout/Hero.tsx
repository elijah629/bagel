import Link from "next/link";

export default function Hero() {
	return (
		<div className="hero h-full">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Bagel</h1>
					<p className="py-6">Connect with anyone!</p>
					<div className="flex gap-2">
						<Link
							href={"chat"}
							className="btn-primary btn">
							Get Chatting
						</Link>
						<Link
							href={"talk"}
							className="btn-primary btn">
							Get Talking
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
