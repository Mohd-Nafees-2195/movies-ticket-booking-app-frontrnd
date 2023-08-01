import React from 'react';
import { Card,CardBody,Button,CardTitle,CardSubtitle,CardImg,CardImgOverlay,CardText} from "reactstrap";

const BookTickets=()=>{
   return(
    <Card inverse>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/900/270?grayscale"
      style={{
        height: 270
      }}
      width="100%"
    />
    <CardImgOverlay>
      <CardTitle tag="h5">
        Card Title
      </CardTitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText>
      <CardText>
        <small className="text-muted">
          Last updated 3 mins ago
        </small>
      </CardText>
    </CardImgOverlay>
  </Card>
   );
}
export default BookTickets;