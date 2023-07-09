import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPass } from "../../ReduxToolkit/api";

function ResetPassword() {
  const [password, setPassword] = useState({
    pass: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = async (e) => {
    e.preventDefault();
    if (password.pass === password.confirmPassword) {
      const apiResponse = await resetPass(id, password.pass);
      console.log("api resp", apiResponse);
      if (apiResponse.status === 200) {
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Password not match");
    }
  };
  return (
    <div className="form" style={{marginLeft:450}}>
      <div className="form-container1 outer">
        <div className="form-form1">
          <div className="form-form-wrap1">
            <div className="form-container1" style={{width:700}}>
              <div className="form-content1">
                <h1 className="">Welcome Back !</h1>
                <p className="signup-link1 register1">
                  Change your password in easy way{" "}
                  <a href="auth_login_boxed.html">Log in</a>
                </p>
                <form className="text-left formulaire">
                  <div className="form ">
                    <div id="email-field" className="field-wrapper1 input">
                      <label htmlFor="password">PASSWORD</label>
                      <div>
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
                      style={{marginTop:20}}
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      id="password1"
                      name="password"
                      type="text"
                      className="form-control"
                      placeholder="New password"
                      onChange={(e) =>
                        setPassword({ ...password, pass: e.target.value })
                      }
                    />
                      </div>
                     
                    </div>
                    
                  </div>
                  <div id="email-field" className="field-wrapper1 input">
                      <label htmlFor="password">CONFIRM PASSWORD</label>
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
                        style={{marginTop:20}}
                      >
                        <rect
                          x="3"
                          y="11"
                          width="18"
                          height="11"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input
                        id="password1"
                        name="password"
                        type="text"
                        className="form-control"
                        placeholder="Confirm your password"
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="d-sm-flex justify-content-between">
                      <div className="field-wrapper1 confirm1">
                        <button
                          className="btn btn-primary"
                          onClick={(e) => handleClick(e)}
                        >
                          Reset password
                        </button>
                      </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
