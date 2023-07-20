import React from "react";
import {Card, Container, Button, CardGroup, Pagination, PaginationItem,PaginationLink} from "reactstrap";
import Movie from "./Movie";
//import MovieCard from "./MovieCard";

const Home=()=>{
    // return(
    //     <div>
    //         {
    //             coinsData.map((coin,index)=>{
    //                 return <MovieCard
    //                  key={index}
    //                  image={coin.image}
    //                  name={coin.name}
    //                  price={coin.current_price}
    //                 />
    //             })
    //         }
    //     </div>
      return (
          <div>
            <Pagination>
                <PaginationItem disabled>
                    <Movie number="https://picsum.photos/318/182" movieName="RRR" movieTitle="South Indian Movie"/>
                </PaginationItem>
                <PaginationItem disabled>
                    <Movie number="https://picsum.photos/318/183" movieName="Ram Setu" movieTitle="Bolliwood Movie"/>
                </PaginationItem>
                <PaginationItem >
                    <Movie number="https://picsum.photos/318/184" movieName="Sinister" movieTitle="Horror Movie"/>
                </PaginationItem>
                {/* <PaginationItem >
                    <Movie number="https://picsum.photos/318/185" movieName="Chimpangi" movieTitle="Holliwood Movie"/>
                </PaginationItem> */}
                {/* <PaginationItem >
                    <Movie number="https://picsum.photos/318/186" movieName="Gangs of Washepur" movieTitle="Bolliwood Movie"/>
                </PaginationItem> */}
            </Pagination>
        </div>
    );
}
export default Home;