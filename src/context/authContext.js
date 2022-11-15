import { useReducer, createContext } from "react";
import Cookies from "js-cookie";

import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (Cookies.get("token")) {
  const decodedToken = jwtDecode(Cookies.get("token"));

  if (decodedToken.exp * 1000 < Date.now()) {
    Cookies.remove("token");
  } else {
    initialState.user = decodedToken;
    Cookies.set("owner", decodedToken.user_id);
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    Cookies.set("token", userData.token, { expires: 1 });
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
