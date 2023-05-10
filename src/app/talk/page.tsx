import kv from "@vercel/kv";
import dynamic from "next/dynamic";

const P2PCall = dynamic(() => import("@/components/P2PCall"), {
	ssr: false
});

export default function Talk() {
	async function fetchID(selfId: string): Promise<string | false> {
		"use server";

		const id = await kv.rpop("tqueue");
		if (!id) {
			await kv.lpush("tqueue", selfId);
			return false;
		}
		return id;
	}
	return (
		<>
			<P2PCall id={fetchID} />
		</>
	);
}
