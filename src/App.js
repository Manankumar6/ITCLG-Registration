
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import StudentData from './pages/StudentData';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';

import ProtectedRoute  from './ProtectiveRoute/ProtectRoute';


function App() {

  return (

    <>
    <Navbar/>
    <Routes>
    <Route element={<ProtectedRoute />}>

    <Route  path='/register' element={<Home/>} />
    </Route>
    <Route path='/' element={<StudentData/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
    </Routes>
   <Footer/>
    </>
  );
}

export default App;
