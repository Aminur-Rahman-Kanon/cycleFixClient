import { useState, createContext } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/homepage';
import Topbar from './Components/Topbar/topbar';
import SideDrawer from './Components/SideDrawer/sideDrawer';
import Backdrop from './Components/Backdrop/backdrop';
import Footer from './Components/Footer/footer';
import Login from './Components/Login/login';
import Registration from './Components/Registration/registration';
import Accident from './Components/Accident/accident';
import DefaultRoute from './Components/Others/DefaultRoute/defaultRoute';
import WorkshopPriceList from './Components/WorkshopPriceList/workshopPriceList';
import Xiaomi from './Components/Xiaomi/xiaomi';
import CourtesyBike from './Components/CourtesyBike/courtesyBike';
import Contact from './Components/Contact/contact';
import Booking from './Components/Booking/booking';
import BookAservice from './Components/BookAservice/bookAservice';
import PaymentContainer from './Payment/paymentContainer';
import Feedback from './Components/Feedback/feedback';

export const LoggedInUsers = createContext(null);

function App() {

  const [sideDrawer, setSideDrawer] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  if (!loggedInUser){
    if (Object.keys(sessionStorage).includes('loggedInUser')){
      const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
      setLoggedInUser(user);
    }
  }

  // console.log(Object.keys(sessionStorage).includes('loggedInUser'));

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
      <LoggedInUsers.Provider value={ loggedInUser }>
        <Backdrop backdrop={backdrop} toggleBackdrop={ closeSideDrawer } />
        <Topbar toggleSideDrawer={ openSideDrawer } />
        <SideDrawer sideDrawer={sideDrawer}/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/cycling-accident" element={<Accident />} />
          {sessionStorage.key(0) === 'loggedInUser' ? null : <Route path='/login' element={<Login />}/> }
          {sessionStorage.key(0) === 'loggedInUser' ? null : <Route path='/register' element={<Registration />}/> }
          <Route path='/workshop-price-list' element={<WorkshopPriceList /> }/>
          <Route path='/xiaomi-e-scooter' element={<Xiaomi />} />
          <Route path='/courtesy-bike' element={<CourtesyBike />} />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/book-service' element={<BookAservice />}/>
          <Route path='/book-service/:serviceId/:packagePrice' element={<Booking />} />
          <Route path='/payment' element={<PaymentContainer />}/>
          <Route path='/feedback' element={<Feedback />}/>
          <Route path='*' element={<DefaultRoute />}/>
        </Routes>
        <Footer />
      </LoggedInUsers.Provider>
    </div>
  );
}

export default App;
