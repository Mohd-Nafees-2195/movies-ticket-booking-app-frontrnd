import React from "react";
import { Navbar,Container,Nav } from "reactstrap";
import Logout from "./Logout";

const NavBarMovie=()=>{

  return(
    
    <Navbar className="main-nav">
       <Container>
        <Navbar id="navbarScroll">
          <Nav  className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
            >
            <Nav className="inner-nav" tag="a" href={`/adminhome/${localStorage.getItem("adminId")}`} action>Home</Nav>
            <Nav className="inner-nav" tag="a" href='/add-movie' action>Add Movie</Nav>
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
export default NavBarMovie;