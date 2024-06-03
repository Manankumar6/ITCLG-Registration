
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import StudentData from './pages/StudentData';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';

import ProtectedRoute  from './ProtectiveRoute/ProtectRoute';

import PromoteAdmin from './components/PromoteAdmin';
import About from './pages/About';


function App() {

  return (

    <>
  
    <Navbar/>
    <Routes>
    <Route element={<ProtectedRoute />}>

    <Route  path='/register' element={<Home/>} />
    <Route path="/initial-admin" element={<PromoteAdmin/>} />
    </Route>

    
    <Route path='/' element={<StudentData/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    </Routes>
   <Footer/>
    </>
  );
}

export default App;
