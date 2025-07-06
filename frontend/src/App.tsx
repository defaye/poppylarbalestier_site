import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Page from './pages/Page'
import './App.css'

function App() {
  return (
    <div id="app" className="d-flex flex-column min-vh-100">
      <div id="top-wrapper" className="flex-grow-1">
        <Header />
        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<Page />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
