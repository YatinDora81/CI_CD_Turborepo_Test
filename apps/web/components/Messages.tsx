"use client"

import { useEffect } from "react"

function Messages({messages : message}:{messages:String[]}) {

    useEffect(()=>{
        const scrollContainer = document.querySelector('.custom-scroll');
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    } , [message])

    return (
        <div className="bg-zinc-900 custom-scroll overflow-y-auto  w-full h-screen flex flex-col justify-center items-center gap-4 text-white" style={{paddingBlock : "2rem"}}>
            {
                message.map((m,i)=><div key={i} className=' flex justify-start items-start gap-3 break-words  w-[90%]'><span>{i+1}</span><span className=" break-words break-all">{m}</span></div>)
            }
        </div>
    )
}

export default Messages
