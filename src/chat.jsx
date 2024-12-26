import { useEffect, useState } from "react";
import WebSocket from '@tauri-apps/plugin-websocket';


export default function Chat() {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [ws, setWs] = useState();
    const [console, logConsole] = useState("");
    const SERVER = "ws://192.168.0.9:8009";

    const userName = "cafalchio";

    async function sendText(event) {
        event.preventDefault();
        if (text.trim() === "") return;
        const message = {
            user: userName,
            to: "zuca",
            message: text.trim(),
        };
        await sendMessage(message).catch((error) => {
            logConsole(`Failed to send message: ${error.message}`);
        });
        setMessages((prevMessages) => [...prevMessages, message]);
        setText("");
    }

    async function sendMessage(message) {
        if (ws) {
            ws.send(JSON.stringify(message));
        }
    }

    useEffect(() => {
        async function connectWebSocket() {
            try {
                const websocket = await WebSocket.connect(SERVER);
                setWs(websocket);
                setIsConnected(true);
                logConsole("connected");

                websocket.addListener((msg) => {
                    try {
                        const message = JSON.parse(msg.data);
                        setMessages((prevMessages) => [...prevMessages, message]);
                    } catch (error) {
                        setIsConnected(false);
                        setTimeout(connectWebSocket, 1000); 
                    }
                });

                websocket.onerror = (error) => {
                    logConsole(`WebSocket error: ${error.message}`);
                };

                websocket.onclose = () => {
                    setIsConnected(false);
                    logConsole("WebSocket disconnected");
                    setTimeout(connectWebSocket, 1000); 
                };
            } catch (error) {
                logConsole(`Failed to connect WebSocket: ${error.message}`);
                setTimeout(connectWebSocket, 1000); 
            }
        }

        connectWebSocket();

        return () => {
            if (ws) {
                ws.disconnect();
            }
        };
    }, []);


    function handleKey(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();
            sendText(e);
        }
    }

    return (
        <div className="page-container flex flex-col justify-end h-screen p-4">
            <div className="block text-xs font-medium text-gray-700 mb-1 py-1 px-1">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.user === userName ? 'bg-green-400' : 'bg-red-200 border'} rounded-md`}>
                            <strong>{msg.user}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-input">
                <hr />
                <textarea
                    className="w-full resize-none px-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyUp={(e) => handleKey(e)}
                    rows="3"
                    placeholder="Type your message here..."
                ></textarea>
                <div className="text-center px-2 mt-2">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded font-bold shadow-slate-700"
                        onClick={sendText}
                    >
                        Send
                    </button>
                    <div>
                        {isConnected ? (
                            <span className="text-green-500 text-xs">Connected</span>
                        ) : (
                            <span className="text-red-500 text-xs">Disconnected</span>
                        )}
                        <p>{console}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
