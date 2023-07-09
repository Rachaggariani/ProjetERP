import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setUsersFailed, setUsersPending, setUsersSuccess } from "../../ReduxToolkit/Features/UserSlice";
import { toast } from "react-toastify";
function AddUser() {
 const navigate = useNavigate()
const [fileUpload, setFileUpload] = useState(null);
const [user, setUser] = useState({
  code:"",
  code_a_barre:"",
  nom:"",
  prenom:"",
  role_code:"",
  societe_code:"",
  cin:"",
  matricule:"",
  grade:"",
  type:"",
  soussociete_code:"",
  description:"",
  adresse:"",
  telephone:"",
  mobile:"",
  email:"",
  isactif:"",
  only_my_data:"",
  pre_commande:"",
  vente_comptoir:"",
  login:"",
  password:"",
  photo:"",
  region_code:"",
})

const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
const [roles,setRoles]=useState([]);
const [societes,setSocietes]=useState([]);
const [sousSocietes,setSousSocietes]=useState([]);
const [regions,setRegions]=useState([]);
useEffect(()=>{
  axios.get('/regions')
  .then(res=>{console.log("Getting data",res.data)
  setRegions(res.data)
}).catch(err=>console.log(err))
},[]);

useEffect(()=>{
  axios.get('/roles')
  .then(res=>{console.log("Getting data",res.data)
  setRoles(res.data)
}).catch(err=>console.log(err))
},[]);

useEffect(()=>{
  axios.get('/societe')
  .then(res=>{console.log("Getting data",res.data)
  setSocietes(res.data)
}).catch(err=>console.log(err))
},[]);

useEffect(()=>{
  axios.get('/soussocietes')
  .then(res=>{console.log("Getting data",res.data)
  setSousSocietes(res.data)
}).catch(err=>console.log(err))
},[]);



useEffect(() => {
  const fetchUsers = () => {
    dispatch(setUsersPending());
    axios
      .get("/users")
      .then((response) => {
        dispatch(setUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setUsersFailed(error.message));
      });
  };

  fetchUsers();
}, [dispatch]);

const [formErrors, setFormErrors] = useState({
  code:"",
code_a_barre:"",
nom:"",
prenom:"",
role_code:"",
societe_code:"",
cin:"",
matricule:"",
grade:"",
type:"",
soussociete_code:"",
telephone:"",
email:"",
isactif:"",
login:"",
password:"",
region_code:"",
});

const handleFileChange = (file)=>{
  setFileUpload(file)
}

const handleReset = () =>{
setUser({code:"",
code_a_barre:"",
nom:"",
prenom:"",
role_code:"",
societe_code:"",
cin:"",
matricule:"",
grade:"",
type:"",
soussociete_code:"",
description:"",
adresse:"",
telephone:"",
mobile:"",
email:"",
isactif:"",
only_my_data:"",
pre_commande:"",
vente_comptoir:"",
login:"",
password:"",
photo:"",
region_code:"",})
}

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUser((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  setFormErrors((prevState) => ({
    ...prevState,
    [name]: '',
  }));
};

  const handleSubmit = () => {
    // Create an object of formData
const formData = new FormData();
     
// Update the formData object
formData.append("images",fileUpload);
for (const key in user) {
  formData.append(key, user[key]);
}


if (validateForm()) {
  dispatch(addUser(formData))
    toast.success("User Added successfully")
    navigate("/utilisateurs")
}
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!user.code) {
      errors.code = 'Le code est requis.';
      isValid = false;
    }
    if (!user.code_a_barre) {
      errors.code_a_barre = 'Le code a barre est requis.';
      isValid = false;
    }
    if (!user.role_code) { 
      errors.role_code = 'Role est requis.'; 
      isValid = false;
    }
    if (!user.region_code) {
      errors.region_code = "Region est requise.";
      isValid = false;
    }
    if (!user.societe_code) {
      errors.societe_code = "Societe est requise.";
      isValid = false;
    }
    if (!user.soussociete_code) {
      errors.soussociete_code = "Sous societe est requise.";
      isValid = false;
    }
    
    if (!user.nom) {
      errors.nom = "Nom est requis.";
      isValid = false;
    }
    if (!user.prenom) {
      errors.prenom = "Prenom est requis.";
      isValid = false;
    }
    if (!user.cin) {
      errors.cin = "cin est requise.";
      isValid = false;
    }
    if (!user.grade) {
      errors.grade = "Grade est requis.";
      isValid = false;
    }
    if (!user.type) {
      errors.type = "Type est requis.";
      isValid = false;
    }
    if (!user.telephone) {
      errors.telephone = "Numero de telephone est requis.";
      isValid = false;
    }
    if (!user.email) {
      errors.email = "Email est requis.";
      isValid = false;
    }
    if (!user.login) {
      errors.login = "Login est requis.";
      isValid = false;
    }
    if (!user.password) {
      errors.ordre = "Password est requis.";
      isValid = false;
    }
    if (!user.matricule) {
      errors.matricule = "Matricule interne est requise.";
      isValid = false;
    }
    if (!user.isactif) {
      errors.isactif = "Champ obligatoire";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };
 
 
  return (
    <div className="main-content">
      <div className="layout-px-spacing">
        <div style={{ marginTop: "50px", marginBottom: "40px" }}>
          <h1 style={{ color: "#0063DC" }}>Add User</h1>
        </div>
        <div className="account-settings-container layout-top-spacing">
          <div className="account-content">
            <div
              className="scrollspy-example"
              data-spy="scroll"
              data-target="#account-settings-scroll"
              data-offset="-100"
            >
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
                                <input
                                  type="file"
                                  id="input-file-max-fs"
                                  className="dropify"
                                  data-default-file="assets/img/200x200.jpg"
                                  data-max-file-size="2M"
                                  name="images"
                                  onChange={(event)=>handleFileChange(event.target.files[0])}
                                />
                                
                                <p className="mt-2">
                                  <i className="flaticon-cloud-upload mr-1"></i>{" "}
                                  Upload Picture
                                </p>
                              </div>
                            </div>
                            <div className="col-xl-10 col-lg-12 col-md-8 mt-md-0 mt-4">
                              <div className="form">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="fullName">Code</label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="fullName"
                                        name="code"
                                        required
                                        value={user.code}
                                        onChange={(e)=>handleInputChange(e)}
                                      />
                                      {formErrors.code && <span className="text-danger">{formErrors.code}</span>}
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="fullName">
                                     Code a barre
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="fullName"
                                       name="code_a_barre"
                                       value={user.code_a_barre}
                                       required
                                       onChange={(e)=>handleInputChange(e)}
                                      />
                                      {formErrors.code_a_barre && <span className="text-danger">{formErrors.code_a_barre}</span>}
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="fullName">
                                        Nom
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="fullName"
                                        name="nom"
                                        value={user.nom}
                                        required
                                        onChange={(e)=>handleInputChange(e)}                                       
                                      />
                                      {formErrors.nom && <span className="text-danger">{formErrors.nom}</span>}
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="form-group">
                                      <label htmlFor="fullName">
                                        Prenom
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="fullName"
                                        placeholder="e.g Turner"
                                        name="prenom"
                                        value={user.prenom}
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                      />
                                      {formErrors.prenom && <span className="text-danger">{formErrors.prenom}</span>}
                                    </div>
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label htmlFor="profession">Role</label>
                                  <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    name="role_code"
                                    value={user.role_code}
                                    required
                                    onChange={(e)=>handleInputChange(e)}
                                  >
                                    <option value="">Choose...</option>
                                    {roles.map( (role)=><option value={role.code}>{role.libelle}</option>)}
                                  </select>
                                  {formErrors.role_code && <span className="text-danger">{formErrors.role_code}</span>}
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
                  <form
                    id="work-experience"
                    className="section work-experience"
                  >
                    <div className="info">
                      <h5 className="">About</h5>
                      <div className="row">
                        <div className="col-md-11 mx-auto">
                          <div className="work-section">

                            <div className="row">

                              <div className="col-md-12">
                                <div className="form-group">
                                  <label htmlFor="degree2">Societe</label>
                                  <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    name="societe_code"
                                    value={user.societe_code}
                                    required
                                    onChange={(e)=>handleInputChange(e)}
                                  >
                                    <option value="">Choose...</option>
                                    {societes.map( (societe)=><option value={societe.code}>{societe.nom}</option>)}
                                  </select>
                                  {formErrors.societe_code && <span className="text-danger">{formErrors.societe_code}</span>}
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="degree3">CIN</label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="degree3"
                                        name="cin"
                                        value={user.cin}
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                      />
                                      {formErrors.cin && <span className="text-danger">{formErrors.cin}</span>}
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="degree4">
                                      Matricule interne
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control mb-4"
                                        id="degree4"
                                        name="matricule"
                                        value={user.matricule}
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                      />
                                      {formErrors.matricule && <span className="text-danger">{formErrors.matricule}</span>}
                                    </div>
                                  </div>

                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="">
                                  <div className="">
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Grade</label>
                                            <select
                                              className="form-control mb-4"
                                              id="wes-from1"
                                              name="grade"
                                            value={user.grade}
                                            required
                                            onChange={(e)=>handleInputChange(e)}

                                            >
                                              <option>Choose...</option>
                                              <option value="MAG">Magasinier</option>
                                              <option value="CLT">Client</option>
                                              <option value="MERCH">Merchandiseur</option>
                                              <option value="REC">Agent de recouvrement</option>
                                              <option value="LIV">Livreur</option>
                                              <option value="TECH">Technicien</option>
                                              <option value="SUP">Superviseur</option>
                                              <option value="AUTRE">Autres</option>
                                              
                                            </select>
                                            {formErrors.grade && <span className="text-danger">{formErrors.grade}</span>}
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                        <label>Type</label>
                                        <select
                                          className="form-control mb-4"
                                          id="wes-from2"
                                          name="type"
                                          value={user.type}
                                          required
                                          onChange={(e)=>handleInputChange(e)}
                                        >
                                          <option>Choose...</option>
                                          <option value="prevendeur">Prevendeur</option>
                                          <option value="cashvan">Cashvan</option>
                                          <option value="livreur">Livreur</option>
                                          <option value="cashvan_livreur">cashvan_livreur</option>
                                          <option value="tous">Tous</option>
                                          
                                        </select>
                                        {formErrors.type && <span className="text-danger">{formErrors.type}</span>}
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="form-group">
                                      <label>Sous Societe</label>
                                      <select
                                        className="form-control mb-4"
                                        id="wes-from1"
                                        name="soussociete_code"
                                        value={user.soussociete_code}
                                        required
                                        onChange={(e)=>handleInputChange(e)}
                                      >
                                        <option value="">Choose...</option>
                                        {sousSocietes.map( (sousSociete)=><option value={sousSociete.code}>{sousSociete.nom}</option>)}
                                      </select>
                                      {formErrors.soussociete_code && <span className="text-danger">{formErrors.soussociete_code}</span>}
                                      </div>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label htmlFor="platform-description">
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  placeholder="Description"
                                  rows="10"
                                  name="description"
                                  value={user.description}
                                  onChange={(e)=>handleInputChange(e)}
                                ></textarea>
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
                  <form id="contact" className="section contact">
                    <div className="info">
                      <h5 className="">Contact</h5>
                      <div className="row">
                        <div className="col-md-11 mx-auto">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="country">Region</label>
                                <select className="form-control" id="country" name="region_code" value={user.region_code} required onChange={(e)=>handleInputChange(e)}>
                                  <option value="">All Countries</option>
                                  {regions.map( (region)=><option value={region.code}>{region.libelle}</option>)}
                                  
                                </select>
                                {formErrors.region_code && <span className="text-danger">{formErrors.region_code}</span>}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="address">Addresse</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="address"
                                  placeholder="Address"
                                  name="adresse"
                                  value={user.adresse}
                                  onChange={(e)=>handleInputChange(e)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="phone">Phone1</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="phone"
                                  placeholder="Write your phone number here"
                                
                                  name="telephone"
                                  value={user.telephone}
                                  required
                                  onChange={(e)=>handleInputChange(e)}
                                />
                                {formErrors.telephone && <span className="text-danger">{formErrors.telephone}</span>}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="phone">Phone2</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="phone"
                                  placeholder="Write your phone number here"
                                  name="mobile"
                                  value={user.mobile}
                                  onChange={(e)=>handleInputChange(e)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  id="email"
                                  placeholder="Write your email here"
                                  
                                  name="email"
                                  value={user.email}
                                  required
                                  onChange={(e)=>handleInputChange(e)}
                                />
                                {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-xl-12 col-lg-12 col-md-12 layout-spacing">
                  <form id="work-platforms" className="section work-platforms">
                    <div className="info">
                      <h5 className="">Additional Information</h5>
                      <div className="row">
                        <div className="col-md-11 mx-auto">
                          <div className="platform-div">
                            <div className="form-group">
                              <div className="row">
                              <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Actif</label>
                                            <select
                                              className="form-control mb-4"
                                              id="wes-from1"
                                              name="isactif"
                                              value={user.isactif}
                                              onChange={(e)=>handleInputChange(e)}
                                            >
                                              <option value="">Choose...</option>
                                              <option value="1">oui</option>
                                              <option value="0">non</option>
                                              </select>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Affichage des données</label>
                                            <select
                                              className="form-control mb-4"
                                              id="wes-from1"
                                              name="only_my_data"
                                              value={user.only_my_data}
                                              onChange={(e)=>handleInputChange(e)}
                                            >
                                              <option value="">Choose...</option>
                                              <option value="0">oui</option>
                                              <option value="1">non</option>
                                            </select>
                                          </div>
                                        </div>
                              </div>
                              <div className="row">
                              <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Quota-Pre Commande</label>
                                            <select
                                              className="form-control mb-4"
                                              id="wes-from1"
                                              name="pre_commande"
                                              value={user.pre_commande}
                                              onChange={(e)=>handleInputChange(e)}
                                            >
                                              <option value="">Choose...</option>
                                              <option value="1">oui</option>
                                              <option value="0">non</option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label>Vente Comptoir</label>
                                            <select
                                              className="form-control mb-4"
                                              id="wes-from1"
                                              name="vente_comptoir"
                                              value={user.vente_comptoir}
                                              onChange={(e)=>handleInputChange(e)}
                                            >
                                            <option value="">Choose...</option>
                                            <option value="1">oui</option>
                                            <option value="0">non</option>
                                            </select>
                                          </div>
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
                  <form id="social" className="section social">
                    <div className="info">
                      <h5 className="">Activation account</h5>
                      <div className="row">
                        <div className="col-md-11 mx-auto">
                          <div className="row">
                            <div className="col-md-6">
                            
                              <div className="input-group social-linkedin mb-3">
                              
                                <div className="input-group-prepend mr-3">
                                  <span
                                    className="input-group-text"
                                    id="linkedin"
                                  >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                  
                                  </span>
                                </div>
                              
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="login@gmail.com"
                                  name="login"
                                  value={user.login}
                                  
                                   onChange={(e)=>handleInputChange(e)}
                                   required
                                />{formErrors.login && <span className="text-danger">{formErrors.login}</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-11 mx-auto">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="input-group social-fb mb-3">
                                <div className="input-group-prepend mr-3">
                                  <span className="input-group-text" id="fb">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                  </span>
                                </div>
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="password"
                                  name="password"
                                  value={user.password}
                                  required
                                  onChange={(e)=>handleInputChange(e)}
                                />
                                {formErrors.code && <span className="text-danger">{formErrors.code}</span>}
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
              <button id="multiple-reset" className="btn btn-warning" onClick={()=>handleReset()}>
                Reset All
              </button>
              
              <button id="multiple-messages" className="btn btn-primary" onClick={()=>handleSubmit()}>
               Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
