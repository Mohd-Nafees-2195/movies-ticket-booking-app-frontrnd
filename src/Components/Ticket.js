import React,{useState,useEffect} from "react";
import { Card, CardBody, CardHeader, Label } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify"

function Ticket(){

  const { id } = useParams();
  const redirect=useNavigate();
  const [ticket,setTicket]=useState([]);
  const [theater,setTheater]=useState(undefined);
  useEffect(()=>{
    if(localStorage.getItem("token")===null){
      redirect("/")
      }
      console.log(id);
      loadTicket(id)
    },[]);

    const authAxios=axios.create({
      baseURL:BASE_URL,
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    
     const loadTicket=(id)=>{
       authAxios.get(`/user/get-ticket?id=${id}`).then(
        (response)=>{
          //console.log(response);
          setTicket(response.data);
           authAxios.get(`user/get-movie?id=${response.data.movieId}`).then(
             (res1)=>{
               console.log(res1);
               //res1.data.theaterId  use this tpo fetch theatre abd then update
               authAxios.get(`/user/get-theater?id=${res1.data.theatetId}`).then(
                (res2)=>{
                  console.log(res2);
                  setTheater(res2.data);
                  toast.success("Ticket Booked Successfully!!",{position:"top-center"});
                },(err2)=>{
                  console.log(err2)
                }
               )
             },(err1)=>{
               console.log(err1);
             }
           );

        },(error)=>{
          console.log(error);
        }
      );
    }

    return(
           <div>

            <Card>
              <CardHeader>Ticket</CardHeader>
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
export default Ticket;