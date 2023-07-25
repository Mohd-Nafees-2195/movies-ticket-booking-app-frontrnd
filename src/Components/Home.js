import React,{useEffect} from "react";

import {Card, Container, Button, CardGroup, Pagination, PaginationItem,PaginationLink} from "reactstrap";
import Movie from "./Movie";
import Logout from "./Logout";
import { useNavigate } from 'react-router-dom';

const Home=()=>{


    //const history = useHistory();
    const redirect=useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")===null){
            redirect("/")
        }
      }, []); 

    
   

      return (
          <div>
            <Logout></Logout>
            <Pagination>
                <PaginationItem disabled>
                    <Movie number="https://picsum.photos/318/182" movieName="RRR" movieTitle="South Indian Movie"/>
                </PaginationItem>
                <PaginationItem disabled>
                    <Movie number="https://picsum.photos/318/183" movieName="Ram Setu" movieTitle="Bolliwood Movie"/>
                </PaginationItem>
                <PaginationItem >
                    <Movie number="https://picsum.photos/318/184" movieName="Sinister" movieTitle="Horror Movie"/>
                </PaginationItem>
            </Pagination>
        </div>
    );
}
export default Home;