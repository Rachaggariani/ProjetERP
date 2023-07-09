import React from "react";

function DetailUser({ user }) {
  return (
    <div className="container2 ">
      <div className="row" style={{"marginTop":"90px","marginBottom":"220px","width":1350,"marginLeft":70}}>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 ">
          <div className="card h-100 ">
            <div className="card-body ">
              <div className="account-settings2 ">
                <div className="user-profile2">
                  <div className="user-avatar">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Maxwell Admin"
					  width={290}
					  
                    />
                  </div>
                  <h5 className="user-name2">Yuki Hayashi</h5>
                  <h6 className="user-email2">yuki@Maxwell.com</h6>
                </div>
                <div className="about2">
                  <h5>About</h5>
                  <p>
                    I'm Yuki. Full Stack Designer I enjoy creating user-centric,
                    delightful and human experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 text-primary">Personal Details</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="fullName"
                      placeHolder="Enter full name"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="eMail"
                      placeHolder="Enter email ID"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      placeHolder="Enter phone number"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="website">Website URL</label>
                    <input
                      type="url"
                      class="form-control"
                      id="website"
                      placeHolder="Website url"
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mt-3 mb-2 text-primary">Address</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="Street">Street</label>
                    <input
                      type="name"
                      class="form-control"
                      id="Street"
                      placeHolder="Enter Street"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="ciTy">City</label>
                    <input
                      type="name"
                      class="form-control"
                      id="ciTy"
                      placeHolder="Enter City"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="sTate">State</label>
                    <input
                      type="text"
                      class="form-control"
                      id="sTate"
                      placeHolder="Enter State"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="zIp">Zip Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="zIp"
                      placeHolder="Zip Code"
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-secondary"
                      style={{marginRight:13}}
                    >
                    Previous
                    </button>
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      className="btn btn-primary"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailUser;
