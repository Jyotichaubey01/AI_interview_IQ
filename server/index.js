
import express from "express"
import dotenv from "dontenv"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 6000

app.get("/", (req, res)=>{
    return res.json({message:"server started"})
})

app.listen(PORT , ()=>{
    console.log(`server runnning on port ${PORT}`)
})