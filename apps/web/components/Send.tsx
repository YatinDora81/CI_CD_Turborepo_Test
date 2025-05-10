import React from 'react';

function Send({
    messageInput,
    setMessageInput,
    sendMessageHandler,
}: {
    messageInput: string;
    setMessageInput: React.Dispatch<React.SetStateAction<string>>;
    sendMessageHandler: () => void;
}) {
    return (
        <div className=" w-full  flex flex-col justify-center items-center px-4 space-y-4 gap-3">
            <h1 className="text-white text-2xl font-bold">WebSocket</h1>
            <div className="flex w-full max-w-md gap-2 bg-zinc-700 p-3 rounded-xl shadow-xl">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessageHandler();
                        }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 w-[80%] h-12 bg-zinc-800 text-white placeholder-zinc-400 px-10 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <button
                    onClick={sendMessageHandler}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 w-[20%] rounded-lg font-semibold shadow-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Send;
