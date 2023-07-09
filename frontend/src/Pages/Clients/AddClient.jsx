import React from 'react'

function AddClient() {
  return (
    <div className="main-content">
    <div className="layout-px-spacing">                
            
        <div className="account-settings-container layout-top-spacing">

            <div className="account-content">
                <div className="scrollspy-example" data-spy="scroll" data-target="#account-settings-scroll" data-offset="-100">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="general-info" className="section general-info">
                                <div className="info">
                                    <h6 className="">General Information</h6>
                                    <div className="row">
                                        <div className="col-lg-11 mx-auto">
                                            <div className="row">
                                                <div className="col-xl-2 col-lg-12 col-md-4">
                                                    <div className="upload mt-4 pr-md-4">
                                                        <input type="file" id="input-file-max-fs" className="dropify" data-default-file="assets/img/200x200.jpg" data-max-file-size="2M" />
                                                        <p className="mt-2"><i className="flaticon-cloud-upload mr-1"></i> Upload Picture</p>
                                                    </div>
                                                </div>
                                                <div className="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                                                    <div className="form">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="fullName">Full Name</label>
                                                                    <input type="text" className="form-control mb-4" id="fullName" placeholder="Full Name" defaultValue="Jimmy Turner"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <label className="dob-input">Date of Birth</label>
                                                                <div className="d-sm-flex d-block">
                                                                    <div className="form-group mr-1">
                                                                        <select className="form-control" id="exampleFormControlSelect1">
                                                                          <option>Day</option>
                                                                          <option>1</option>
                                                                          <option>2</option>
                                                                          <option>3</option>
                                                                          <option>4</option>
                                                                          <option>5</option>
                                                                          <option>6</option>
                                                                          <option>7</option>
                                                                          <option>8</option>
                                                                          <option>9</option>
                                                                          <option>10</option>
                                                                          <option>11</option>
                                                                          <option>12</option>
                                                                          <option>13</option>
                                                                          <option>14</option>
                                                                          <option>15</option>
                                                                          <option>16</option>
                                                                          <option>17</option>
                                                                          <option>18</option>
                                                                          <option>19</option>
                                                                          
                                                                          <option>21</option>
                                                                          <option>22</option>
                                                                          <option>23</option>
                                                                          <option>24</option>
                                                                          <option>25</option>
                                                                          <option>26</option>
                                                                          <option>27</option>
                                                                          <option>28</option>
                                                                          <option>29</option>
                                                                          <option>30</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group mr-1">
                                                                        <select className="form-control" id="month">
                                                                            <option>Month</option>
                                                                          
                                                                            <option>Feb</option>
                                                                            <option>Mar</option>
                                                                            <option>Apr</option>
                                                                            <option>May</option>
                                                                            <option>Jun</option>
                                                                            <option>Jul</option>
                                                                            <option>Aug</option>
                                                                            <option>Sep</option>
                                                                            <option>Oct</option>
                                                                            <option>Nov</option>
                                                                            <option>Dec</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group mr-1">
                                                                        <select className="form-control" id="year">
                                                                          <option>Year</option>
                                                                          <option>2018</option>
                                                                          <option>2017</option>
                                                                          <option>2016</option>
                                                                          <option>2015</option>
                                                                          <option>2014</option>
                                                                          <option>2013</option>
                                                                          <option>2012</option>
                                                                          <option>2011</option>
                                                                          <option>2010</option>
                                                                          <option>2009</option>
                                                                          <option>2008</option>
                                                                          <option>2007</option>
                                                                          <option>2006</option>
                                                                          <option>2005</option>
                                                                          <option>2004</option>
                                                                          <option>2003</option>
                                                                          <option>2002</option>
                                                                          <option>2001</option>
                                                                          <option>2000</option>
                                                                          <option>1999</option>
                                                                          <option>1998</option>
                                                                          <option>1997</option>
                                                                          <option>1996</option>
                                                                          <option>1995</option>
                                                                          <option>1994</option>
                                                                          <option>1993</option>
                                                                          <option>1992</option>
                                                                          <option>1991</option>
                                                                          <option>1990</option>
                                                                        
                                                                          <option>1988</option>
                                                                          <option>1987</option>
                                                                          <option>1986</option>
                                                                          <option>1985</option>
                                                                          <option>1984</option>
                                                                          <option>1983</option>
                                                                          <option>1982</option>
                                                                          <option>1981</option>
                                                                          <option>1980</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="profession">Profession</label>
                                                            <input type="text" className="form-control mb-4" id="profession" placeholder="Designer" defaultValue="Web Developer"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="about" className="section about">
                                <div className="info">
                                    <h5 className="">About</h5>
                                    <div className="row">
                                        <div className="col-md-11 mx-auto">
                                            <div className="form-group">
                                                <label htmlFor="aboutBio">Bio</label>
                                                <textarea className="form-control" id="aboutBio" placeholder="Tell something interesting about yourself" rows="10"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="work-platforms" className="section work-platforms">
                                <div className="info">
                                    <h5 className="">Work Platforms</h5>
                                    <div className="row">
                                        <div className="col-md-12 text-right mb-5">
                                            <button id="add-work-platforms" className="btn btn-primary">Add</button>
                                        </div>
                                        <div className="col-md-11 mx-auto">

                                            <div className="platform-div">
                                                <div className="form-group">
                                                    <label htmlFor="platform-title">Platforms Title</label>
                                                    <input type="text" className="form-control mb-4" id="platform-title" placeholder="Platforms Title" defaultValue="Web Design" />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="platform-description">Description</label>
                                                    <textarea className="form-control mb-4" id="platform-description" placeholder="Platforms Description" rows="10"></textarea>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="contact" className="section contact">
                                <div className="info">
                                    <h5 className="">Contact</h5>
                                    <div className="row">
                                        <div className="col-md-11 mx-auto">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="country">Country</label>
                                                        <select className="form-control" id="country">
                                                            <option>All Countries</option>
                                                            
                                                            <option>India</option>
                                                            <option>Japan</option>
                                                            <option>China</option>
                                                            <option>Brazil</option>
                                                            <option>Norway</option>
                                                            <option>Canada</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="address">Address</label>
                                                        <input type="text" className="form-control mb-4" id="address" placeholder="Address" defaultValue="New York" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="location">Location</label>
                                                        <input type="text" className="form-control mb-4" id="location" placeholder="Location"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Phone</label>
                                                        <input type="text" className="form-control mb-4" id="phone" placeholder="Write your phone number here" defaultValue="+1 (530) 555-12121"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input type="text" className="form-control mb-4" id="email" placeholder="Write your email here" defaultValue="Jimmy@gmail.com"/>
                                                    </div>
                                                </div>                                    
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="website1">Website</label>
                                                        <input type="text" className="form-control mb-4" id="website1" placeholder="Write your website here"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="social" className="section social">
                                <div className="info">
                                    <h5 className="">Social</h5>
                                    <div className="row">

                                        <div className="col-md-11 mx-auto">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-group social-linkedin mb-3">
                                                        <div className="input-group-prepend mr-3">
                                                            <span className="input-group-text" id="linkedin"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="linkedin Username" aria-label="Username" aria-describedby="linkedin" defaultValue="jimmy_turner"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="input-group social-tweet mb-3">
                                                        <div className="input-group-prepend mr-3">
                                                            <span className="input-group-text" id="tweet"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Twitter Username" aria-label="Username" aria-describedby="tweet" defaultValue="@jTurner"/>
                                                    </div>
                                                </div>                                                        
                                            </div>
                                        </div>

                                        <div className="col-md-11 mx-auto">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="input-group social-fb mb-3">
                                                        <div className="input-group-prepend mr-3">
                                                            <span className="input-group-text" id="fb"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Facebook Username" aria-label="Username" aria-describedby="fb" defaultValue="Jimmy Turner"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="input-group social-github mb-3">
                                                        <div className="input-group-prepend mr-3">
                                                            <span className="input-group-text" id="github"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></span>
                                                        </div>
                                                        <input type="text" className="form-control" placeholder="Github Username" aria-label="Username" aria-describedby="github" defaultValue="@TurnerJimmy"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <div id="skill" className="section skill">
                                <div className="info">
                                    <h5 className="">Skills</h5>
                                    <div className="row progress-bar-section">

                                        <div className="col-md-12 mx-auto">
                                            <div className="form-group">

                                                <div className="row">
                                                    <div className="col-md-11 mx-auto">
                                                        <div className="input-form">
                                                            <input type="text" className="form-control" id="skills" placeholder="Add Your Skills Here" defaultValue=""/>
                                                            <button id="add-skills" className="btn btn-primary">Add</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="col-md-11 mx-auto">
                                            <div className="custom-progress top-right progress-up" style={{width: "100%"}}>
                                                <p className="skill-name">PHP</p>
                                                <input type="range" min="0" max="100" className="custom-range progress-range-counter" defaultValue="25"/>
                                                <div className="range-count"><span className="range-count-number" data-rangecountnumber="25">25</span> <span className="range-count-unit">%</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-11 mx-auto">
                                            <div className="custom-progress top-right progress-up" style={{width: "100%"}}>
                                                <p className="skill-name">Wordpress</p>
                                                <input type="range" min="0" max="100" className="custom-range progress-range-counter" defaultValue="50"/>
                                                <div className="range-count"><span className="range-count-number" data-rangecountnumber="50">50</span> <span className="range-count-unit">%</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-11 mx-auto">
                                            <div className="custom-progress top-right progress-up"  style={{width: "100%"}}>
                                                <p className="skill-name">Javascript</p>
                                                <input type="range" min="0" max="100" className="custom-range progress-range-counter" defaultValue="70"/>
                                                <div className="range-count"><span className="range-count-number" data-rangecountnumber="70">70</span> <span className="range-count-unit">%</span></div>
                                            </div>
                                        </div>
                                        <div className="col-md-11 mx-auto">
                                            <div className="custom-progress top-right progress-up"  style={{width: "100%"}}>
                                                <p className="skill-name">jQuery</p>
                                                <input type="range" min="0" max="100" className="custom-range progress-range-counter" defaultValue="60"/>
                                                <div className="range-count"><span className="range-count-number" data-rangecountnumber="60">60</span> <span className="range-count-unit">%</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="edu-experience" className="section edu-experience">
                                <div className="info">
                                    <h5 className="">Education</h5>
                                    <div className="row">
                                        <div className="col-md-12 text-right mb-5">
                                            <button id="add-education" className="btn btn-primary">Add</button>
                                        </div>
                                        <div className="col-md-11 mx-auto">

                                            <div className="edu-section">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="degree1">Enter Your Collage Name</label>
                                                            <input type="text" className="form-control mb-4" id="degree1" placeholder="Add your education here" defaultValue="Royal Collage of Art Designer Illustrator"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Starting From</label>

                                                                    <div className="row">

                                                                        <div className="col-md-6">
                                                                            <select className="form-control mb-4" id="s-from1">
                                                                                <option>Month</option>
                                                                                <option>Jan</option>
                                                                                <option>Feb</option>
                                                                                <option>Mar</option>
                                                                                <option>Apr</option>
                                                                                
                                                                                <option>Jun</option>
                                                                                <option>Jul</option>
                                                                                <option>Aug</option>
                                                                                <option>Sep</option>
                                                                                <option>Oct</option>
                                                                                <option>Nov</option>
                                                                                <option>Dec</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <select className="form-control mb-4" id="s-from2">
                                                                                <option>Year</option>
                                                                                <option>2020</option>
                                                                                <option>2019</option>
                                                                                <option>2018</option>
                                                                                <option>2017</option>
                                                                                <option>2016</option>
                                                                                <option>2015</option>
                                                                                <option>2014</option>
                                                                                <option>2013</option>
                                                                                <option>2012</option>
                                                                                <option>2011</option>
                                                                                <option>2010</option>
                                                                                
                                                                                <option>2008</option>
                                                                                <option>2007</option>
                                                                                <option>2006</option>
                                                                                <option>2005</option>
                                                                                <option>2004</option>
                                                                                <option>2003</option>
                                                                                <option>2002</option>
                                                                                <option>2001</option>
                                                                                <option>2000</option>
                                                                                <option>1999</option>
                                                                                <option>1998</option>
                                                                                <option>1997</option>
                                                                                <option>1996</option>
                                                                                <option>1995</option>
                                                                                <option>1994</option>
                                                                                <option>1993</option>
                                                                                <option>1992</option>
                                                                                <option>1991</option>
                                                                                <option>1990</option>
                                                                            </select>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Ending In</label>

                                                                    <div className="row">

                                                                        <div className="col-md-6 mb-4">
                                                                            <select className="form-control" id="end-in1">
                                                                                <option>Month</option>
                                                                                <option>Jan</option>
                                                                                <option>Feb</option>
                                                                                <option>Mar</option>
                                                                                <option>Apr</option>
                                                                                <option>May</option>
                                                                                <option>Jun</option>
                                                                                <option>Jul</option>
                                                                                <option>Aug</option>
                                                                                <option>Sep</option>
                                                                                <option>Oct</option>
                                                                                <option>Nov</option>
                                                                                <option>Dec</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <select className="form-control input-sm" id="end-in2">
                                                                                <option>Year</option>
                                                                                <option>2020</option>
                                                                                <option>2019</option>
                                                                                <option>2018</option>
                                                                                <option>2017</option>
                                                                                <option>2016</option>
                                                                                <option>2015</option>
                                                                                <option>2014</option>
                                                                                <option>2013</option>
                                                                                <option>2012</option>
                                                                                <option>2011</option>
                                                                                <option>2010</option>
                                                                                <option>2009</option>
                                                                                <option>2008</option>
                                                                                <option>2007</option>
                                                                                <option>2006</option>
                                                                                <option>2005</option>
                                                                                <option>2004</option>
                                                                                <option>2003</option>
                                                                                <option>2002</option>
                                                                                <option>2001</option>
                                                                                <option>2000</option>
                                                                                <option>1999</option>
                                                                                <option>1998</option>
                                                                                <option>1997</option>
                                                                                <option>1996</option>
                                                                                <option>1995</option>
                                                                                <option>1994</option>
                                                                                <option>1993</option>
                                                                                <option>1992</option>
                                                                                <option>1991</option>
                                                                                <option>1990</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <textarea className="form-control" placeholder="Description" rows="10"></textarea>
                                                    </div>

                                                </div>
                                                
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                            <form id="work-experience" className="section work-experience">
                                <div className="info">
                                    <h5 className="">Work Experience</h5>
                                    <div className="row">
                                        <div className="col-md-12 text-right mb-5">
                                            <button id="add-work-exp" className="btn btn-primary">Add</button>
                                        </div>
                                        <div className="col-md-11 mx-auto">

                                            <div className="work-section">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="degree2">Company Name</label>
                                                            <input type="text" className="form-control mb-4" id="degree2" placeholder="Add your work here" defaultValue="Netfilx Inc."/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="degree3">Job Tilte</label>
                                                                    <input type="text" className="form-control mb-4" id="degree3" placeholder="Add your work here" defaultValue=""/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="degree4">Location</label>
                                                                    <input type="text" className="form-control mb-4" id="degree4" placeholder="Add your work here" defaultValue=""/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Starting From</label>

                                                                    <div className="row">

                                                                        <div className="col-md-6">
                                                                            <select className="form-control mb-4" id="wes-from1">
                                                                                <option>Month</option>
                                                                                <option>Jan</option>
                                                                                <option>Feb</option>
                                                                                <option>Mar</option>
                                                                                <option>Apr</option>
                                                                                <option>May</option>
                                                                                <option>Jun</option>
                                                                                <option>Jul</option>
                                                                                <option>Aug</option>
                                                                                <option>Sep</option>
                                                                                <option>Oct</option>
                                                                                <option>Nov</option>
                                                                                <option>Dec</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <select className="form-control mb-4" id="wes-from2">
                                                                                <option>Year</option>
                                                                                <option>2020</option>
                                                                                <option>2019</option>
                                                                                <option>2018</option>
                                                                                <option>2017</option>
                                                                                <option>2016</option>
                                                                                <option>2015</option>
                                                                                <option>2014</option>
                                                                                <option>2013</option>
                                                                                <option>2012</option>
                                                                                <option>2011</option>
                                                                                <option>2010</option>
                                                                                <option>2009</option>
                                                                                <option>2008</option>
                                                                                <option>2007</option>
                                                                                <option>2006</option>
                                                                                <option>2005</option>
                                                                                <option>2004</option>
                                                                                <option>2003</option>
                                                                                <option>2002</option>
                                                                                <option>2001</option>
                                                                                <option>2000</option>
                                                                                <option>1999</option>
                                                                                <option>1998</option>
                                                                                <option>1997</option>
                                                                                <option>1996</option>
                                                                                <option>1995</option>
                                                                                <option>1994</option>
                                                                                <option>1993</option>
                                                                                <option>1992</option>
                                                                                <option>1991</option>
                                                                                <option>1990</option>
                                                                            </select>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label>Ending In</label>

                                                                    <div className="row">

                                                                        <div className="col-md-6 mb-4">
                                                                            <select className="form-control" id="eiend-in1">
                                                                                <option>Month</option>
                                                                                <option>Jan</option>
                                                                                <option>Feb</option>
                                                                                <option>Mar</option>
                                                                                <option>Apr</option>
                                                                                <option>May</option>
                                                                                <option>Jun</option>
                                                                                <option>Jul</option>
                                                                                <option>Aug</option>
                                                                                <option>Sep</option>
                                                                                <option>Oct</option>
                                                                                <option>Nov</option>
                                                                                <option>Dec</option>
                                                                            </select>
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <select className="form-control input-sm" id="eiend-in2">
                                                                                <option>Year</option>
                                                                                <option>2020</option>
                                                                                <option>2019</option>
                                                                                <option>2018</option>
                                                                                <option>2017</option>
                                                                                <option>2016</option>
                                                                                <option>2015</option>
                                                                                <option>2014</option>
                                                                                <option>2013</option>
                                                                                <option>2012</option>
                                                                                <option>2011</option>
                                                                                <option>2010</option>
                                                                                <option>2009</option>
                                                                                <option>2008</option>
                                                                                <option>2007</option>
                                                                                <option>2006</option>
                                                                                <option>2005</option>
                                                                                <option>2004</option>
                                                                                <option>2003</option>
                                                                                <option>2002</option>
                                                                                <option>2001</option>
                                                                                <option>2000</option>
                                                                                <option>1999</option>
                                                                                <option>1998</option>
                                                                                <option>1997</option>
                                                                                <option>1996</option>
                                                                                <option>1995</option>
                                                                                <option>1994</option>
                                                                                <option>1993</option>
                                                                                <option>1992</option>
                                                                                <option>1991</option>
                                                                                <option>1990</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <textarea className="form-control" placeholder="Description" rows="10"></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="account-settings-footer">
                
                <div className="as-footer-container">

                    <button id="multiple-reset" className="btn btn-warning">Reset All</button>
                    <div className="blockui-growl-message">
                        <i className="flaticon-double-check"></i>&nbsp; Settings Saved Successfully
                    </div>
                    <button id="multiple-messages" className="btn btn-primary">Save Changes</button>

                </div>

            </div>
        </div>

        </div>
</div>
  )
}

export default AddClient