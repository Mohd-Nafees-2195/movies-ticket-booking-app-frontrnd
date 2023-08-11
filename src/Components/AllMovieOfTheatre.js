import React, { useEffect, useState } from "react";
import NavBarMovie from "./NavBarMovie";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Services/Config";

const AllMovieOfTheatre=()=>{

  const {id}=useParams();
  localStorage.setItem('theaterId',id);
  const redirect=useNavigate();
  const [movies,setmovies]=useState([]);

  //console.log(id);

  const authAxios=axios.create({
     baseURL:BASE_URL,
     headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
     }
   })

   useEffect(() => {

    if(localStorage.getItem("token")===null){
        redirect("/")
    }

    loadMovies();
  }, []); 

  //  useEffect(()=>{
  //   if(localStorage.getItem("token")===null){
  //     redirect("/")
  //   }
    
  //   loadMovies();
  //  },[]);

   const loadMovies=()=>{
     if(id>0){
      console.log("Id is "+id);
       authAxios.get(`/admin/get-all-movies?id=${id}`).then(
        (response)=>{
          console.log(response);
          setmovies(response.data);
        },(error)=>{
          console.log(error);
        }
       );
     }else{
      console.log("Id is Negative");
     }
   }

  const fetchMoreData=()=>{
 
   }

    return(
       <div>
         <div>
           <NavBarMovie/>
         </div>
          
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMoreData}
            style={{ display: 'flex',gap: '20px',flexWrap: 'wrap',justifyContent: 'left' }} //To put endMessage and loader to the top.
            //inverse={true} //
            hasMore={false}
            loader={<h4>Loading...</h4>}
            //scrollableTarget="scrollableDiv"
            >

            {
                movies.length>0
                ? movies.map(
                    (movie)=>
                        <MovieCard key={movie.id} newMovie={movie}/>
                )
                :"No Data"
            }


            </InfiniteScroll>
        
       </div>
    );
}
export default AllMovieOfTheatre;