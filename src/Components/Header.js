import React from "react";
import { Card, CardBody } from "reactstrap";


function Header(){

    const jwtToken=null;

    return(
        <div>
            <Card className="m-2 bg-warning">
                <CardBody>
                  <h1 className="text-center my-2">Welcome To Movies Multiplex</h1>
                </CardBody>
            </Card>
        </div>
    );
}
export default Header;