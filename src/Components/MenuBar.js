import React from "react";
import { Button ,Container,Form,Nav,Navbar} from "reactstrap";
import Logout from "./Logout";
import '../CSS/Admin.css'

const MenuBar=()=>{
    return(
    <Navbar className="main-nav">
       <Container>
        <Navbar id="navbarScroll">
          <Nav  className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
            >
            <Nav className="inner-nav" tag="a" href={`/adminhome/${localStorage.getItem("adminId")}`} action>Home</Nav>
            {/* <Nav className="inner-nav" tag='a'>Add Movie</Nav> */}
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav className="inner-nav" tag="a" href='/add-theater' action>Add Theater</Nav>
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
export default MenuBar;