import AuthService from "../Gateway/AuthGateway";
import { SaveUserAction } from "../ActionsCreator/AuthActions";
import jwt_decode from "jwt-decode";

const SignUp = (Username, Email, Password) => (dispatch) => {
  return AuthService.SignUp(Username, Email, Password).then(
    (response) => {
      var user = GetUserInfoFromToken(response.data.token);
      dispatch(SaveUserAction({ user }));
      return Promise.resolve();
    },
    (error) => {
      return Promise.reject(ErrorBuilder(error));
    }
  );
};

const SignIn = (Email, Password) => (dispatch) => {
    return AuthService.SignIn(Email, Password).then(
      (response) => {
        var user = GetUserInfoFromToken(response.data.token);
        dispatch(SaveUserAction({ user }));
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(ErrorBuilder(error));
      }
    );
};

// ----- Additional functions
const GetUserInfoFromToken = (token) => {
    var user = jwt_decode(token);
    user = { name: user.unique_name, id: user.nameid, email: user.email };
    return user;
  };
  
  const ErrorBuilder = (error) => {
    const message =
      (error.response && error.response.data && error.response.data.errors) ||
      error.message ||
      error.toString();
    const code = error.response.status;
    return { message, code };
  };
  
export default {
    SignUp,
    SignIn
  };