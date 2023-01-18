import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/homepage';
import Topbar from './Components/Topbar/topbar';
import SideDrawer from './Components/SideDrawer/sideDrawer';
import Backdrop from './Components/Backdrop/backdrop';
import Footer from './Components/Footer/footer';
import Login from './Components/Login/login';
import Accident from './Components/Accident/accident';

function App() {

  const [sideDrawer, setSideDrawer] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const closeSideDrawer = () => {
    setBackdrop(false);
    setSideDrawer(false);
  }

  const openSideDrawer = () => {
    setBackdrop(true);
    setSideDrawer(true);
  }

  return (
    <div className="App" style={backdrop ? {overflow: 'hidden', position: 'fixed'} : {overflow: 'auto', position: 'unset'}}>
      <Backdrop backdrop={backdrop} toggleBackdrop={ closeSideDrawer } />
      <Topbar toggleSideDrawer={ openSideDrawer }/>
      <SideDrawer sideDrawer={sideDrawer}/>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/cycling-accident" element={<Accident />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
