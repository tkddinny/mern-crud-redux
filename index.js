import express from 'express'
import { configDotenv } from 'dotenv'
import cors from 'cors'
import connectDb from './config/db.js'
import userRouter from './router/user.Router.js'
import registerRouter from './router/register.Router.js'

const app = express()
configDotenv()
connectDb()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/user' , userRouter)
app.use('/register' , registerRouter)

app.listen(process.env.PORT , () =>{
  console.log(`http://localhost:${process.env.PORT}`)
})