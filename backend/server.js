import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import mangaRouter from './router/manga.router.js'
import authRouter from './router/auth.router.js'
import genreRouter from './router/genre.router.js'

dotenv.config()

const PORT = process.env.PORT || 7000
const app = express()

app.use(express.json()) 
// chuyển đổi kết quả thành dạng json nè 

app.use('/api/user',authRouter)
app.use('/api/manga',mangaRouter)
app.use('/api/genre',genreRouter)

app.listen(PORT , () => {
    connectDB()
    console.log(`Server run at http://localhost:${PORT}`);
})
