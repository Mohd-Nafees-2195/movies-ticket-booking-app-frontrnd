import React, { useState,useEffect } from "react";
import { ListGroup,ListGroupItem } from "reactstrap";
import MenuBar from "./MenuBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { useNavigate } from "react-router-dom";
import Theater from './Theater.js'
import InfiniteScroll from "react-infinite-scroll-component";


const AdminHome=()=>{

  const {id}=useParams(); 
  const [theaters,setTheaters]=useState([]);
  const redirect=useNavigate();

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

  const loadMovies=()=>{
    //console.log("parameter id = "+id);
    authAxios.get(`/admin/get-all-theater?id=${id}`).then(
        (Response)=>{
            //console.log(Response.data.at(0).adminId);
            //const newTheater1=[...theaters,...Response.data];
            setTheaters(Response.data);

            console.log(Response.data);
        },(error)=>{
            console.log(error);
        }
    );
  }

  const fetchMoreData=()=>{
    loadMovies();
  }

  return(
    <div>
        <MenuBar/>
        <div>
        <InfiniteScroll
            dataLength={theaters.length}
            next={fetchMoreData}
            style={{ display: 'flex',gap: '20px',flexWrap: 'wrap',justifyContent: 'left' }} //To put endMessage and loader to the top.
            //inverse={true} //
            hasMore={false}
            loader={<h4>Loading...</h4>}
            //scrollableTarget="scrollableDiv"
            >

             {
              theaters.length>0
              ?
               theaters.map((theater1)=>
                  <Theater key={theater1.id} newTheater={theater1}/>
               )
              :"No Data"
             }

        </InfiniteScroll>
        </div>
    </div>
  );
}
export default AdminHome;