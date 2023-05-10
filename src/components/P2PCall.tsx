"use client";

import { usePathname } from "next/navigation";
import Peer, { MediaConnection } from "peerjs";
import { useCallback, useEffect, useRef, useState } from "react";
interface P2PCallProps {
	id: (selfId: string) => Promise<string | false>;
}

export default function P2PCall(props: P2PCallProps) {
	const [id, setID] = useState<string>();
	const [peer, setPeer] = useState<Peer>(new Peer());
	const [connection, setConnection] = useState<MediaConnection>();
	const callerRef = useRef<HTMLVideoElement>(null);
	const selfRef = useRef<HTMLVideoElement>(null);

	const pathname = usePathname();

	const getUserMedia = ((navigator: any) =>
		navigator.mediaDevices?.getUserMedia.bind(navigator.mediaDevices) ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia)(navigator);

	const onClose = useCallback(() => {
		setPeer(new Peer());
		setConnection(undefined);
		if (callerRef.current) {
			callerRef.current.srcObject = null;
			callerRef.current.pause();
		}
	}, []);

	const onAnswer = useCallback(
		(connection: MediaConnection, stream: MediaStream) => {
			setConnection(connection);
			if (callerRef.current) {
				callerRef.current.srcObject = stream;
				callerRef.current.play();
			}
			connection.on("close", onClose);
		},
		[onClose]
	);

	const answerCall = useCallback(
		async (connection: MediaConnection) => {
			const stream = await getUserMedia({ video: true, audio: true });

			connection.answer(stream);
			connection.on("stream", stream => {
				onAnswer(connection, stream);
			});
		},
		[getUserMedia, onAnswer]
	);

	const onConnect = useCallback(
		async (id: string) => {
			const stream = await getUserMedia({ video: true, audio: true });

			const cid = await props.id?.(id);
			setID(id);
			if (cid) {
				const connection = peer.call(cid, stream);
				connection.on("stream", stream => {
					onAnswer(connection, stream);
				});
			}
		},
		[getUserMedia, props, peer, onAnswer]
	);

	useEffect(() => () => connection?.close(), [connection, pathname]);

	useEffect(() => {
		getUserMedia({ video: true, audio: true }).then(
			(stream: MediaStream) => {
				if (selfRef.current) {
					selfRef.current.srcObject = stream;
				}
			}
		);
	}, [getUserMedia]);

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
		peer.on("open", async id => {
			await onConnect(id);
		});
		peer.on("disconnected", () => {
			onClose();
		});
	}, [id, onClose, onConnect, peer, props]);

	useEffect(() => {
		peer.on("call", connection => {
			answerCall(connection);
		});
	}, [answerCall, peer]);

	return (
		<>
			<div className="flex h-full flex-col items-center justify-center">
				<video
					ref={selfRef}
					className="aspect-video w-full max-w-xl rounded-t-md object-cover"
					autoPlay
					playsInline
					muted></video>
				{/* <button
                    className="btn-secondary btn h-full text-4xl flex-1"
                    onClick={() => {
                        // connection?.close();
                    }}>
                    🎲
                </button> */}
				<video
					ref={callerRef}
					className="aspect-video w-full max-w-xl rounded-b-md object-cover"
					autoPlay
					playsInline></video>
			</div>
		</>
	);
}
