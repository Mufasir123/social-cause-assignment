'use client'

import { useEffect, useState } from 'react'
import io from 'socket.io-client'

let socket

export default function Home() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket = io()

    socket.on('message', (msg) => {
      setChat((prev) => [...prev, { text: msg, sender: 'other' }])
    })

    return () => socket.disconnect()
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    setChat((prev) => [...prev, { text: message, sender: 'me' }])
    socket.emit('message', message)
    setMessage('')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-4 rounded shadow">
        <h1 className="text-2xl mb-4">💬 Chat App</h1>
        <div className="h-64 overflow-y-auto border p-2 rounded mb-4">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded mb-1 ${
                msg.sender === 'me' ? 'bg-blue-100 text-right' : 'bg-gray-200'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Type a message"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </main>
  )
}
