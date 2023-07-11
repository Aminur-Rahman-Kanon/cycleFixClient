import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/HomepageMain/homepage';
import Topbar from './Components/Topbar/topbar';
import SideDrawer from './Components/SideDrawer/sideDrawer';
import Backdrop from './Components/Backdrop/backdrop';
import Footer from './Components/Footer/footer';
import Login from './Components/Login/login';
import Registration from './Components/Registration/RegistrationMain/registration';
import Accident from './Components/Accident/AccidentMain/accident';
import DefaultRoute from './Components/Others/DefaultRoute/defaultRoute';
import WorkshopPriceList from './Components/WorkshopPriceList/workshopPriceList';
import Xiaomi from './Components/Xiaomi/xiaomi';
import CourtesyBike from './Components/CourtesyBike/courtesyBike';
import Contact from './Components/Contact/ContactMain/contact';
import Booking from './Components/Booking/BookingMain/booking';
import BookAservice from './Components/BookAservice/BookAServiceMain/bookAservice';
import PaymentContainer from './Payment/paymentContainer';
import Feedback from './Components/Feedback/feedback';
import ForgotPassword from './Components/ForgotPassword/forgotPassword';
import AuthContext from './Components/Others/AuthContext/authContext';

function App() {

  //states to manipulate bacdrop and sideDrawer components
  const [sideDrawer, setSideDrawer] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // if user logged in then save user information in a local variable
  if (!loggedInUser && sessionStorage.getItem('loggedInUser')){
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }

  //method to close sidedrawer
  const closeSideDrawer = () => {
    setBackdrop(false);
    setSideDrawer(false);
  }

  //method to open sidedrawer
  const openSideDrawer = () => {
    setBackdrop(true);
    setSideDrawer(true);
  }

  return (
    <div className="App" style={backdrop ? {overflow: 'hidden', position: 'fixed', width: '100%'} : {overflow: 'hidden', position: 'relative', width: 'auto'}}>
      <AuthContext.Provider value={{loggedInUser, setBackdrop}}>
        <Backdrop backdrop={backdrop} toggleBackdrop={ closeSideDrawer } />
        <Topbar toggleSideDrawer={ openSideDrawer } />
        <SideDrawer sideDrawer={sideDrawer}/>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path="/cycling-accident" element={<Accident />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/reset-password' element={<ForgotPassword />} />
          <Route path='/workshop-price-list' element={<WorkshopPriceList /> }/>
          <Route path='/workshop-price-list/:services' element={<WorkshopPriceList /> }/>
          <Route path='/xiaomi-e-scooter' element={<Xiaomi />} />
          <Route path='/courtesy-bike' element={<CourtesyBike />} />
          <Route path='/contact' element={ <Contact /> } />
          <Route path='/contact/:query' element={ <Contact /> } />
          <Route path='/book-service' element={<BookAservice />}/>
          <Route path='/book-service/:booking' element={<BookAservice />}/>
          <Route path='/book-service/:serviceId/:packagePrice' element={<Booking />} />
          <Route path='/payment' element={<PaymentContainer />}/>
          <Route path='/feedback' element={<Feedback />}/>
          <Route path='*' element={<DefaultRoute />}/>
        </Routes>
        <Footer />
        </AuthContext.Provider>
    </div>
  );
}

export default App;
