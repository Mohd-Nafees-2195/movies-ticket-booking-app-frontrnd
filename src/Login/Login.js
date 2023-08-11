import React,{useState} from "react";
import '../CSS/register.css'
import { BASE_URL } from "../Services/Config";
import { Button, Form, FormGroup } from "reactstrap";
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";


function Login(){

    const [data,setData]=useState({});
    const redirect=useNavigate();

    const handleForm=(e)=>{
        login(data);
        e.preventDefault();
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    function validatePassword(password){
        var re = {
            capital: /(?=.*[A-Z])/,
            length: /(?=.{6,20}$)/,
            specialChar: /[ -\/:-@\[-\`{-~]/,
            digit: /(?=.*[0-9])/,
        };
        return (
            re.capital.test(password) &&
            re.length.test(password) &&
            re.specialChar.test(password) &&
            re.digit.test(password)
        );
    }  

const login=(data)=>{
   console.log(data);
 
   if(isValidEmail(data.email)){
     if(validatePassword(data.password)){

     }else{
        toast.error("password must Contains atleast one Capital letter,one special symbol, one digit and length b/w 6 to 20",{position:"top-center"} );
        return;
     }
   }else{
    toast.error("Please enter valid email",{position:"top-center"} );
    return;
   }

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
                if(response.data.user.authorities.at(0).authority==="ADMIN"){
                    const adminId=response.data.user.userId;
                    localStorage.setItem('adminId', adminId);
                    redirect(`/adminhome/${adminId}`);
                }else{
                    redirect("/home");
                }
                
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
                                <label className="form-label" htmlFor="firstName">Email </label>
                                <input className="form-input" name="email" type="email" id="email" placeholder="Email"
                                
                                onChange={(e)=>{
                                    setData({...data, email: e.target.value});
                                }}
                                />
                            </FormGroup>
                        </div>
                        <div>
                            <FormGroup>
                                <label className="form-label" htmlFor="firstName">Password </label>
                                <input className="form-input" name="password" type="password" id="password" placeholder="Password"
                                
                                onChange={(e)=>{
                                    //handleChange
                                    setData({...data, password: e.target.value});
                                }}
                                />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="register-btn">
                    <Button type="submit" className="btn-primary m-2">Submit</Button><br/><br/>
                        <ListGroup className="p-1 m-1">
                            <ListGroupItem className="p-1 m-1" tag="a" href="/register" action>
                                Register
                            </ListGroupItem>
                            
                            <ListGroupItem className="p-1 m-1" tag="a" href="/resetpassword" action>
                                Reset Password
                            </ListGroupItem>
                        </ListGroup>
                        
                        {/* <button type="submit" className="btn-primary" >Reset Password</button> */}
                    </div>
                </Form>
            </div>
 );
}
export default Login;
