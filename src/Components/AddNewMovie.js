import React,{useState} from "react";
import { Form,FormGroup,Button } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BackAdmin from "./BackAdmin";

const AddNewMovie=()=>{

    const [data,setData]=useState([]);
    const redirect=useNavigate();

    const authAxios=axios.create({
        baseURL:BASE_URL,
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })

    const handleForm=(e)=>{
        e.preventDefault();
        //const movieData={movieName:data.movieName,MovieTitle:data.MovieTitle,email:localStorage.getItem("email"),file:data.selectImage};
        //console.log(movieData);
        const formData = new FormData();
        formData.append('theaterId',localStorage.getItem("theaterId"));
        formData.append('movieName', data.movieName);
        formData.append('MovieTitle',data.MovieTitle);
        formData.append('price',data.price);
        formData.append('email', localStorage.getItem("email"));
        formData.append('file', data.selectImage);

        console.log(formData);

        authAxios.post(`/admin/insert-movie`,formData).then(
            (response)=>{
                console.log(response);
                if(response.data.message==="Success!!"){
                    toast.success("Movie added successfully",{position:'top-center'});
                    redirect(`/all-theater-movie/${localStorage.getItem("theaterId")}`);
                }else{
                    toast.error("Failed to add movie",{position:'top-center'});
                }
            },(error)=>{
                console.log(error);
            }
        );
    }

    return(
        <div>
            <BackAdmin/>
        <div className="form">
        <div className="bg-body-tertiary ">
            <h1>Add New Movie</h1>
        </div>
        <Form onSubmit={handleForm}>
            <div className="form-body">
                <div>
                   <FormGroup>
                        <label className="form-label" htmlFor="firstName">Movie Name </label>
                        <input className="form-input" name="movieName" type="text" id="movieName" placeholder="Movie Name"
                        
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
                        <input className="form-input" name="MovieTitle" type="text" id="MovieTitle" placeholder="Movie Title"
                        
                        onChange={(e)=>{
                            //handleChange
                            setData({...data, MovieTitle: e.target.value});
                        }}
                        required
                        />
                    </FormGroup>
                </div>
                <div>
                    <FormGroup>
                        <label className="form-label" htmlFor="firstName">Price </label>
                        <input className="form-input" name="price" type="Number" id="price" placeholder="Enter Price"
                        
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
                        required
                        />
                    </FormGroup>
                </div>
            </div>

            <div className="register-btn">
            <Button type="submit" className="btn-primary m-2">Submit</Button><br/><br/>
            </div>
        </Form>
    </div>
    </div>
    );
}
export default AddNewMovie;