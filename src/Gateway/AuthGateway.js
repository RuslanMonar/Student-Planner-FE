import { api } from './../Config/Axios';

const SignUp = (firstName, lastName, email, password) => {
    let data = { firstName, lastName, email, password };
    return api().post("Auth/register", data)
      .then((response) => {
        if (response.data.token) AddToStorage(response.data.token);     
        return response;
      });
  };
  
  const SignIn = (email, password) => {
    let data = {email, password };
    return api().post("Auth/login", data)
      .then((response) => {
        if (response.data.token) AddToStorage(response.data.token);   
        return response;
      });
};

const AddToStorage = (token) => {
    localStorage.setItem("user", JSON.stringify(token));
  }
export default {
    SignUp,
    SignIn
  };