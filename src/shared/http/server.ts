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

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
