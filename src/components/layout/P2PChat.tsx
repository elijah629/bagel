"use client";

import Peer, { DataConnection } from "peerjs";
import { useCallback, useEffect, useState } from "react";

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

    const onData = useCallback((data: unknown) => {
        setMessages(messages => [
            ...messages, { left: true, content: data as string }
        ]);
    }, []);

    const onClose = useCallback(() => {
        setCID(undefined);
        setPeer(new Peer())
        setConnection(undefined);
        setMessages([]);
    }, [])

    const onConnection = useCallback((connection: DataConnection) => {
        setCID(connection.peer);
        setConnection(connection);
        connection.on("data", onData);
        connection.on("close", onClose);
    }, [onClose, onData])

    const onConnect = useCallback(async (id: string) => {
        const cid = await props.id?.(id);
        setID(id);
        if (cid) {
            const connection = peer.connect(cid);
            connection.on("open", () => {
                onConnection(connection);
            });
        }
    }, [props, peer, onConnection])


    // Start
    useEffect(() => {
        peer.on("open", async id => {
            await onConnect(id);
        });
        peer.on("disconnected", () => {
            onClose();
        })
    }, [onConnect, id, peer, props, onClose]);

    // Connect
    useEffect(() => {
        peer.on("connection", connection => {
            onConnection(connection);
        });
    }, [onConnection, peer]);

    return (
        <div className="flex h-full flex-col">
            <div className="scrollable flex-1 overflow-auto">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`chat ${m.left ? "chat-start" : "chat-end"
                            }`}
                    ><div className="chat-bubble">{m.content}</div>
                    </div>
                ))}
            </div>
            <div className="flex p-2 gap-2">
                <input
                    type="text"
                    placeholder="Message"
                    className="input bg-neutral flex-1"
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
                <button className="btn btn-secondary text-xl h-full" onClick={() => {
                    connection?.close();
                }}>🎲</button>
            </div>
        </div>
    );
}
