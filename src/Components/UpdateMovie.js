import React, { useState,useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { Form,FormGroup,Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateMovie=()=>{

    const {id}=useParams();
    const [data,setData]=useState([]);
    const redirect=useNavigate();

    const authAxios=axios.create({
        baseURL:BASE_URL,
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      });

    useEffect((e)=>{
        if (localStorage.getItem("token") === null) {
            redirect("/")
        }

        loadMovie();
        },[]);

    const loadMovie=()=>{
        console.log(id);
        authAxios.get(`/user/get-movie?id=${id}`).then(
            (response)=>{
                console.log(response.data);
                setData(response.data);
            },(error)=>{
                console.log(error);
            }
        );
    }

    const handleForm=(e)=>{
        e.preventDefault();
        //const movieData={movieName:data.movieName,MovieTitle:data.MovieTitle,email:localStorage.getItem("email"),file:data.selectImage};
        //console.log(movieData);
        const formData = new FormData();
        formData.append('theaterId',localStorage.getItem("theaterId"));
        formData.append('movieName', data.movieName);
        formData.append('movieTitle',data.movieTitle);
        formData.append('price',data.price);
        formData.append('email', localStorage.getItem("email"));
        if(data.selectImage!=undefined)
         formData.append('file', data.selectImage);
        else
         formData.append('file', null);
         

        console.log(formData);

        
        authAxios.put(`/admin/update-movie?id=${id}`,formData).then(
            (response)=>{
                console.log(response);
                if(response.data.message==="Success!!"){
                    toast.success("Movie Updated successfully",{position:'top-center'});
                    redirect(`/all-theater-movie/${data.theatetId}`);
                }else{
                    toast.error("Failed to add movie",{position:'top-center'});
                }
            },(error)=>{
                //console.log(error);
                console.error(error);
            }
        );
    }

    return(
        <div className="form">

        <div className="bg-body-tertiary ">
            <h1>Update Movie Details</h1>
        </div>
        <Form onSubmit={handleForm}>
            <div className="form-body">
                <div>
                   <FormGroup>
                        <label className="form-label" htmlFor="movieName">Movie Name </label>
                        <input className="form-input" name="movieName" type="text" id="movieName" value={data.movieName!==undefined?data.movieName:"Enter Movie Name"}
                        
                        onChange={(e)=>{
                            setData({...data, movieName: e.target.value});
                        }}
                        required
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup>
                        <label className="form-label" htmlFor="firstName">Movie Title </label>
                        <input className="form-input" name="MovieTitle" type="text" id="MovieTitle" value={data.movieTitle!==undefined?data.movieTitle:"Enter Title"}
                        
                        onChange={(e)=>{
                            //handleChange
                            setData({...data, movieTitle: e.target.value});
                        }}
                        required
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup>
                        <label className="form-label" htmlFor="firstName">Price </label>
                        <input className="form-input" name="price" type="Number" id="price" value={data.price!==undefined?data.price:0}
                        
                        onChange={(e)=>{
                            //handleChange
                            setData({...data, price: e.target.value});
                        }}
                        required
                        />
                    </FormGroup>
                </div>
                {/* Add Fuctionality to read image  */}
                <div>
                    <FormGroup>
                        <label className="form-label" htmlFor="firstName">Select Image </label>
                        <input className="form-input" name="selectImage" type="file" id="selectImage"
                        
                        onChange={(e)=>{
                            //handleChange
                            setData({...data, selectImage: e.target.files[0]});
                        }}
                        />
                    </FormGroup>
                </div>
            </div>

            <div className="register-btn">
            <Button type="submit" className="btn-primary m-2">Update</Button><br/><br/>
            </div>
        </Form>
    </div>
    );
}
export default UpdateMovie;