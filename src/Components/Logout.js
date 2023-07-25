import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios, { formToJSON } from "axios";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { JWTTOKEN,BASE_URL } from "../Services/Config";
import { toast } from "react-toastify";

const Logout=()=>{

    const redirect=useNavigate();

    const hLogout=()=>{
        var email =localStorage.getItem("email");
        console.log(email);
        axios.post(`${BASE_URL}/auth/logout?email=`+email).then(
            (response)=>{
                console.log(response);
                localStorage.removeItem("token");
                localStorage.clear();
                sessionStorage.clear();
                toast.success("Logout Successfully",{position:"top-center"} );
                console.log(localStorage.getItem("email"));
                redirect("/");
            },(error)=>{
                console.log(error);
                toast.error("Something Went Wrong",{position:"top-center"} );
            }
        )
        
    }

  return(
    <div>
        
        <Button onClick={hLogout} className="p-2 m-2">Logout</Button>
    </div>
  );
}
export default Logout;