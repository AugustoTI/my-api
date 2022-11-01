import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import 'express-async-errors'

const server = express()

server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  return res.json({
    message: 'Hello Devs',
  })
})

server.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`)
})
