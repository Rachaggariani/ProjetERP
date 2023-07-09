import React from 'react'
import { Outlet } from 'react-router-dom';

function LoginLayout() {
  return (
    <div className="form">
    
    <div className="form-container" style={{marginLeft:100, width:750}}>
        <div className="form-form">
            <div className="form-form-wrap">
                <div className="form-container">
                    <div className="form-content">

                        <h1 className="" style={{"marginBottom":"90px" ,marginLeft:109}}>Welcome Back to <a href="#"><span className="brand-name">DAWARJI</span></a></h1>
                         
                         <Outlet/>                       
                        <p className="terms-conditions">© 2023 All Rights Reserved. <a href="#">DAWARJI</a> is a product of NOMADIS. <a href={{javascript:void(0)}}>Cookie Preferences</a>, <a href={{javascript:void(0)}}>Privacy</a>, and <a href={{javascript:void(0)}}>Terms</a>.</p>

                    </div>                    
                </div>
            </div>
        </div>
        <div className="form-image">
            <div className="l-image">
            </div>
        </div>
    </div>

    </div>
  )
}

export default LoginLayout;