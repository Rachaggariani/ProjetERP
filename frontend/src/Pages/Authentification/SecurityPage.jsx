import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyOtp } from "../../ReduxToolkit/api";
import { toast } from "react-toastify";

function SecurityPage() {
  const inputRefs = useRef([]);
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    let otp = "";
    inputRefs.current.forEach((input) => {
      otp += input.value;
    });

    const apiResponse = await verifyOtp(otp, id);

    console.log("resp", apiResponse);
    const idUser = apiResponse.data;

    if (apiResponse.status === 200) {
      navigate(`/reset_password/${idUser}`);
    } else {
      toast("Wrong OTP!");
    }
  };
  return (
    <div className="containe2">
      <br />
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto my-auto">
          <div className="card">
            <div className="card-body   text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                className="rounded-circle avatar-lg img-thumbnail mb-4"
                alt="profile-image"
              />
              <h2 className="text-info">2FA Security</h2>
              <p className="mb-4">
                Enter 6-digits code from your athenticatior app.
              </p>
              <form>
                <div className="row mb-4">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      className="col-lg-2 col-md-2 col-2 ps-0 ps-md-2"
                      key={i}
                    >
                      <input
                        type="text"
                        className="form-control text-lg text-center"
                        placeholder="_"
                        aria-label="2fa"
                        ref={(el) => (inputRefs.current[i] = el)}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    className="btn bg-info btn-lg my-4"
                    onClick={handleClick}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;
