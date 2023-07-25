import React,{Fragment, useEffect,useState} from "react";
import '../CSS/register.css'
import { BASE_URL } from "../Services/Config";
import axios, { formToJSON } from "axios";
import { Form, FormGroup } from "reactstrap";
import {ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const Register=()=>{

    const [data,setData]=useState({});
    const redirect=useNavigate();
    //Form Handler
    const handleForm=(e)=>{
        registration(data);
        e.preventDefault();
    }

    const registration=(data)=>{
        //console.log(data);
        
      axios.post(`${BASE_URL}/auth/register`,data).then(
         (response)=>{
            //console.log(response);
            
            //console.log(response.data.registrationMessage);
            if(response.data.registrationMessage==="Registration Failed"){
                if(response.data.registrationReasonIfFailed==="Please Enter all fields"){
                    toast.error("Failed!! Please Fill Required Fields!!",{position:"top-center"} );
                }else if(response.data.registrationReasonIfFailed==="user Already Exit"){
                    toast.error("Failed!! User already Exit!!",{position:"top-center"} );
                }else{
                    toast.error("Failed!! Network error",{position:"top-center"} );
                }
            }else{
                toast.success("Registration Success!!",{position:"top-center"} );
                redirect("/");
            }
            
            //console.log("Success!!!!");
         },(error)=>{
            console.log(error);
            //console.log("failed!!!")
            toast.error("Failed!! Network error",{position:"top-center"} );
         }
      );
    }

    return(
        <Fragment>
            <div className="form">
                <div className="bg-body-tertiary ">
                    <h1>Registration</h1>
                </div>
                <Form onSubmit={handleForm}>
                    <div className="form-body">
                        <div>
                            <FormGroup>
                                <label className="form-label" htmlFor="firstName">Full Name </label>
                                <input className="form-input" name="fullname" type="text" id="username" placeholder="Full Name"
                                
                                   onChange={(e)=>{
                                       setData({...data, username: e.target.value});
                                   }}
                                />
                            </FormGroup>
                        </div>
                        <div>
                           <FormGroup>
                                <label className="form-label" htmlFor="firstName">Email</label>
                                <input className="form-input" name="email" type="email" id="email" placeholder="Email"
                                
                                onChange={(e)=>{
                                    setData({...data, email: e.target.value});
                                }}
                                />
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup>
                                <label className="form-label" htmlFor="firstName">Password</label>
                                <input className="form-input" name="password" type="password" id="password" placeholder="Password"
                                
                                onChange={(e)=>{
                                    setData({...data, password: e.target.value});
                                }}
                                />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="register-btn">
                        <button type="submit" className="btn-primary">Register</button>
                    </div>
                </Form>
            </div>
        </Fragment>
    );
}
export default Register;