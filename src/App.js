//import React,{useEffect,useState} from "react";
import { ListGroup, Col, Container,Row ,ListGroupItem} from 'reactstrap';
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
import BookTickets from './Components/BookTickets';
import Ticket from './Components/Ticket';
import Logout from './Components/Logout';
import AdminHome from './Components/AdminHome';
import AddTheater from './Components/AddTheater';
import AllMovieOfTheatre from './Components/AllMovieOfTheatre';
import AddNewMovie from './Components/AddNewMovie';
import AllTickets from './Components/AllTickets';
import updateTheater from './Components/UpdateTheater';
import UpdateMovie from './Components/UpdateMovie';

// import Movie from "./Components/Movie";
// import axios from "axios";

//href={ `/book-tickets/${newMovie.movieId}` }

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
      <Header/>
      <Router>
        <ToastContainer/>
        <Container>
        
          <Row>
            {/* <Col md={1}>
            {
                //console.log(localStorage.getItem("token"))
                localStorage.getItem("token")!==null
                ? 
                <ListGroup>
                  <ListGroupItem tag="a" href="/logout">
                    <Logout/>
                  </ListGroupItem>
                </ListGroup>  
                  
                :<Menus/>
              }
            </Col> */}
            <Col>
              <Routes>
                <Route path='/book-tickets/:id' Component={BookTickets}/>
                <Route path='/' Component={Login} exact/>
                <Route path='/home' Component={Home} exact/>
                <Route path='/register' Component={Register} exact/>
                <Route path='/ticket/:id' Component={Ticket} exact/>
                <Route path='/logout' Component={Logout} exact/>
                <Route path='/adminhome/:id' Component={AdminHome} exact/>
                <Route path='/add-theater' Component={AddTheater} exact/>
                <Route path='/all-theater-movie/:id' Component={AllMovieOfTheatre} exact/>
                <Route path='/add-movie' Component={AddNewMovie} exact/>
                <Route path='/all-tickets' Component={AllTickets} exact/> 
                <Route path='/update-theater/:id' Component={updateTheater} exact/>
                <Route path='/update-movie/:id' Component={UpdateMovie} exact/>
                
                
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
