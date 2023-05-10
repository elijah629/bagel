"use client";

import { usePathname } from "next/navigation";
import Peer, { DataConnection } from "peerjs";
import { useCallback, useEffect, useRef, useState } from "react";

interface P2PChatProps {
	id: (selfId: string) => Promise<string | false>;
}

type Message = {
	left: boolean;
	content: string;
};

export default function P2PChat(props: P2PChatProps) {
	const [id, setID] = useState<string>();
	const [cID, setCID] = useState<string>();
	const [peer, setPeer] = useState<Peer>(new Peer());
	const [connection, setConnection] = useState<DataConnection>();
	const [messages, setMessages] = useState<Message[]>([]);
	const messageRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	const onData = useCallback((data: unknown) => {
		setMessages(messages => [
			...messages,
			{ left: true, content: data as string }
		]);
	}, []);

	const onClose = useCallback(() => {
		setCID(undefined);
		setPeer(new Peer());
		setConnection(undefined);
		setMessages([]);
	}, []);

	const onConnection = useCallback(
		(connection: DataConnection) => {
			setCID(connection.peer);
			setConnection(connection);
			connection.on("data", onData);
			connection.on("close", onClose);
		},
		[onClose, onData]
	);

	const onConnect = useCallback(
		async (id: string) => {
			const cid = await props.id?.(id);
			setID(id);
			if (cid) {
				const connection = peer.connect(cid);
				connection.on("open", () => {
					onConnection(connection);
				});
			}
		},
		[props, peer, onConnection]
	);

	useEffect(() => () => connection?.close(), [connection, pathname]);

	useEffect(() => {
		const beforeunload = () => {
			connection?.close();
			return null;
		};

		const visibilityChange = () => {
			const isVisible = document.visibilityState === "visible";
			if (!isVisible) connection?.close();
		};

		document.addEventListener("visibilitychange", visibilityChange);
		window.addEventListener("beforeunload", beforeunload);

		return () => {
			window.removeEventListener("beforeunload", beforeunload);
			document.removeEventListener("visibilitychange", visibilityChange);
		};
	}, [connection]);

	useEffect(() => {
		if (messageRef.current) {
			messageRef.current.scrollTop = messageRef.current.scrollHeight;
		}
	}, [messages.length]);

	useEffect(() => {
		peer.on("open", async id => {
			await onConnect(id);
		});
		peer.on("disconnected", () => {
			onClose();
		});
	}, [onConnect, id, peer, props, onClose]);

	useEffect(() => {
		peer.on("connection", connection => {
			onConnection(connection);
		});
	}, [onConnection, peer]);

	return (
		<div className="flex h-full flex-col">
			<div
				className="scrollable flex-1 overflow-auto"
				ref={messageRef}>
				{messages.map((m, i) => (
					<div
						key={i}
						className={`chat ${
							m.left ? "chat-start" : "chat-end"
						}`}>
						<div className="chat-bubble">{m.content}</div>
					</div>
				))}
			</div>
			<div className="flex gap-2 p-2">
				<input
					type="text"
					placeholder="Message"
					className="input flex-1 bg-neutral"
					autoFocus
					disabled={!cID}
					onKeyDown={e => {
						const target = e.target as HTMLInputElement;
						const message = target.value.trim();
						if (e.key === "Enter" && message !== "" && cID) {
							connection?.send(message);
							setMessages([
								...messages,
								{
									left: false,
									content: message
								}
							]);
							target.value = "";
						}
					}}
				/>
				<button
					className="btn-secondary btn h-full text-xl"
					onClick={() => {
						connection?.close();
					}}>
					🎲
				</button>
			</div>
		</div>
	);
}
