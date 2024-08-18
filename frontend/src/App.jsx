import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      app.jsx <br />
      <a href="/login">Login</a> <br />
      <a href="/signup">Signup</a>
    </>
  )
}

export default App
