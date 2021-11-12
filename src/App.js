import { BrowserRouter } from 'react-router-dom'

import { Routes } from './routes'
import TopBar from './components/topBar'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes />
    </BrowserRouter>
  )
}

export default App
