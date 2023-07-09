import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSociete } from "../../ReduxToolkit/Features/SocieteSlice";
function ProfilePage() {

  const societeData = useSelector((state) => state.societe.societe);

  const dispatch = useDispatch();

  useEffect(() => {
   

   dispatch(fetchSociete()) 
 
  }, [dispatch]);

  return (
    
    <div>
      <p className="lead myprofile">My Profile</p>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <p>
            <strong>Email:</strong>{" "}
            <a href="/cdn-cgi/l/email-protection#f298859b9e9e9b939f81b2959f939b9edc919d9f">
              <span
                className="__cf_email__"
                data-cfemail="73111c1c0717160a33111c1c0717160a5d101c1e"
              >
                {societeData.email}
              </span>
            </a>
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href="jwilliams.com">bootdey.com</a>
          </p>
          <p>
            <strong>About:</strong> Web Designer / UI Designer
          </p>
          <p>
            <strong>Joined on:</strong> July 24<sup>th</sup>, 2010
          </p>
          <p>
            <strong>Hobbies:</strong> Read books, hang out, learn
            history, making website
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            <span className="label label-primary">HTML</span>,{" "}
            <span className="label label-primary">CSS</span>,{" "}
            <span className="label label-primary">JAVASCRIPT</span>,{" "}
            <span className="label label-primary">JQUERY</span>,{" "}
            <span className="label label-primary">AJAX</span>,{" "}
            <span className="label label-primary">PHP</span>,{" "}
            <span className="label label-primary">RUBY</span>,{" "}
            <span className="label label-primary">PHYTON</span>,{" "}
            <span className="label label-primary">C</span>
          </p>
        </div>
        <div className="col-md-6">
          <p>
            <strong>Address:</strong> bootdey City, NY, USA
          </p>
          <p>
            <strong>Phone:</strong> (123) 456-5644
          </p>
          <p>
            <strong>Phone + Ext:</strong> (123) 1111-2222 1111
          </p>
          <p>
            <strong>Reputation:</strong>{" "}
            <span className="text-green">
              <i className="fa fa-angle-up"></i> 2000
            </span>
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            <span className="text-yellow">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </span>
          </p>
        </div>
        <div style={{width:1580, marginLeft: 10}}>
        <div className="row ">
        
                  <div className="col-sm-4 stats" >
                    <h1>46,2K</h1>
                    <span>Followes</span>
                    <Link to="/clients" className="btn btn-success">
                      <i className="fa fa-plus-circle"></i> Clients
                    </Link>
                  </div>
                  <div className="col-sm-4 stats">
                    <h1>127</h1>
                    <span>Following</span>
                    <Link to="/utilisateurs" className="btn btn-info">
                    <i className="fa fa-plus-circle"></i> utilisateurs
                    </Link>
                  </div>
                  <div className="col-sm-4 stats">
                    <h1>10,9K</h1>
                    <span>Subscribers</span>
                    <button className="btn btn-danger">
                      <i className="fa fa-rss"></i> Subscribe
                    </button>
                  </div>
                </div>
                </div>
      
    </div>

    

    
  </div>
  );
}

export default ProfilePage;
