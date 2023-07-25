import React, { useState } from "react";
import { Form,FormGroup,Button } from "reactstrap";

const VerifyOTP=()=>{

    const [data,setData]=useState({});

    const handleForm=(e)=>{
        console.log(data);
        e.preventDefault();
    }

  return(
    <div className="form">
      <div className="form-body">
        <div className="bg-body-tertiary ">
           <h2>Enter Your OTP</h2>
         </div>
       <Form onSubmit={handleForm}> 
        <FormGroup>
            {/* <label className="form-label" htmlFor="firstName">OTP</label> */}
            <input className="form-input" name="otp" type="number" id="otp" placeholder="Enter OTP here"
                                
             onChange={(e)=>{
                setData({...data, otp: e.target.value});
                }}
            />
        </FormGroup>
        <Button type="submit">Verufy OTP</Button>
       </Form>
     </div>
    </div>
  );
}
export default VerifyOTP;