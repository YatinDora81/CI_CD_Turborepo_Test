"use client"
import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import Send from './Send'
import HttpInput from './HttpInput'
// import { WS_BASE_URL } from '@repo/db/env'

function HomeClient() {
  const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_BASE_URL
  console.log("Ws" + WS_BASE_URL);
  

    const [message, setMessages] = useState<string[]>(["lets start the CI CD😊"])
    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [messageInput, setMessageInput] = useState<string>("")
    const [httpInput, setHttpInput] = useState<string>("")

    const sendMessageHandler = () => {
        if (socket) {
            socket.send(messageInput)
            setMessageInput("")
        }
    }

    useEffect(()=>{
        const ws = new WebSocket(WS_BASE_URL || "")
        ws.onopen = () => {
            setSocket(ws)
            console.log('WebSocket connection established');
        }
        ws.onmessage = (event) => {
            const data = event.data + ""
            console.log(data)
            setMessages((prev) => [...prev, data])
        }
        ws.onclose = () => {
            setSocket(null)
            console.log('WebSocket connection closed');
        }
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        }
    },[])


    return (
    <div className=" bg-zinc-950 w-full h-screen flex justify-center items-center">
      <div className=" w-[50%] h-full">
        <Messages messages={message} />
      </div>
      <div className=" w-[50%] h-screen flex flex-col justify-evenly items-center gap-4 bg-zinc-900">
        <Send messageInput={messageInput} setMessageInput={setMessageInput} sendMessageHandler={sendMessageHandler} />
        <HttpInput httpInput={httpInput} setHttpInput={setHttpInput} setMessages={setMessages} />
      </div>
    </div>
  )
}

export default HomeClient
