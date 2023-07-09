import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addCamion, fetchCamion } from '../../../ReduxToolkit/Features/CamionStockSlice';
import axios from 'axios';

function AddCamion() {
    const dispatch = useDispatch();
    const [item, setItem] = useState({
        code: "",
        libelle: "",
        soussociete_code:"",
        adresse:"",
        site_vente:"",
        type:"",
        max_bl:null,
        max_cmd:null,
        max_recouvrement:null,
        obligation_achat_avoir:"",
        sync_clients:"",
        avoir:null,
        Paiement_Esp:null,
        remise:null,
        autorisation_client:"",
        plafond_credit:null,
        version:null,
        colisage:null,
        vente_credit:null,

      });
      const handleSubmit = async(e) => {
        e.preventDefault();
          if (validateForm()) {
            await dispatch(addCamion(item));
            await dispatch(fetchCamion());
            handleCloseModal();
          }
      };
      const [soussociete, setSousSociete] = useState([]);
      const [options, setOptions] = useState([]);
      // const [obligationachatacvoir, setObligationAchatAcvoir] = useState([]);
      // const [synchronisationClient, setSyncronisationClients] = useState([]);
      // const [autorisationClient, setAuthorizationClient] = useState([]);
      useEffect(() => {
        axios
          .get("http://localhost:5000/api/v1/sousSocietes")
          .then((res) => {
            console.log("Getting data", res.data);
            setSousSociete(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
      useEffect(() => {
        axios
          .get("http://localhost:5000/api/v1/stockcamion")
          .then((response) => {
            setOptions(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
      const [formErrors, setFormErrors] = useState({
        code: "",
        libelle: "",
        soussociete_code:"",
        adresse:"",
        site_vente:"",
        type:"",
        max_bl:"",
        max_cmd:"",
        max_recouvrement:"",
        obligation_achat_avoir:"",
        sync_clients:"",
        avoir:"",
        Paiement_Esp:"",
        remise:"",
        autorisation_client:"",
        plafond_credit:null,
        version:"",
        colisage:"",
        vente_credit:"",
            });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setFormErrors((prevState) => ({
          ...prevState,
          [name]: "",
        }));
      };
      const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (!item.code) {
          errors.code = "Le code est requis.";
          isValid = false;
        }
        if (!item.libelle) {
          errors.libelle = "Le libellé est requis.";
          isValid = false;
        }
        if (!item.soussociete_code) {
          errors.soussociete_code = "Le distributeur est requise.";
          isValid = false;
        } 
        if (!item.adresse) {
            errors.adresse = "L'adresse est requise.";
            isValid = false;
          } 
          if (!item.site_vente) {
            errors.site_vente = "Le site vente est requise.";
            isValid = false;
          } 
          if (!item.type) {
            errors.type = "Le type est requise.";
            isValid = false;
          } 
          if (!item.max_bl) {
            errors.max_bl = "Le bls est requise.";
            isValid = false;
          } 
          else if (isNaN(item.max_bl)) {
            errors.max_bl = "Le bls doit être un nombre.";
            isValid = false;
          }
          if (!item.vente_credit) {
            errors.vente_credit = "Vente par crédit est requise.";
            isValid = false;
          } 
          if (!item.max_cmd) {
            errors.max_cmd = "La commande est requise.";
            isValid = false;
          } 
          else if (isNaN(item.max_cmd)) {
            errors.max_cmd = "La commande doit être un nombre.";
            isValid = false;
          }
          if (!item.max_recouvrement) {
            errors.max_recouvrement = "Le distributeur est requise.";
            isValid = false;
          } 
          else if (isNaN(item.max_recouvrement)) {
            errors.max_recouvrement = "Le recouverement doit être un nombre.";
            isValid = false;
          }
          if (!item.obligation_achat_avoir) {
            errors.obligation_achat_avoir = "L'obligation achat avoir est requise.";
            isValid = false;
          } 

      
          if (!item.sync_clients) {
            errors.sync_clients = "La synchronisation clients est requise.";
            isValid = false;
          } 
          if (!item.avoir) {
            errors.avoir = "Avoir est requise.";
            isValid = false;
          }  else if (isNaN(item.avoir)) {
            errors.avoir = "Avoir doit être un nombre.";
            isValid = false;
          }
        
       
          if (!item.Paiement_Esp) {
            errors.Paiement_Esp = "Le paiement par espece est requise.";
            isValid = false;
          } else if (isNaN(item.Paiement_Esp)) {
            errors.Paiement_Esp = "Le paiment par espece doit être un nombre.";
            isValid = false;
          }
    
         
          if (!item.remise) {
            errors.remise = "Remise est requise.";
            isValid = false;
          }  else if (isNaN(item.remise)) {
            errors.remise = "Remise doit être un nombre.";
            isValid = false;
          }
      
          
          if (!item.autorisation_client) {
            errors.autorisation_client = "Authorisation client est requise.";
            isValid = false;
          } 
          if (!item.plafond_credit) {
            errors.plafond_credit = "Le plafond crédit est requise.";
            isValid = false;
          } 
          else if (isNaN(item.plafond_credit)) {
            errors.plafond_credit = "Le plafond crédit doit être un nombre.";
            isValid = false;
          }
    
          if (!item.version) {
            errors.version = "La version est requise.";
            isValid = false;
          }  
          if (!item.colisage) {
            errors.colisage = "Le colisage est requise.";
            isValid = false;
          }   else if (isNaN(item.colisage)) {
            errors.colisage = "Le colisage doit être un nombre.";
            isValid = false;
          }

        setFormErrors(errors);
        return isValid;
      };
    const handleCloseModal = () => {
        const modal = document.getElementById("fadeupModal");
        modal.style.display = "none";
      };
  return (
  <>
  <div
      id="fadeupModal"
      className="modal animated fadeInUp custo-fadeInUp"
      role="dialog"
    >
      <div
        className="modal-dialog"
        style={{
          marginTop: "120px",
          transform: "scale(1.2)", // multiplier par 1.2 la taille originale
          width: "3000px", // largeur de la carte
          height: "400px", // hauteur de la carte
          border: "1px solid #ccc", // bordure de la carte
          borderRadius: "5px", // bordure arrondie de la carte
        }}
      >
        <div className="modal-content" style={{ width: "667px" }}>
          <div className="modal-header" style={{ Color: "black" }}>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleCloseModal()}
            >
                    <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                  <g clipPath="url(#clip0_1670_1541)">
                          <path
                            d="M9.00005 7.93906L12.7126 4.22656L13.7731 5.28706L10.0606 8.99956L13.7731 12.7121L12.7126 13.7726L9.00005 10.0601L5.28755 13.7726L4.22705 12.7121L7.93955 8.99956L4.22705 5.28706L5.28755 4.22656L9.00005 7.93906Z"
                            fill="#536387"
                          />
                        </g>
              </svg>
            </button>
          </div>

          <div className="formbold-form-wrapper">
         <form action="https://formbold.com/s/FORM_ID" method="POST">
         <div>
                <div className="formbold-input-flex">
                  <div>
                    {formErrors.code && (
                      <span className="text-danger">{formErrors.code}</span>
                    )}
                    <input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="Entrer le code "
                      className="formbold-form-input"
                      value={item.code}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="code" className="formbold-form-label">
                      {" "}
                      code{" "}
                    </label>
                  </div>
                  <div>
                    {formErrors.libelle && (
                      <span className="text-danger">{formErrors.libelle}</span>
                    )}
                    <input
                      type="text"
                      name="libelle"
                      id="libelle"
                      placeholder="Entrer le libelle "
                      className="formbold-form-input"
                      value={item.libelle}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="libelle" className="formbold-form-label">
                      {" "}
                      libelle{" "}
                    </label>
                  </div>
                 <div>
  {formErrors.soussociete_code && (
    <span className="text-danger">
      {formErrors.soussociete_code}
    </span>
  )} 
  {/* <input type="text" placeholder="Entrer une gamme " className="formbold-form-input" required/> */}
  <select
    name="soussociete_code"
    id="soussociete_code"
    value={item.soussociete_code}
    className="formbold-form-input"
    onChange={handleInputChange}
    required
  >
    <option>Sélectionner un distributeur</option>
    {soussociete.map((distributeur) => (
      <option value={distributeur.soussociete_code}>{distributeur.nom}</option>
    ))}
  </select>

  <label htmlFor="soussociete_code" className="formbold-form-label">
    Distributeur
  </label>
</div>
                  <div>
                  {formErrors.adresse && (
                      <span className="text-danger">{formErrors.adresse}</span>
                    )}
                    <input
                      type="text"
                      name="adresse"
                      id="adresse"
                      placeholder="Entrer l'adresse "
                      className="formbold-form-input"
                      value={item.adresse}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="adresse" className="formbold-form-label">
                      {" "}Adresse{" "}
                    </label>
                  </div>
                </div>

                <div className="formbold-input-flex">
                  <div>
                  {formErrors.site_vente && (
                      <span className="text-danger">{formErrors.site_vente}</span>
                    )}
                    <input
                      type="text"
                      name="site_vente"
                      id="site_vente"
                      placeholder="Entrer le site vente "
                      className="formbold-form-input"
                      value={item.site_vente}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="site_vente" className="formbold-form-label">
                      {" "}
                      Site Vente{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.type && (
                      <span className="text-danger">{formErrors.type}</span>
                    )}
                    <input
                      type="text"
                      name="type"
                      id="type"
                      placeholder="Entrer le type "
                      className="formbold-form-input"
                      value={item.type}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="type" className="formbold-form-label">
                      {" "}
                      Type{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.max_bl && (
                      <span className="text-danger">{formErrors.max_bl}</span>
                    )}
                    <input
                      type="text"
                      name="max_bl"
                      id="max_bl"
                      placeholder="Entrer BLS "
                      className="formbold-form-input"
                      value={item.max_bl}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="max_bl" className="formbold-form-label">
                      {" "}
                      BLS{" "}
                    </label>
                  </div>
          <div>
             {formErrors.max_cmd && (
                      <span className="text-danger">{formErrors.max_cmd}</span>
                    )}
                         <input
                      type="text"
                      name="max_cmd"
                      id="max_cmd"
                      placeholder="Entrer une commande "
                      className="formbold-form-input"
                      value={item.max_cmd}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="max_cmd" className="formbold-form-label">
                      {" "}
                      Commande{" "}
                    </label>
                  </div>
                </div>
 
                  <div className="formbold-input-flex">
                  <div>
                    {formErrors.max_recouvrement && (
                      <span className="text-danger">{formErrors.max_recouvrement}</span>
                    )}
                    <input
                      type="text"
                      name="max_recouvrement"
                      id="ormax_recouvrement"
                      placeholder="0"
                      className="formbold-form-input"
                      value={item.max_recouvrement}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="max_recouvrement" className="formbold-form-label">
                      {" "}
                      Recouveremnet{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.obligation_achat_avoir && (
                      <span className="text-danger">
                        {formErrors.obligation_achat_avoir}
                      </span>
                    )} 
                    {/* <input type="text" placeholder="Entrer une gamme " className="formbold-form-input" required/> */}
                  <select
                      name="obligation_achat_avoir"
                      id="obligation_achat_avoir"
                      className="formbold-form-input"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner une obligation achat avoir</option>
                      <option>
                      Non
                     </option>
                     <option>Oui</option>
                    </select>

                    <label htmlFor="elt" className="formbold-form-label">
                    {" "} Obligation_Achat_Avoir {" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.sync_clients && (
                      <span className="text-danger">
                        {formErrors.sync_clients}
                      </span>
                    )} 
                    {/* <input type="text" placeholder="Entrer une gamme " className="formbold-form-input" required/> */}
                  <select
                      name="sync_clients"
                      id="sync_clients"
                      className="formbold-form-input"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner une synchronisation client</option>
                     <option>
                      Total
                     </option>
                     <option>Route</option>
                    </select>

                    <label htmlFor="elt" className="formbold-form-label">
                    {" "}Syncronisation {" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.avoir && (
                      <span className="text-danger">{formErrors.avoir}</span>
                    )}
                    <input
                      type="text"
                      name="avoir"
                      id="avoir"
                      placeholder="0"
                      className="formbold-form-input"
                      value={item.avoir}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="avoir" className="formbold-form-label">
                      {" "}Avoir{" "}
                    </label>
                  </div>
                </div> 
        
     
                <div className="formbold-input-flex">
                  <div>
                    {formErrors.Paiement_Esp && (
                      <span className="text-danger">{formErrors.Paiement_Esp}</span>
                    )}
                    <input
                      type="text"
                      name="Paiement_Esp"
                      id="Paiement_Esp"
                      placeholder="0"
                      className="formbold-form-input"
                      value={item.Paiement_Esp}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="Paiement_Esp" className="formbold-form-label">
                      {" "}
                      Paiment Espece{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.remise && (
                      <span className="text-danger">
                        {formErrors.remise}
                      </span>
                    )} 
                      <input
                      type="text"
                      name="remise"
                      id="remise"
                      placeholder="0"
                      className="formbold-form-input"
                      value={item.remise}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="remise" className="formbold-form-label">
                      {" "}
                      Remise{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.autorisation_client && (
                      <span className="text-danger">
                        {formErrors.autorisation_client}
                      </span>
                    )} 
                    {/* <input type="text" placeholder="Entrer une gamme " className="formbold-form-input" required/> */}
                  <select
                      name="autorisation_client"
                      id="autorisation_client"
                      className="formbold-form-input"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner un client</option>
                      <option>
                      Non
                     </option>
                     <option>Oui</option>
                    </select>

                    <label htmlFor="elt" className="formbold-form-label">
                      Authorisation Client 
                    </label>
                  </div>
                  <div>
                  {formErrors.plafond_credit && (
                    <span className="text-danger">{formErrors.plafond_credit}</span>
                  )}
                  <input
                    type="number" // Utiliser le type "number" pour s'assurer que seule une valeur numérique est saisie
                    name="plafond_credit"
                    id="plafond_credit"
                    placeholder="0"
                    className="formbold-form-input"
                    value={item.plafond_credit}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="plafond_credit" className="formbold-form-label">
                    Plafond Crédit
                  </label>
                </div>
                </div> 
             
                <div className="formbold-input-flex">
                  <div>
                    {formErrors.version && (
                      <span className="text-danger">{formErrors.version}</span>
                    )}
                    <input
                      type="text"
                      name="version"
                      id="version"
                      placeholder="0"
                      className="formbold-form-input"
                      value={item.version}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="version" className="formbold-form-label">
                      {" "}
                      Version{" "}
                    </label>
                  </div>

                  <div>
                  {formErrors.colisage && (
                      <span className="text-danger">{formErrors.colisage}</span>
                    )}
                    <input
                      type="text"
                      name="colisage"
                      id="colisage"
                      placeholder="0"
                      className="formbold-form-input"
                      value={item.colisage}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="colisage" className="formbold-form-label">
                      {" "}
                      Colisage{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.vente_credit && (
                      <span className="text-danger">
                        {formErrors.vente_credit }
                      </span>
                    )} 
            <select
  name="vente_credit"
  id="vente_credit"
  className="formbold-form-input"
  onChange={handleInputChange}
  required
  value={item.vente_credit}
>
  <option value="">-- Sélectionner --</option>
  <option>
                      Non
                     </option>
                     <option>Oui</option>
</select>
<label htmlFor="vente_credit" className="formbold-form-label">
                      {" "}
                      Vente Credit{" "}
                    </label>
                  </div>
                </div> 
                </div> 
            </form>
            <div className="modal-footer md-button">
              <button
                className="btn "
                data-dismiss="modal"
                style={{backgroundColor:"#c30010",color:"white"}}
                onClick={() => handleCloseModal()}
              >
                <i className="flaticon-cancel-12" /> Fermer
              </button>
              <button
  type="button"
  className="btn"
  onClick={(e)=>handleSubmit(e)}
  style={{backgroundColor: "#0F056B",color:"white"}}
>
  Enregistrer
</button>
            </div>
          </div>
        </div>
        </div>
        </div>
  </>
  )
}

export default AddCamion