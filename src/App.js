import { BrowserRouter as Router } from 'react-router-dom'

import { Routes } from './routes'
import TopBar from './components/TopBar'
import { CurrentUserProvider } from './contexts/currentUser'
import CurrentUserChecker from './components/CurrentUserChecker'

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  )
}

export default App
