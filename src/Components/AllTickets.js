import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { Card, CardHeader, CardBody, Label, } from "reactstrap";
import { toast } from "react-toastify";
import Tickets from "./Tickets";
import Back from "./Back"

const AllTickets = () => {

    const [ticketData, setTicketData] = useState([]);
    const [theaterData, setTheaterData] = useState([]);
    const email = localStorage.getItem("email");
    const redirect = useNavigate();

    useEffect(() => {

        if (localStorage.getItem("token") === null) {
            redirect("/")
        }
        loadTickets();
    }, []);

    const authAxios = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    const loadTickets = () => {
        if (email !== null && email !== undefined) {
            authAxios.get(`/user/get-user?email=${email}`).then(
                (response) => {
                    const userId = response.data.userId;
                    if (userId !== null && userId !== undefined) {
                        console.log(userId);
                        authAxios.get(`/user/get-all-tickets?id=${userId}`).then(
                            (response1) => {
                                const array = response1.data;
                                setTicketData(response1.data);
                                // array.map(
                                //     (ticket)=>{
                                //         console.log(ticket);
                                //         getAllData(ticket);
                                //     }
                                // );
                            }, (error) => {
                                console.log(error);
                            }
                        );
                    } else {
                        toast.error("Please login first", { position: 'top-center' });
                    }
                }, (error) => {
                    console.log(error);
                }
            );
        } else {
            redirect("/")
        }
    }

    // function getAllData(ticket){
    //     authAxios.get(`user/get-movie?id=${ticket.movieId}`).then(
    //         (res1)=>{
    //           console.log(res1);
    //           //res1.data.theaterId  use this tpo fetch theatre abd then update
    //           authAxios.get(`/user/get-theater?id=${res1.data.theatetId}`).then(
    //            (res2)=>{
    //              console.log(res2);
    //              const newData=[...ticketData,...]
    //              setTheater(res2.data);
    //              toast.success("Ticket Booked Successfully!!",{position:"top-center"});
    //            },(err2)=>{
    //              console.log(err2)
    //            }
    //           )
    //         },(err1)=>{
    //           console.log(err1);
    //         }
    //       );
    // }

    return (
        <div>
            <div>
                <Back/>
            </div>
            <div>
                {
                    ticketData.length > 0
                        ?
                        ticketData.map(
                            (ticket) =>
                                <Tickets key={ticket.id} newTicket={ticket} />
                        )
                        : "No Data"
                }

            </div>
        </div>
    );
}
export default AllTickets;