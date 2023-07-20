import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const Menus=()=>{
    return(
        <ListGroup>
            <ListGroupItem tag="a" href="/" action>
                Home
            </ListGroupItem>
            <ListGroupItem tag="a" href="/register" action>
                Register
            </ListGroupItem>
            <ListGroupItem tag="a" href="/login" action>
                Login
            </ListGroupItem>
        </ListGroup>
    );
}
export default Menus;