import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import mangaRouter from './router/manga.router.js'
import authRouter from './router/auth.router.js'
import genreRouter from './router/genre.router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT || 7000
const app = express()

app.use(cors())
app.use(express.json()) 
// chuyển đổi kết quả thành dạng json nè 
app.use(cookieParser())

app.use('/api/user',authRouter)
app.use('/api/manga',mangaRouter)
app.use('/api/genre',genreRouter)

app.listen(PORT , () => {
    connectDB()
    console.log(`Server run at http://localhost:${PORT}`);
})
