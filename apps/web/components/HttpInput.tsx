import React from 'react'
// import {HTTP_BASE_URL } from "@repo/db/env"

function HttpInput({httpInput, setHttpInput, setMessages} : {
    httpInput: string;
    setHttpInput: React.Dispatch<React.SetStateAction<string>>;
    setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}) {

    const HTTP_BASE_URL = process.env.NEXT_PUBLIC_HTTP_BASE_URL

    const submitHandler = async () => {
        if (httpInput.trim() === '') return;  
        try {
            const response = await fetch(HTTP_BASE_URL+'/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name : httpInput, pass : Math.random().toString(36).slice(2), age : Math.floor(Math.random() * 100) }),
            });
            const data = await response.json();
            console.log(data);
            if(data.success) {
                setMessages((prevMessages) => [...prevMessages,"http" + JSON.stringify(data.data)]);
            
                setHttpInput(''); // Clear the input field after sending
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    const getHttpHandler = async () => {
        try {
            const response = await fetch(HTTP_BASE_URL+'/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data);
            if(data.success) {
                setMessages((prevMessages) => [...prevMessages,"http" + JSON.stringify(data.data) + " " + data.date]);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

  return (
    <div className=" w-full  flex flex-col justify-center items-center px-4 space-y-4 gap-3">
        <h1 className="text-white text-2xl font-bold">HTTP </h1>
        <div className="flex w-full max-w-md gap-2 bg-zinc-700 p-3 rounded-xl shadow-xl">
            <input
                type="text"
                value={httpInput}
                onChange={(e) => setHttpInput(e.target.value)}
                onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitHandler();
                        }
                    }}
                    placeholder="Type your message..."
                    className="flex-1 w-[80%] h-12 bg-zinc-800 text-white placeholder-zinc-400 px-10 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <button
                    onClick={submitHandler}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 w-[20%] rounded-lg font-semibold shadow-md"
                >
                    Send
                </button>
            </div>
            <div className='flex w-full max-w-md gap-2 justify-center items-center p-3 rounded-xl shadow-xl'>
                <button
                    onClick={getHttpHandler}
                    className="bg-blue-500 hover:bg-blue-600 transition text-white px-6  w-[40%] h-12 rounded-lg font-semibold shadow-md"
                    style={{marginTop: '10px'}}
                >
                    Get HTTP Request
                </button>
            </div>
        </div>
    );
}

export default HttpInput