import React from "react";
import { BASE_URL } from "../Services/Config";
import axios from "axios";

// const api=axios.create({
//     base=BASE_URL,
// });

const SetAuthToken=(JwtToken)={
//   if(JwtToken){
//     api.defaults.headers.common['Authorization']=`Bearer ${JwtToken}`;

//   }
// //   else{
// //     delete api.defaults.headers.common['Authorization'];
// //   }
 }
export {api,SetAuthToken};