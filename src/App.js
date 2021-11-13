import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from './routes'
import TopBar from './components/topBar'
import { CurrentUserProvider } from './contexts/currentUser'

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </CurrentUserProvider>
  )
}

export default App
