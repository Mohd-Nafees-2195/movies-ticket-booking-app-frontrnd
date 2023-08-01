import React,{ useEffect,useState} from "react";
import '../CSS/register.css'
import { BASE_URL } from "../Services/Config";
import { Form, FormGroup } from "reactstrap";
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login(){

    const [data,setData]=useState({});
    const redirect=useNavigate();

    const handleForm=(e)=>{
        login(data);
        e.preventDefault();
    }
const login=(data)=>{
   console.log(data);
    axios.post(`${BASE_URL}/auth/login`,data).then(
        (response)=>{
            if(response.data.user!=null){
            if(response.data.user.username==="Login Failed"){
                if(response.data.user.email==="Please Fill All Details"){
                    toast.error("Login failed!! Please Fill All Details",{position:"top-center"});
                }else if(response.data.user.email==="Usr Not Found!! Please Register First"){
                    toast.error("Login failed!! Usr Not Found!! Please Register First",{position:"top-center"});
                }else if(response.data.user.email==="Incorrect Email or Password"){
                    toast.error("Login failed!! Incorrect Email or Password",{position:"top-center"});
                }else{
                    toast.error("Login failed! Try Again",{position:"top-center"} );
                    
                }
            }else{
                //const[sharedData]=useState({jwtToken:response.data.jwt,emailId:data.email})
                //console.log(response.data.jwt);
                //JWTTOKEN=response.data.jwt;
                //emailId=data.email;
                //navigate('/main', { state: { email: email } });
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('email', data.email);
                toast.success("Login Success",{position:"top-center"} );
                redirect("/home");
            }
           }else{
            toast.error("Login failed! Try Again",{position:"top-center"} );
           }
        },(error)=>{
            toast.error("Login failed!! Try Again",{position:"top-center"});
        }
    );
}

 const ResetPassword=()=>{
  redirect("/ResetPassword");
 }

 return (
    <div className="form">
                <div className="bg-body-tertiary ">
                    <h1>Login</h1>
                </div>
                <Form onSubmit={handleForm}>
                    <div className="form-body">
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
                        <button type="submit" className="btn-primary m-2">Login</button>
                        {/* <button type="submit" className="btn-primary" >Reset Password</button> */}
                    </div>
                </Form>
            </div>
 );
}
export default Login;
