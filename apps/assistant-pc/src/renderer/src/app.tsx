import React from 'react'
// todo: BrowserRouter 不可以用于electron 程序内部（但不影响express路由）
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './home'
// import CardGen from './components/CardGen'
// Import other components as needed

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/card/gen" element={<CardGen />} />*/}
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  )
}

export default App
