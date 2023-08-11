import React from "react";
import { Navbar,Nav,Container } from "reactstrap";
import Logout from "./Logout";

const BackAdmin=()=>{
    return(
        <Navbar className="main-nav">
        <Container>
         <Navbar id="navbarScroll">
           <Nav  className="me-auto my-2 my-lg-0"
               style={{ maxHeight: '100px' }}
             >
            <Nav className="inner-nav" tag="a" href={`/adminhome/${localStorage.getItem("adminId")}`} action>Home</Nav>
             {/* <Nav className="inner-nav" tag="a" href="/all-tickets" action>Get Tickets</Nav> */}
             {/* <Nav><Link Link="/home">Get Tickets</Link></Nav> */}
           </Nav>
           {/* <Form className="inner-nav">
             <Form type="search" placeholder="Search" className="me-2" aria-label="Search"/>
             <Button variant="outline-success">Search</Button>
           </Form> */}
           <Logout/>
         </Navbar>
       </Container>
     </Navbar>
    );
}
export default BackAdmin;