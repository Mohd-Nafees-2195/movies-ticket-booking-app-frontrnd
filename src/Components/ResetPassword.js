import React,{useState} from "react";
import { Button, Form,FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import {ListGroup,ListGroupItem} from "reactstrap";
import '../CSS/register.css'

const ResetPassword=()=>{

    const [data,setData]=useState({});
    const redirect=useNavigate();

    const handleForm=(e)=>{
        console.log(data);
        requestLink(data);
        e.preventDefault();
    }

    const requestLink=(data)=>{
        axios.post(`${BASE_URL}/auth/requestpasswordresetotp?email=`+data.email).then(
            (response)=>{
                console.log(response);
                redirect("/verifyotp");
            },(error)=>{
                console.log(error);
            }
        );
    }

 return(
    <div className="form">
      <div className="form-body">
        <div className="bg-body-tertiary ">
           <h2>Reset Your Password</h2>
         </div>
       <Form onSubmit={handleForm}> 
        <FormGroup>
            <label className="form-label" htmlFor="firstName">Email</label>
            <input className="form-input" name="email" type="email" id="email" placeholder="Email"
                                
             onChange={(e)=>{
                setData({...data, email: e.target.value});
                }}
            />
        </FormGroup>
          <Button type="submit">Send OTP</Button>
       </Form>
       <div className="register-btn">
       <ListGroup className="p-1 m-1">
            <ListGroupItem className="p-1 m-1" tag="a" href="/" action>
                Login
            </ListGroupItem>
            <ListGroupItem className="p-1 m-1" tag="a" href="/register" action>
                Register
            </ListGroupItem>      
        </ListGroup>

        </div>
     </div>
    </div>
 );
}
export default ResetPassword;