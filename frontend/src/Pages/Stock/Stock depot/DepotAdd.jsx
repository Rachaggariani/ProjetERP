import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addDepot, fetchDepot } from '../../../ReduxToolkit/Features/StockDepotSlice';
function DepotAdd() {
    const [soussociete, setSousSociete] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [produits, setProduits] = useState([]);
    const dispatch = useDispatch();
    const [item, setItem] = useState({
        code:"",
        produit_code:"",
        fournisseur_code:"",
        soussociete_code:"",
        colisage:null,
        val_achat:null,
        val_vente:null,
        qte_carton:null,
        qte_piece:null
      });
      const handleSubmit = async(e) => {
        e.preventDefault();
          if (validateForm()) {
            await dispatch(addDepot(item));
            await dispatch(fetchDepot());
            handleCloseModal();
          }
      };
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

          axios
          .get("http://localhost:5000/api/v1/produit")
          .then((res) => {
            console.log("Getting data", res.data);
            setProduits(res.data);
          })
          .catch((err) => console.log(err));
          axios
          .get("http://localhost:5000/api/v1/fournisseur")
          .then((res) => {
            console.log("Getting data", res.data);
            setFournisseurs(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
      useEffect(() => {
        axios
          .get("http://localhost:5000/api/v1/stockdepot")
          .then((response) => {
            setOptions(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
      const [formErrors, setFormErrors] = useState({
        code: "",
       produit_code:"",
       fournisseur_code:"",
       soussociete_code:"",
       colisage:"",
       val_achat:"",
       val_vente:"",
       qte_carton:"",
       qte_piece:""
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
        if (!item.fournisseur_code) {
          errors.fournisseur_code = "Fournisseur est requis.";
          isValid = false;
        }
        if (!item.soussociete_code) {
          errors.soussociete_code = "Le distributeur est requise.";
          isValid = false;
        } 
        if (!item.produit_code) {
            errors.produit_code = "Le produit est requise.";
            isValid = false;
          } 
          if (!item.colisage) {
            errors.colisage = "Le colisage est requise.";
            isValid = false;
          } 
          else if (isNaN(item.colisage)) {
            errors.colisage = "Le colisage doit être un nombre.";
            isValid = false;
          }
          if (!item.qte_piece) {
            errors.qte_piece = "La quantité en piece est requise.";
            isValid = false;
          } 
          else if (isNaN(item.qte_piece)) {
            errors.qte_piece = "La quantité en piece doit être un nombre.";
            isValid = false;
          }
          if (!item.qte_carton) {
            errors.qte_carton = "La quantite en carton est requise.";
            isValid = false;
          } 
          else if (isNaN(item.qte_carton)) {
            errors.qte_carton = "La quantite en carton doit être un nombre.";
            isValid = false;
          }
          if (!item.val_achat) {
            errors.val_achat = "Valorisé achat est requise.";
            isValid = false;
          } 
          else if (isNaN(item.val_achat)) {
            errors.val_achat = "Valorisé achat doit être un nombre.";
            isValid = false;
          }
          if (!item.val_vente) {
            errors.val_vente = "Le valorisé vente est requise.";
            isValid = false;
          }  else if (isNaN(item.val_vente)) {
            errors.val_vente = "Le valorisé vente doit être un nombre.";
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
                    {formErrors.produit_code && (
                      <span className="text-danger">{formErrors.produit_code}</span>
                    )}
                     <select
                      name="produit_code"
                      id="produit_code"
                      className="formbold-form-input"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner un produit</option>
                      {produits.map((prod) => (
                        <option value={prod.code}>{prod.libelle}</option>
                      ))}
                    </select>
                    <label htmlFor="prod" className="formbold-form-label">
                      {" "}
                      Produit{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.fournisseur_code && (
                      <span className="text-danger">
                        {formErrors.fournisseur_code}
                      </span>
                    )} 
                    {/* <input type="text" placeholder="Entrer une gamme " className="formbold-form-input" required/> */}
                  <select
                      name="fournisseur_code"
                      id="fournisseur_code"
                      className="formbold-form-input"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner un fournisseur</option>
                      {fournisseurs.map((fournisseur) => (
                        <option value={fournisseur.code}>{fournisseur.libelle}</option>
                      ))}
                    </select>
                    <label htmlFor="fournisseur" className="formbold-form-label">
                      Fournisseur
                    </label>
                  </div>
                
                </div>
{/*  */}
                <div className="formbold-input-flex">
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
                      className="formbold-form-input"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Sélectionner un distributeur</option>
                      {soussociete.map((distributeur) => (
                        <option value={distributeur.code}>{distributeur.nom}</option>
                      ))}
                    </select>

                    <label htmlFor="distributeur" className="formbold-form-label">
                      Distributeur
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
                      placeholder="Entrer un colisage "
                      className="formbold-form-input"
                      value={item.colisage}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="colisage" className="formbold-form-label">
                      {" "}Colisage{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.qte_piece && (
                      <span className="text-danger">{formErrors.qte_piece}</span>
                    )}
                    <input
                      type="text"
                      name="qte_piece"
                      id="qte_piece"
                      placeholder="Entrer l quantité en piece "
                      className="formbold-form-input"
                      value={item.qte_piece}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="qte_piece" className="formbold-form-label">
                      {" "}
                      Quantité en piece{" "}
                    </label>
                  </div>
                </div>
                </div> 
                <div className="formbold-input-flex">
                <div>
                  {formErrors.qte_carton && (
                      <span className="text-danger">{formErrors.qte_carton}</span>
                    )}
                    <input
                      type="text"
                      name="qte_carton"
                      id="qte_carton"
                      placeholder="Entrer la quantité en carton "
                      className="formbold-form-input"
                      value={item.qte_carton}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="qte_carton" className="formbold-form-label">
                      {" "}
                      Quantité en carton{" "}
                    </label>
                  </div>
                  <div>
                  {formErrors.val_achat && (
                      <span className="text-danger">{formErrors.val_achat}</span>
                    )}
                    <input
                      type="text"
                      name="val_achat"
                      id="val_achat"
                      placeholder="Entrer valorisé achat "
                      className="formbold-form-input"
                      value={item.val_achat}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="val_achat" className="formbold-form-label">
                      {" "}
                      Valorisé achat{" "}
                    </label>
                  </div>
          <div>
             {formErrors.val_vente && (
                      <span className="text-danger">{formErrors.val_vente}</span>
                    )}
                         <input
                      type="text"
                      name="val_vente"
                      id="val_vente"
                      placeholder="Entrer valorisé vente "
                      className="formbold-form-input"
                      value={item.val_vente}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="val_vente" className="formbold-form-label">
                      {" "}
                      Valorisé vente{" "}
                    </label>
                  </div>
                </div>
            </form>
            <div className="modal-footer md-button">
              <button
                className="btn "
                data-dismiss="modal"
                style={{ backgroundColor: "#c30010", color: "white" }}
                onClick={() => handleCloseModal()}
              >
                <i className="flaticon-cancel-12" /> Fermer
              </button>
              <button
  type="button"
  style={{backgroundColor: "#0F056B",color:"white"}}
  className="btn mb-1 mr-1"
  onClick={(e)=>handleSubmit(e)}
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

export default DepotAdd