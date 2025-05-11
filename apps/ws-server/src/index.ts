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
        let d
        try {
            d = await prismaClient.user.create({
            data : {
                name : "Yat" + Math.random(),
                pass : "Aas" + Math.random(),
                age : Math.floor(Math.random() * (60 - 18 + 1)) + 18
            }
        })
        } catch (error) {
            console.log("Error at creating datat in db" , error);
            
        }
        ws.send(JSON.stringify(d));
    })
    ws.on("close",()=>{
        ws.send("Tusi jaa rhe ho paaji!!!")
        console.log("Paaji chale gye!!!");
        
    })
})