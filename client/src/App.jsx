import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/pages/Login.jsx'
import Register from './components/pages/Register.jsx'
import Home from './components/pages/Home.jsx'
import './index.css';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
