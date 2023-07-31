import React,{useEffect,useState} from "react";

import {Card, Container, Button, CardGroup, Pagination, PaginationItem,PaginationLink} from "reactstrap";
import Movie from "./Movie";
import Logout from "./Logout";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../Services/Config";
import axios from "axios";


const Home=()=>{

    const redirect=useNavigate();
    const [movies, setMovies] = useState([]);
    const [imageData,setImageData]=useState('');
    const start=0;
    const end=1;

    //Creating request with authorization header
    const authAxios=axios.create({
        baseURL:BASE_URL,
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    //  axios.interceptors.request.use(
    //     config=>{
    //         config.headers.authorization=`Bearer ${localStorage.getItem("token")}`;
    //         return config;
    //     },
    //     error=>{
    //         return Promise.reject(error);
    //     }
    //  )
    
    useEffect(() => {

        if(localStorage.getItem("token")===null){
            redirect("/")
        }

        loadMovies();
      }, []); 

      const loadMovies=()=>{
        authAxios.get(`/user/get-all-movie?start=${start}&end=${end}`).then(
            (Response)=>{
                console.log(Response.data.imageData);
                setMovies(Response.data);
            },(error)=>{
                console.log(error);
            }
        );
      }
    
   
 
      return (
          <div>
            <Logout></Logout>
            <Pagination>
                {
                    movies.length>0
                    ? movies.map(
                        (movie)=>
                            //console.log(movie.movieName);
                            <Movie newMovie={movie}/>
                        //<PaginationItem >
                           
                       // </PaginationItem>
                     )
                    :"No Data"
                }
                
               
            </Pagination>
        </div>
    );
}
export default Home;