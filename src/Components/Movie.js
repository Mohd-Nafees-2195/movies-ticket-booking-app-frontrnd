import React from "react";
import {Card,CardBody,CardTitle,CardSubtitle,CardText,CardFooter,Button,Container,CardImg} from "reactstrap";

const Movie=({number,movieName,movieTitle})=>{
    return(
        <Card style={ {width:'20rem',height:'30rem',margin:'1rem',padding:'.5rem', display:"inline"} }>
            <CardImg
                alt="Card image cap"
                src={number}
                top
                width="100%"
            />
            <CardBody style={ {margin:'1rem',padding:'.5rem'} }>
                <CardSubtitle tag="h5" style={ {padding:'1rem'} }>{movieName}</CardSubtitle>
                <CardTitle tag="h6">{movieTitle}</CardTitle>
                <Container>
                    <Button color="primary">Show More</Button>
                </Container>
            </CardBody>
        </Card>
    );
}
export default Movie;