import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import SweetDelightsMenu from './components/SweetDelightsMenu.jsx' // ✅ Capitalized
import Register from './components/Register.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Register />

      {/* ✅ Add your custom Menu component here */}
      {/* <SweetDelightsMenu /> */}

    </>
  )
}

export default App
