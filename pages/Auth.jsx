import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Auth = ({ register }) => {
  const loginurl = "http://localhost:3600/api/user/login";
  const registerurl = "http://localhost:3600/api/user/register";
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
console.log(userDetails);

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = register ? registerurl : loginurl;
      const response = await axios.post(url, userDetails);

     
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
        if (register) {
          toast.success("Registration successful! Please log in.");
          navigate("/login");
        } else {
          toast.success("Login successful!");
          setTimeout(() => {
            navigate('/');
            window.location.reload(); 
          }, 2000);
        }
      }
    } catch (err) {
      setError(
        register
          ? "Registration failed. User might already exist."
          : "Invalid email or password."
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="container p-4">
        <div className="row mt-5">
          <div className="col-md-8 mt-5 justify-content-center align-items-center">
            <img
              className="img-fluid"
              width={"1700px"}
              src="https://images.unsplash.com/photo-1553729784-e91953dec042?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhZGluZyUyMGJvb2t8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>

          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="p-5 rounded mt-5 shadow">
              <h1 className="text-center text-dark">{register ? "REGISTER" : "LOGIN"}</h1>
              <p className="text-center">
                {register
                  ? "Explore popular blogs that inspire, educate, and entertain."
                  : "Explore popular blogs that inspire, educate, and entertain."}
              </p>

              {register && (
                <div className="mb-3 mt-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control"
                    required
                    value={userDetails.username}
                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                  />
                </div>
              )}

              <div className="mb-3 mt-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  required
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                />
              </div>

              <div className="mb-3 mt-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  required
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                />
              </div>

              <div className="mb-3">
                {!register ? (
                  <div>
                    <button type="submit" className="btn w-100 rounded-0 btn-dark">
                      Login
                    </button>
                    <p className="mt-3 text-center">
                      New User? Click here to{" "}
                      <Link to={"/register"} className="text-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <button type="submit" className="btn w-100 rounded-0 btn-dark">
                      Register
                    </button>
                    <p className="mt-3 text-center">
                      Already a User? Click here to{" "}
                      <Link to={"/login"} className="text-danger">
                        Login
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
