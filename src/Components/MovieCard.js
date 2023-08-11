import React from "react";
import { Card,CardBody,Button,CardTitle,CardSubtitle } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MovieCard=({newMovie})=>{

    const redirect=useNavigate();

    const authAxios=axios.create({
        baseURL:BASE_URL,
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
    
    const DeleteMovie=()=>{
        authAxios.delete(`/admin/delete-movie?id=${newMovie.movieId}`).then(
            (response)=>{
                console.log(response);
                if(response.data.message==="Failed!!"){
                    toast.error("Failed to delete movie",{position:'top-center'});
                }else{
                    toast.success("Movie Deleted Successfully",{position:'top-center'});
                    //redirect(`/all-theater-movie/${newMovie.theatetId}`);
                    //redirect(`/all-theater-movie/${newMovie.theatetId}`);
                    window.location.href = `/all-theater-movie/${newMovie.theatetId}`;
                }
            },(error)=>{
                console.log(error);
            }
        );
    }


    return(
        <Card
                style={{
                    width: '18rem',
                    height:'auto',
                    margin:'10px',
                    marginBottom: '10px',
                    flex: '0 0 22.3%',
                }}
                
            >
            <img
                alt={newMovie.movieName}
                src={`data:image/jpeg;base64,${newMovie.imageData}`}   
               className="image"
            />
            <CardBody>
                <CardTitle tag="h5">{ newMovie.movieName }</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                       {newMovie.movieTitle}
                    </CardSubtitle>
                {/* <CardText>
                   Some quick example text to build on the card title and make up the bulk of the card‘s content.
                </CardText> */}
                <Button href={`/update-movie/${newMovie.movieId}`}
                  style={{
                    backgroundColor:'#e0ae22',
                    margin:'2px'
                   }}
                >Update</Button>
                <Button onClick={DeleteMovie}
                  style={{
                    backgroundColor:'green',
                    margin:'2px'
                   }}
                >Delete</Button>
            </CardBody>
            </Card>
    );
}
export default MovieCard;