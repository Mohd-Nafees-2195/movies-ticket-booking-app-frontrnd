import React,{ useEffect,useState} from "react";
import '../CSS/register.css'
import { BASE_URL } from "../Services/Config";
import axios, { formToJSON } from "axios";
import { Form, FormGroup } from "reactstrap";
import {ToastContainer, toast} from "react-toastify"

function Login(){

    const [data,setData]=useState({});

    const handleForm=(e)=>{
        login(data);
        e.preventDefault();
    }
const login=(data)=>{
   console.log(data);
    axios.post(`${BASE_URL}/auth/login`,data).then(
        (response)=>{
            if(response.data!=null){
            if(response.data.user.username==="Login Failed"){
                if(response.data.user.email==="Please Fill All Details"){
                    toast.error("Login failed!! Please Fill All Details",{position:"top-center"});
                }else if(response.data.user.email==="Usr Not Found!! Please Register First"){
                    toast.error("Login failed!! Usr Not Found!! Please Register First",{position:"top-center"});
                }else if(response.data.user.email==="Incorrect Email or Password"){
                    toast.error("Login failed!! Incorrect Email or Password",{position:"top-center"});
                }else{
                    toast.success("Login Success",{position:"top-center"} );
                }
            }else{
                toast.success("Login Success",{position:"top-center"} );
            }
            
            console.log(response.data);
           }
        },(error)=>{
            toast.error("Login failed!! Try Again",{position:"top-center"});
            console.log(error.data);
        }
    );
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
                        <button type="submit" className="btn-primary">Login</button>
                    </div>
                </Form>
            </div>
 );
}
export default Login;
