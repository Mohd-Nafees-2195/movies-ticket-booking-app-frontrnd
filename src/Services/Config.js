import axios from "axios";
export const BASE_URL='http://localhost:8081'; //url http://localhost:8081

export let JWTTOKEN=null
export let emailId=null

export  const myAxios=axios.create({
    baseURL:BASE_URL,
});

export let myJwtToken=axios.create({
  jwtToken:JWTTOKEN,
});

export let currentUserEamil=axios.create({
    currentUserEamil:emailId,
});
