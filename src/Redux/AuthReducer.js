import jwt_decode from "jwt-decode";

export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const LOGOUT = "LOGOUT";

var user = JSON.parse(localStorage.getItem("user"));
var initialState = { isLoggedIn: false, user: null};



if (user) {
  user = jwt_decode(user);
  user = { name: user.username, id: user.id, email: user.email};
  
  initialState = { isLoggedIn: true, user };
}

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};