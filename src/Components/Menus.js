import React,{useState} from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Logout from "./Logout";

const Menus=()=>{
    
    return(
        <ListGroup>
            
           <ListGroupItem tag="a" href="/" action>
                Login
            </ListGroupItem>
           
            <ListGroupItem tag="a" href="/register" action>
                Register
            </ListGroupItem>
            
            <ListGroupItem tag="a" href="/resetpassword" action>
                Reset Password
            </ListGroupItem>
        </ListGroup>
    );
}
export default Menus;