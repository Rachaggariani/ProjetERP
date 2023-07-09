import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../ReduxToolkit/Features/AuthSlice";
import { toast } from "react-toastify";

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
 
  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  
  useEffect(() => {
    error && toast.error(error);
  }, [error]);


  const handleChange = (e) => {
    setUser((elt) => ({ ...elt, [e.target.name]: e.target.value }));
  };
  const handleSubmite = async (e) => {
    e.preventDefault();
    if (user) {
      dispatch(login({ user, navigate, toast }));
    }
  };

  return (
    <div style={{ width:750, marginLeft:20}}>
      <form className="text-left">
        <div className="form">
          <div id="username-field" className="field-wrapper input" style={{width:650}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="xxx@clediss.com"
              onChange={(e) => handleChange(e)}
            
            />
          </div>

          
          
        </div>

        <div id="password-field" className="field-wrapper input mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-lock"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
             
            />
          </div>
        <div className="d-sm-flex justify-content-between" style={{marginTop:20}}>
            <div className="field-wrapper toggle-pass">
              <p className="d-inline-block">Show Password</p>
              <label className="switch s-primary">
                <input
                  type="checkbox"
                  checked={showPassword}
                  id="toggle-password"
                  className="d-none"
                  onChange={handleShowPassword}
                />
                <span className="slider round" />
              </label>
            </div>

            <div className="field-wrapper">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmite}
              >
                Log In
              </button>
            </div>
          </div>

          <div className="field-wrapper">
            <Link to="/forget_password" className="forgot-pass-link">
              Forgot Password?
            </Link>
          </div>
      </form>
      
    </div>
  );
}

export default Auth;
