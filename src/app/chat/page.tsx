import kv from "@vercel/kv";
import dynamic from "next/dynamic";

const P2PChat = dynamic(() => import("@/components/P2PChat"), {
	ssr: false
});

export default function Talk() {
	async function fetchID(selfId: string): Promise<string | false> {
		"use server";

		const id = await kv.rpop("queue");
		if (!id) {
			await kv.lpush("queue", selfId);
			return false;
		}
		return id;
	}

	return <P2PChat id={fetchID} />;
}
