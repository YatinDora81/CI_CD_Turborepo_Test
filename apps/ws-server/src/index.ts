import {WebSocket,  WebSocketServer} from "ws"
import {prismaClient} from "@repo/db/db"

const wss = new WebSocketServer({port: 3002} , ()=>{
    console.log("WS Connected Successfully");
})

wss.on("connection",(ws : WebSocket , request)=>{
    // ws.on("open",()=>{
    //     ws.send("hello ji aa gye aap")
    // })
    ws.send("hello ji aa gye aap")
    ws.on("message", async(ev)=>{
        ws.send("yeh bhejoge app ab" + ev.toString())
        const d = await prismaClient.user.create({
            data : {
                name : "Yat" + Math.random(),
                pass : "Aas" + Math.random(),
                age : Math.random() + Math.random()  
            }
        })
        ws.send(JSON.stringify(d));
    })
    ws.on("close",()=>{
        ws.send("Tusi jaa rhe ho paaji!!!")
        console.log("Paaji chale gye!!!");
        
    })
})