import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route 
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App ; 