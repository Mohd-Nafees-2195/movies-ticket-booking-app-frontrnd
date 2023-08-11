import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Services/Config';
import Movie from './Movie';

const SearchBar = () => {

    const [query, setQuery] = useState("");
    const [movies,setMovies]=useState([]);

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
        authAxios.get(`/user/get-searched-movies?title=${query}`).then(
            (response)=>{
                setMovies(response.data)
                console.log(response);
            },(error)=>{
                console.log(error);
            }
        );
    }

    return (
        <div className="w-full max-w-xl flex mx-auto p-20 text-xl">
            <input
                type="text"
                className="w-full placeholder-gray-400 text-gray-900 p-4"
                placeholder="Search"
                onChange={search}
                value={query}
            />
            {/* <button className="bg-white p-4">🔍</button>
            {
                    movies.length>0
                    ?
                    movies.map(
                        (movie) =>
                            <Movie key={movie.id} newMovie={movie} />
                    )
                    :"No Result Found"
                } */}
        </div>
    );
};

export default SearchBar;