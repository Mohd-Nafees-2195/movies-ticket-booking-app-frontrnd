import React from "react";
import { Card,CardBody,Button,CardTitle,CardSubtitle } from "reactstrap";

const Movie=({newMovie})=>{
    return (
            <Card
                style={{
                    width: '18rem',
                    height:'auto',
                    margin:'10px',
                    marginBottom: '10px',
                    flex: '0 0 19%'
                }}
            >
            <img
                alt={newMovie.movieName}
                src={`data:image/jpeg;base64,${newMovie.imageData}`}   
                //src="https://picsum.photos/600/700"
            />
            <CardBody>
                <CardTitle tag="h5">{ newMovie.movieName }</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                       {newMovie.movieTitle}
                    </CardSubtitle>
                {/* <CardText>
                   Some quick example text to build on the card title and make up the bulk of the card‘s content.
                </CardText> */}
                <Button href="/book-tickets">Book Ticket</Button>
            </CardBody>
            </Card>
      );
}
export default Movie;