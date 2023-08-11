//  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

import React, { useEffect, useState } from 'react';
import { Card,CardTitle,CardBody,CardImg,CardText, Button, Label} from "reactstrap";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Services/Config';
import { useNavigate } from 'react-router-dom';
import '../CSS/Movie.css'
import Back from './Back';

const BookTickets=()=>{

  const redirect=useNavigate();
  const { id } = useParams();
  const [movieData,setMovieData]=useState([]);
  const [timeData,setTimeData]=useState([]);
  
  //const [ticketData,setTicketData]=useState(false);
  const [theater,setTheater]=useState(undefined);
  //let movieData=null;
  
  useEffect(()=>{
    if(localStorage.getItem("token")===null){
      redirect("/")
      }
    
      loadMovie(id);  
    },[]);

  const authAxios=axios.create({
    baseURL:BASE_URL,
    headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  });

  const loadMovie=(id)=>{
    //console.log(id);

     authAxios.get(`/user/get-movie?id=${id}`).then(
      (response)=>{
        //console.log(Response.data);
        //movieData=Response.data;
        setMovieData(response.data);
        //console.log(movieData.movieId);
        authAxios.get(`/user/get-timing?id=${response.data.movieId}`).then(
          (res)=>{
            //console.log(res.data);
            //movieData=Response.data;
            setTimeData(res.data);
          },(error)=>{
           console.log(error);
          }
         );


         authAxios.get(`/user/get-theater?id=${response.data.theatetId}`).then(
          (res2)=>{
            //console.log(res2);
            setTheater(res2.data);
          },(err2)=>{
            console.log(err2)
          }
         )


      },(error)=>{
       console.log(error);
      }
   );
  }

  //API for morning slot
  const Morning=()=>{
    //console.log(timeData.at(0));
    if(timeData.at(0)!==undefined){

       const ticketData={email:localStorage.getItem("email"),
          date:timeData.at(0).date,
          startTime:timeData.at(0).startTime,
          endTime:timeData.at(0).endTime,
          seatNumber:0,
          movieId:timeData.at(0).movieId,
          timeId:timeData.at(0).timeId
        }
     // setTicketData();


   
    if(ticketData){
      
      //console.log(ticketData);
      //redirect(`/ticket/${ticketData.movieId}`);
      authAxios.post(`/user/create-ticket`,ticketData).then(
        (res1)=>{
          //console.log(res1);
          redirect(`/ticket/${res1.data.ticketId}`);
        },(err1)=>{
          console.log(err1);
        }
      );

    }else{
      //console.log(ticketData);
    }

    }else{
      //console.log(timeData);
    }
  }

  //API for AfterNoon slot
  const Noon=()=>{
    //console.log(timeData.at(1));
    if(timeData.at(1)!==undefined){

      const ticketData1={email:localStorage.getItem("email"),
      date:timeData.at(1).date,
      startTime:timeData.at(1).startTime,
      endTime:timeData.at(1).endTime,
      seatNumber:0,
      movieId:timeData.at(1).movieId,
      timeId:timeData.at(1).timeId
    }
      //setTicketData();
     
    if(ticketData1){
      
      //console.log(ticketData);
      //redirect(`/ticket/${ticketData.movieId}`);
      authAxios.post(`/user/create-ticket`,ticketData1).then(
        (res1)=>{
          //console.log(res1);
          redirect(`/ticket/${res1.data.ticketId}`);
        },(err1)=>{
          console.log(err1);
        }
      );

    }else{
      //console.log(ticketData);
    }
   }
  }

  const Evening=()=>{
    //console.log(timeData.at(2));
    if(timeData.at(2)!==undefined){

      const ticketData2={email:localStorage.getItem("email"),
        date:timeData.at(2).date,
        startTime:timeData.at(2).startTime,
        endTime:timeData.at(2).endTime,
        seatNumber:0,
        movieId:timeData.at(2).movieId,
        timeId:timeData.at(2).timeId
      }
      //setTicketData();
     
    if(ticketData2){
      
     // console.log(ticketData);
      
      authAxios.post(`/user/create-ticket`,ticketData2).then(
        (res1)=>{
          //console.log(res1);
          redirect(`/ticket/${res1.data.ticketId}`);
        },(err1)=>{
          console.log(err1);
        }
      );

    }else{
      //console.log(ticketData);
    }
  }
 }

   return(
    <div>
        <div>
           <Back/>
        </div>
        <Card className="my-5">
          {/* <Back/> */}
          {/* <CardImg className='imagebg'
            alt={movieData.movieName}
            src={ movieData.imageData!==undefined?`data:image/jpeg;base64,${movieData.imageData}`:"No Image"} 
          /> */}
          <img
            className='imagebg'
            alt={movieData.movieName}
            src={ movieData.imageData!==undefined?`data:image/jpeg;base64,${movieData.imageData}`:"No Image"} 
          />
          <CardBody>
            <CardTitle tag="h1">
              {movieData.movieName}
            </CardTitle>
            <CardText tag="h5">
              {movieData.movieTitle}
            </CardText>
            <Label>Price : {movieData!==undefined?movieData.price+"$":"5$"}</Label>
            <Label>
              Date : {timeData.at(0)!==undefined?timeData.at(0).date:"Not Set"}
            </Label>
            <Label>Theater Name :  {theater!==undefined?theater.theatrename:""}</Label>
            <Label>Location :  {theater!==undefined?theater.theatreCity:""}</Label>
            <div className='outer-div'>

              <div className='inner-div'>
               <Label className='label'>{timeData.at(0)!==undefined?timeData.at(0).startTime:""} -  {timeData.at(0)!==undefined?timeData.at(0).endTime:""}</Label>
               {/* {console.log(timeData.at(0))} */}
               <Label className='label'>Available Seats : {timeData.at(0)!==undefined?timeData.at(0).availableSeats:0}</Label>
                <Button className='main-btn' onClick={Morning}>  
                  Book Now
                </Button>
              </div>

              <div className='inner-div'>
              <Label className='label'>{timeData.at(1)!==undefined?timeData.at(1).startTime:""} -  {timeData.at(1)!==undefined?timeData.at(1).endTime:""}</Label>
              <Label className='label'>Available seats : {timeData.at(1)!==undefined?timeData.at(1).availableSeats:0}</Label>
                <Button className='main-btn' onClick={Noon}>  
                  Book Now
                </Button>
              </div>
              
              <div className='inner-div'>
              <Label className='label'>{timeData.at(2)!==undefined?timeData.at(2).startTime:""} -  {timeData.at(2)!==undefined?timeData.at(2).endTime:""}</Label>
              <Label className='label'>Available seats : {timeData.at(2)!==undefined?timeData.at(2).availableSeats:0}</Label>
                <Button className='main-btn' onClick={Evening}> 
                  Book Now
                </Button>
              </div>
               
            </div>
          </CardBody>
        </Card>
        </div>
   );
}
export default BookTickets;