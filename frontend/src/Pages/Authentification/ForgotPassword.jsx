import { useState, React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPass } from "../../ReduxToolkit/api";
import { toast } from "react-toastify";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const navigate = useNavigate();
  const handleClick = async () => {
    const resetEmail = { email: email };
    const apiResponse = await forgotPass(resetEmail);
    console.log("last resp", apiResponse.data);

    if (apiResponse.status === 200) {
      navigate(`/otp/${apiResponse.data}`);
    } else {
      toast("probleme with the email !");
    }
  };

  return (
    <div className="">
      <div className="contained">
        <div className="">
          <div className="form1">
            <div className="">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                width="180"
                className="img-thumbnail logo img-circle image"
              />
              <h2>Forgot your password?</h2>
              <p>
                Change your password in three easy steps. This helps to keep
                your new password secure.
              </p>
              <ol className="list-unstyled list">
                <li>
                  <span className="text-primary text-medium">1. </span>Fill in
                  your email address below.
                </li>
                <li>
                  <span className="text-primary text-medium">2. </span>We'll
                  email you a temporary code.
                </li>
                <li>
                  <span className="text-primary text-medium">3. </span>Use the
                  code to change your password on our secure website.
                </li>
              </ol>
              <div className="container padding-bottom-3x mb-2"></div>

              <div className="panel-body">
                <fieldset>
                  <div className="form-group">
                    <input
                      className="form-control input-lg"
                      placeholder="E-mail Address"
                      name="email"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    onClick={() => handleClick()}
                  >
                    SEND ME PASSWORD
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
