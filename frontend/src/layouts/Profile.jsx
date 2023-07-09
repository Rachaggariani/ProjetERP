import React from 'react'
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
function Profile() {
  return (

    <div className="containe1 ">
    <div className="row styleP">
      <div className="col-md-12">
        <div className="grid1 profile1">
          <div className="grid-header2  ">
            <div className="">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt=""
                className="imageProf"
              />
            </div>
            <div className="styleProf ">
              <h3>John Doe</h3>
              <p>@bootdey</p>
              <p>Website Developer, Programmer</p>
              <p>Bootdey City, NY, USA</p>
            </div>
            <div className="everyone ">
              <p>
                <a href="#" title="Everyone can see your profile">
                  <i className="fa fa-globe"></i> Everyone
                </a>
              </p>
            </div>
          </div>
          <div className="grid-body">
            <ul className="nav nav-tabs  ">
              <li className="nav-item">
                <Link to="profilePage"
                  className="nav-link active"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="true"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="sous_societe"
                  className="nav-link "
                  id="home-tab"
                  data-toggle="tab"
                  href="#timeline"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                >
                  Sous societes
                </Link>
              </li>           
            </ul>
            <Outlet/>

    <div className="tab-content">
    <div className="tab-pane active" id="profile">
    
    </div>
    </div>
          </div>

          
        </div>
        
      </div>
      
    </div>
    
  </div>

   
  )
}

export default Profile