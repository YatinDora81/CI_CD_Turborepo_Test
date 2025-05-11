import express from "express"
import { prismaClient } from "@repo/db/db"
import cors from "cors"

const app = express()

const PORT = 3001

app.use(express.json())
app.use(cors())


app.get("/get",async (req, res) => {
    const usersCount =await prismaClient.user.count()
    res.status(200).json({
        success: true,
        data: usersCount,
        message: "user got successfuly",
        date : new Date()
    })
})

app.post("/post",async (req, res) => {
    const { name, pass, age } = req.body
    const u =await prismaClient.user.create({
        data: {
            name, pass, age
        }
    })
    res.status(200).json({
        success: true,
        data: u,
        message: "user got successfuly"
    })

})

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})