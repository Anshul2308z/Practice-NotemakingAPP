import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<h1>Login Page</h1>}/>
            <Route path="/register" element={<h1>Register Page</h1>}/>
            <Route path="/dashboard" element={<h1>Dashboard Page</h1>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}
export default App ; 