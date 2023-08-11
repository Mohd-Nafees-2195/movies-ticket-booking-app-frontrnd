import React, { useEffect, useState } from "react";

import Movie from "./Movie";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../Services/Config";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import NavBarUser from "./NavBarUser";
import '../CSS/User.css'



const Home = () => {

    const redirect = useNavigate();
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const limit = 4;
    let total = 0;

    //Creating request with authorization header
    const authAxios = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    function search(e){
        e.preventDefault();
        setQuery(e.target.value);
        console.log(query);
        // get-searched-movies
        if(query===null||query===undefined){
            loadMovies();
        }
        authAxios.get(`/user/get-searched-movies?title=${query}`).then(
            (response)=>{
                setMovies(response.data)
                console.log(response);
            },(error)=>{
                console.log(error);
            }
        );
    }
    //  axios.interceptors.request.use(
    //     config=>{
    //         config.headers.authorization=`Bearer ${localStorage.getItem("token")}`;
    //         return config;
    //     },
    //     error=>{
    //         return Promise.reject(error);
    //     }
    //  )

    useEffect(() => {

        if (localStorage.getItem("token") === null) {
            redirect("/")
        }

        loadMovies();
    }, []);


    const loadMovies = () => {
        let start = movies.length;
        let end = start + limit - 1;
        //console.log(start+" "+ end);
        authAxios.get(`/user/get-all-movie?start=${start}&end=${end}`).then(
            (Response) => {
                //console.log(Response.data.imageData);
                const allMovies = [...movies, ...Response.data];
                total = allMovies.length;
                setMovies(allMovies);
                //console.log(allMovies);
            }, (error) => {
                console.log(error);
            }
        );
    }

    const fetchMoreData = () => {
        if (movies.length < total)
            loadMovies();
    }


    return (
        <div>
            <NavBarUser />
            {/* <SearchBar/> */}
            <div className="w-full max-w-xl flex mx-auto p-20 text-xl search-div">
                <input
                    type="text"
                    className="w-full placeholder-gray-400 text-gray-900 p-4 search-input"
                    placeholder="Search"
                    onChange={search}
                    value={query}
                />
                {/* <button className="bg-white p-4 search-button">🔍</button> */}
            </div>
            <div className="scroll-div">
                <InfiniteScroll

                    dataLength={movies.length}
                    next={fetchMoreData}
                    style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'left' }} //To put endMessage and loader to the top.
                    //inverse={true} //
                    hasMore={false}
                    loader={<h4>Loading...</h4>}
                //scrollableTarget="scrollableDiv"
                >

                    {
                        movies.length > 0
                            ? movies.map(
                                (movie) =>
                                    <Movie key={movie.id} newMovie={movie} />
                            )
                            : "No Data"
                    }


                </InfiniteScroll>
            </div>
        </div>
    );
}
export default Home;