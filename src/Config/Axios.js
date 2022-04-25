import axios from "axios";
import { API_URL } from "./GlobalVariables";


// ------- Setting for Axios -------
export function api() {
  var user = localStorage.getItem("user");

  const api = axios.create({
    baseURL: API_URL,
    //withCredentials: true,
    headers: {
      Authorization: !user ? null : 'Bearer ' + user.replace(/['"]+/g, '')
    }
  });
  return api;
}