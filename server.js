// server.js
import next from 'next'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { parse } from 'url'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('🔌 User connected')

    socket.on('message', (msg) => {
      socket.broadcast.emit('message', msg)
    })

    socket.on('disconnect', () => {
      console.log('❌ User disconnected')
    })
  })

  const PORT = 3001
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
})
