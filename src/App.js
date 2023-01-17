import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/homepage';
import Topbar from './Components/Topbar/topbar';
import SideDrawer from './Components/SideDrawer/sideDrawer';
import Backdrop from './Components/Backdrop/backdrop';
import Footer from './Components/Footer/footer';
import Accident from './Components/Accident/accident';
import { connect } from 'react-redux';

function App(props) {


  return (
    <div className="App">
      <Backdrop />
      <Topbar />
      <SideDrawer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/cycling-accident" element={<Accident />} />
      </Routes>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    backdrop: state.backdrop
  }
}

export default connect( mapStateToProps ) (App);
