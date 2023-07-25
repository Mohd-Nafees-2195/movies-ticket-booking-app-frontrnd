//import React,{useEffect,useState} from "react";
import { Col, Container,Row } from 'reactstrap';
import './App.css';
//import Login from "./Login/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Menus from './Components/Menus';
import Register from "./Components/Register";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Login from './Login/Login';
import ResetPassword from './Components/ResetPassword';
import VerifyOTP from './Components/VerifyOTP';

// import Movie from "./Components/Movie";
// import axios from "axios";

function App() {
    // const [coinsData,setCoinsData] = useState([]);
    // const [currentPage,setCurrentPage]=useState(1);


    // useEffect(async ()=>{
    //     //const response=await axios.get("");
    //
    //     //setCoinsData(response.data);
    // },[]);
  return (
    <div className="App">

      <Router>
        <ToastContainer/>
        <Container>
        <Header/>
          <Row>
            <Col md={2}> 
              <Menus/>
            </Col>
            <Col md={10}>
              <Routes>
                <Route path='/' Component={Login} exact/>
                <Route path='/home' Component={Home} exact/>
                <Route path='/register' Component={Register} exact/>
                
                <Route path='/resetpassword' Component={ResetPassword} exact/>
                <Route path='/verifyotp' Component={VerifyOTP} exact/>
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
