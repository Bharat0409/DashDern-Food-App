import express from "express"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import foodData from "./routes/data.routes.js"
import orderData from "./routes/order.routes.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/api", userRouter)
app.use("/api", foodData)
app.use("/api", orderData)

export { app }