import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {
  return (
    <Router>
        <div className="App">
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
        </div>
    </Router>
  );
}

export default App;