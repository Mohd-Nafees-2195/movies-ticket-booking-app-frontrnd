import React,{useState,useEffect} from "react";
import { Card, CardBody, CardHeader, Label } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../Services/Config";


const Tickets=({newTicket})=>{
//function Tickets({newTicket}){  

  const [ticket,setTicket]=useState([]);
  const [theater,setTheater]=useState(undefined);
  const redirect=useNavigate();

  useEffect(()=>{
    if(localStorage.getItem("token")===null){
      redirect("/")
      }
      console.log(newTicket);
      loadTicket(newTicket);
    },[]);

    const authAxios=axios.create({
      baseURL:BASE_URL,
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    
     const loadTicket=()=>{
        if(newTicket===null||newTicket===undefined)
          return;
          setTicket(newTicket);
           authAxios.get(`user/get-movie?id=${newTicket.movieId}`).then(
             (res1)=>{
               console.log(res1);
               //res1.data.theaterId  use this tpo fetch theatre abd then update
               authAxios.get(`/user/get-theater?id=${res1.data.theatetId}`).then(
                (res2)=>{
                  console.log(res2);
                  setTheater(res2.data);
                  // toast.success("Ticket Booked Successfully!!",{position:"top-center"});
                },(err2)=>{
                  console.log(err2)
                }
               )
             },(err1)=>{
               console.log(err1);
             }
           );
    }

    return(
           <div className="m-2">
            <Card>
              <CardHeader className="h5">Ticket Id : {ticket.ticketId}</CardHeader>
              <CardBody>
                <div>
                  <Label>Theater Name : {theater!==undefined?theater.theatrename:""}</Label>
                  <Label>Location : {theater!==undefined?theater.theatreCity:""}</Label><br/>
                  <Label>Date : {ticket.date}</Label>
                  <Label>Time : {ticket.startTime} - {ticket.endTime}</Label><br/>
                  <Label>Seat Number : {ticket.seatNumber}</Label><br/>

                </div>
              </CardBody>
            </Card>

             {/* <Modal
              size='lg'
              isOpen={model}
              toggle={()=>setModel(!model)}
             >
               <ModalHeader
                toggle={()=>setModel(!model)}
               >
                 Ticket
               </ModalHeader>
   
             </Modal> */}
           </div>
        );
}
export default Tickets;