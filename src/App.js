
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/home';
import StudentData from './pages/StudentData';
import Footer from './components/Footer';



function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/admin' element={<StudentData/>} />
    </Routes>
   <Footer/>
    </>
  );
}

export default App;
