import React,{useState} from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Logout from "./Logout";

const Menus=()=>{


    // //const token=localStorage.getItem("token");
    // const [showComponents, setShowComponents] = useState(true);

    // if(localStorage.getItem("token")===null)
    //     setShowComponents(!showComponents);
    // else    
    //   setShowComponents(showComponents);
    return(
        <ListGroup>
          {/* {showComponents && (
                <div>
                 <Logout/>
                 <ListGroupItem tag="a" href="/" action>
                   Home
                  </ListGroupItem>
                </div>
           )} */}
            {/* <ListGroupItem tag="a" href="/" action>
                Home
            </ListGroupItem> */}
        
           {/* <ListGroupItem tag="a" href="/home" action>
                   Home
                  </ListGroupItem> */}
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