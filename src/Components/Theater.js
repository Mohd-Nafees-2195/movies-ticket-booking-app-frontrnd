import React from "react";
import axios from "axios";
import { BASE_URL } from "../Services/Config";
import { Card, CardBody, CardHeader, CardTitle, Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Theater = ({ newTheater }) => {

    const redirect=useNavigate();

    const authAxios=axios.create({
        baseURL:BASE_URL,
        headers:{
         Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })

    const deleteTheater=()=>{

        authAxios.delete(`/admin/delete-theater?id=${newTheater.theatreId}`).then(
            (response)=>{
                console.log(response);
                toast.success("Theater deleted Successfully!!",{position:'top-center'});
                window.location.href = `/adminhome/${newTheater.adminId}`;
            },(error)=>{
                console.log(error);
            }
        );
    }

    const updateTheater=()=>{

        authAxios.delete(`/admin/update-theater?id=${newTheater.theatreId}`).then(
            (response)=>{
                console.log(response);
                toast.success("Theater Updated Successfully!!",{position:'top-center'});
                window.location.href = `/adminhome/${newTheater.adminId}`;
            },(error)=>{
                console.log(error);
            }
        );
    }

    return (
        <Card
            style={{
                width: '20rem',
                height: 'auto',
                margin: '10px',
                padding: '10px',
                marginBottom: '10px',
                flex: '0 0 22.3%',
                display: 'inline-block'
            }}
        >
            <CardHeader>{newTheater.theatrename}</CardHeader>
            <CardBody className="theater-card-body">
                <div className="theater-outer-div">
                    <Label className="theater-label">Theater City : {newTheater.theatreCity}</Label><br />
                    <Label className="theater-label">Total Seates : {newTheater.totalSeats}</Label><br />
                    {/* <Label className="theater-label">Total Revenue : </Label> */}
                </div>
            </CardBody>

            <Button href={`/all-theater-movie/${newTheater.theatreId}`}

                style={{
                    backgroundColor: 'green',
                    margin: '2px'
                }}
            >Get Info</Button>
             
            <Button  href={`/update-theater/${newTheater.theatreId}`}
               
                style={{
                    backgroundColor: '#e0ae22',
                    margin: '2px'
                }}
            >Update</Button>
                    
            <Button 
                onClick={deleteTheater}
                style={{
                    backgroundColor: 'red',
                    margin: '2px'
                }}
            >Delete</Button>

        </Card>
    );
}
export default Theater;