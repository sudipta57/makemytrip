import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../redux/reducers/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        formdata
      );

      Cookies.set("authtoken", res.data.authtoken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      dispatch(setLogin(true));
      setformdata({
        username: "",
        password: "",
        email: "",
      });
      navigate("/");
      return toast.success(res.data.message);
    } catch (error) {
      return toast.error(
        error.response?.data?.message || "something went wrong"
      );
    }
  };
  return (
    <>
      <div
        className="breadcumb-wrapper"
        style={{
          backgroundImage: "url('assets/img/breadcumb/breadcumb-bg.jpg')",
        }}
      >
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">Sign In</h1>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li>
                  <a href="index-2.html">Home</a>
                </li>
                <li>Sign In</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="signup-wrapper  space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 ">
              <form
                action="#"
                className="signup-form bg-smoke"
                onSubmit={handlesubmit}
              >
                <h2 className="form-title text-center mb-lg-35">Sign In</h2>
                <div className="form-group">
                  <label htmlFor="loginUserId" className="sr-only">
                    Username or email address*
                  </label>
                  <input
                    onChange={handlechange}
                    type="email"
                    className="form-control"
                    placeholder="Username or email address*"
                    id="loginUserId"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginUserPass" className="sr-only">
                    Password*
                  </label>
                  <input
                    onChange={handlechange}
                    type="password"
                    className="form-control"
                    placeholder="Password*"
                    id="loginUserPass"
                    name="password"
                    required
                  />
                </div>

                <div className="form-group mb-0 text-center">
                  <button
                    className="vs-btn mask-style1 w-100 style4"
                    type="submit"
                  >
                    Login
                  </button>
                  <div className="bottom-links link-inherit d-md-flex justify-content-between mt-3">
                    <a href="#" className="recovery-link mb-2 mb-md-0">
                      Forgot your password?
                    </a>
                    <Link to={"/signup"}>
                      <a href="sign-up.html">Or Create Account</a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
