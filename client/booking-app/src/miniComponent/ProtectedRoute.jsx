import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLogin } from "../redux/reducers/user";
const ProtectedRoute = ({ isPublic, element: Component, ...rest }) => {
  const authToken = Cookies.get("authtoken");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogin(authToken ? true : false));
  }, [authToken, dispatch]);
  if (isPublic) {
    return authToken ? <Navigate to="/" /> : <Component {...rest} />;
  }
  return authToken ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
