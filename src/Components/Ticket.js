import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Label } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify"
import Back from "./Back";
import { Spinner } from "reactstrap";

function Ticket() {

  const { id } = useParams();
  const redirect = useNavigate();
  const [ticket, setTicket] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theater, setTheater] = useState(undefined);
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      redirect("/")
    }
    console.log(id);
    loadTicket(id)
  }, []);

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  // setTimeout(() => {
  //   // Code to be executed after 30000 milliseconds (30 seconds)
  //   setLoading(true);
  //   loadTicket(id);
  // }, 30000);

  const loadTicket = (id) => {
  setLoading(true);
  authAxios.get(`/user/get-ticket?id=${id}`).then(
    (response) => {
      //console.log(response);
      setTicket(response.data);
      authAxios.get(`user/get-movie?id=${response.data.movieId}`).then(
        (res1) => {
          console.log(res1);
          //res1.data.theaterId  use this tpo fetch theatre abd then update
          authAxios.get(`/user/get-theater?id=${res1.data.theatetId}`).then(
            (res2) => {
              console.log(res2);
              setTheater(res2.data);

              setLoading(false);
              toast.success("Ticket Booked Successfully!!", { position: "top-center" });
            }, (err2) => {
              console.log(err2);
              setLoading(false)
            }
          )
        }, (err1) => {
          console.log(err1);
          setLoading(false);
        }
      );

    }, (error) => {
      console.log(error);
      setLoading(false);
    }
  );
}

return (
  <div>
    <div className="m-2">
      <Back />
    </div>
    {
      loading ? <Spinner>
        Loading...
      </Spinner>
        :
        <Card>
          <CardHeader>Ticket</CardHeader>
          <CardBody>
            <div>
              <Label>Theater Name : {theater !== undefined ? theater.theatrename : ""}</Label>
              <Label>Location : {theater !== undefined ? theater.theatreCity : ""}</Label><br />
              <Label>Date : {ticket.date}</Label>
              <Label>Time : {ticket.startTime} - {ticket.endTime}</Label><br />
              <Label>Seat Number : {ticket.seatNumber}</Label><br />

            </div>
          </CardBody>
        </Card>

    }

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