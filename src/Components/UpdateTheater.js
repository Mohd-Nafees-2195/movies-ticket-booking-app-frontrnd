import React, { useEffect, useState } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { toast } from "react-toastify";
import BackAdmin from "./BackAdmin";

const UpdateTheater = () => {

    const {id}=useParams();
    const [data,setData]=useState([]);
    const redirect = useNavigate();

    const authAxios=axios.create({ 
        baseURL:BASE_URL,
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })

    useEffect(() => {

        if (localStorage.getItem("token") === null) {
            redirect("/")
        }

        loadTheater();
    }, []);

    const loadTheater=()=>{
        console.log(id);
        authAxios.get(`/admin/get-theater?id=${id}`).then(
            (response)=>{
                console.log(response);
                setData(response.data);
            },(error)=>{
                console.log(error);
            }
        );
        
    }

    const handleForm = (e) => {
        e.preventDefault();
        const theaterData = { theatreName: data.theatrename, theatreCity: data.theatreCity, email: localStorage.getItem("email"), totalSeats: data.totalSeats };
        console.log(theaterData);

        authAxios.put(`/admin/update-theater?id=${id}`,theaterData).then(
            (response)=>{
                //console.log(response);
                //Getting User
                if(response.data.message==="Success!!"){
                    authAxios.get(`/admin/get-admin?email=${localStorage.getItem("email")}`).then(
                        (response1)=>{
                            console.log(response1.data.userId);
                            if(response1.data!==null){
                                toast.success("Theater Updated Successfully",{position:"top-center"});
                                redirect(`/adminhome/${response1.data.userId}`);
                            }
                        },(error1)=>{
                            console.log(error1.data);
                        }
                    );
                    
                }else{
                    toast.error("Failed to add theater",{position:"top-center"});
                }

            },(error)=>{
                toast.error("Failed to add theater",{position:"top-center"});
                console.log(error);
            }
        );
    }

    return (
        <div>
            <BackAdmin/>
        <div className="form">

            <div className="bg-body-tertiary ">
                <h1>Update Theater Details</h1>
            </div>

            <Form onSubmit={handleForm}>
                <div className="form-body">
                    <div>
                        <FormGroup>
                            <label className="form-label" htmlFor="firstName">Theater Name </label>
                            <input className="form-input" name="theaterName" type="text" id="theaterName" value={data!==null?data.theatrename:"Enter Theater Name"}

                                onChange={(e) => {
                                    setData({ ...data, theatrename: e.target.value });
                                }}
                                required
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup>
                            <label className="form-label" htmlFor="firstName">Location </label>
                            <input className="form-input" name="theaterCity" type="text" id="theaterCity" value={data!==null?data.theatreCity:"Enter Theater Location"}

                                onChange={(e) => {
                                    //handleChange
                                    setData({ ...data, theatreCity: e.target.value });
                                }}
                                required
                            />
                        </FormGroup>
                    </div>
                    <div>
                        <FormGroup>
                            <label className="form-label" htmlFor="firstName">Total Seats </label>
                            <input className="form-input" name="totalSeats" type="number" id="totalSeats" value={data!==null?data.totalSeats:"Enter Total Seats"}

                                onChange={(e) => {
                                    //handleChange
                                    setData({ ...data, totalSeats: e.target.value });
                                }}
                                required
                            />
                        </FormGroup>
                    </div>
                </div>

                <div className="register-btn">
                    <Button type="submit" className="btn-primary m-2">Submit</Button><br /><br />
                    {/* <ListGroup className="p-1 m-1">
                    <ListGroupItem className="p-1 m-1" tag="a" href="/register" action>
                        Register
                    </ListGroupItem>
                    
                    <ListGroupItem className="p-1 m-1" tag="a" href="/resetpassword" action>
                        Reset Password
                    </ListGroupItem>
                </ListGroup> */}

                    {/* <button type="submit" className="btn-primary" >Reset Password</button> */}
                </div>
            </Form>
        </div>
        </div>
    );
}
export default UpdateTheater;