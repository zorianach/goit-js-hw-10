import axios from "axios";
// const BASE_URL = "https://thecatapi.com/v1";
    // const END_POINT1 = "/breeds";
    // const END_POINT2 = "/images/search"
    // const API_KEY = "live_2AviB8bDwzrA05oBtzf7rLMyY5XSYfJFVNOsB27Jytz0YPqTLxbpZPP3ZryX15mm";

axios.defaults.headers.common["x-api-key"] = "live_2AviB8bDwzrA05oBtzf7rLMyY5XSYfJFVNOsB27Jytz0YPqTLxbpZPP3ZryX15mm";


function fetchBreeds(){
    return axios.get("https://api.thecatapi.com/v1/breeds")
    // return fetch(`${BASE_URL}/breeds?x-api_key=${API_KEY}`) 
        .then(response => {
            console.log(response);
            if (response.status !== 200) {
                throw new Error (response.status);}
            return response.data;
        
        }) 
};


function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    // return fetch(`${BASE_URL}/images/search?x-api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (response.status !== 200) {
            throw new Error (response.status);
            }
        return response.data;
      });
    };

export {fetchBreeds, fetchCatByBreed};
