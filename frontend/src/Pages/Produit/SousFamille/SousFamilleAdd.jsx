import React,{useState,useEffect } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import './Modal.css';
import { addSousfamille, fetchSousfamilles } from '../../../ReduxToolkit/Features/SousFamilleSlice';
export default function SousFamilleAdd() {
  const dispatch = useDispatch();
    const [item, setItem] = useState({
        code: '',
        libelle: '',
        famille_code:'',
        prix_sousfamille_ht:null,
        prix_sousfamille_ttc:null,
        ordre:0,
      });
      const [familles,setFamilles]=useState([]);
      useEffect(() => {
        axios
          .get("http://localhost:5000/api/v1/famille")
          .then((res) => {
            console.log("Getting data", res.data);
            setFamilles(res.data);
          })
          .catch((err) => console.log(err));
      }, []);
      const [formErrors, setFormErrors] = useState({
        code: '',
        libelle: '',
        famille_code:'',
        prix_sousfamille_ht:null,
        prix_sousfamille_ttc:null,
        ordre:"",
      });
      const handleCloseModal = ()=>{
        const modal = document.getElementById('fadeupModal');
        modal.style.display = 'none';
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setFormErrors((prevState) => ({
          ...prevState,
          [name]: '',
        }));
      };
      
     
      const handleSubmit = async  (e) => {
        e.preventDefault();
        if (validateForm()) {
            await dispatch(addSousfamille(item));
            await dispatch(fetchSousfamilles());
            handleCloseModal();
        }
      };
      const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (!item.code) {
          errors.code = 'Le code est requis.';
          isValid = false;
        }
        if (!item.libelle) {
          errors.libelle = 'Le libellé est requis.';
          isValid = false;
        }
        if (!item.famille_code) { // corrected key name
          errors.famille_code = 'La sélection d\'une famille est requise.'; // corrected key name
          isValid = false;
        }
        if (!item.prix_sousfamille_ht) {
          errors.prix_sousfamille_ht = "Le prix ht du sous famille est requis.";
          isValid = false;
        }else if (isNaN(item.prix_sousfamille_ht)) {
          errors.prix_sousfamille_ht = 'Le prix ht doit être un nombre.';
          isValid = false;
        }
        if (!item.prix_sousfamille_ttc) {
            errors.prix_sousfamille_ttc = "Le prix ttc du sous famille est requis.";
            isValid = false;
          }else if (isNaN(item.prix_sousfamille_ttc)) {
            errors.prix_sousfamille_ttc = 'Le prix ttc doit être un nombre.';
            isValid = false;
          }
          if (!item.ordre) {
            errors.ordre = "L'ordre  du sous famille est requis.";
            isValid = false;
          }else if (isNaN(item.ordre)) {
            errors.ordre = 'L ordre doit être un nombre.';
            isValid = false;
          }
        setFormErrors(errors);
        return isValid;
      };

  return (
    <div>
 <div id="fadeupModal" className="modal animated fadeInUp custo-fadeInUp" role="dialog">
    <div className="modal-dialog" style={{
        marginTop:"190px",
            transform: "scale(1.2)", // multiplier par 1.2 la taille originale
            width: "3000px", // largeur de la carte
            height: "200px", // hauteur de la carte
            border: "1px solid #ccc", // bordure de la carte
            borderRadius: "5px", // bordure arrondie de la carte
          }}>
    
        <div className="modal-content"style={{width:"620px"}}>
         <div className="modal-header" style={{Color:"black"}}>
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
      <div class="formbold-form-wrapper">
        <form action="https://formbold.com/s/FORM_ID" method="POST" >
        <div>
      <div className="formbold-input-flex">
      <div>
      {formErrors.code && <span className="text-danger">{formErrors.code}</span>}
          <input type="text" name="code" id="code" placeholder="Entrer le code du sous famille " className="formbold-form-input"  value={item.code} onChange={handleInputChange} required/>
          <label htmlFor="code" className="formbold-form-label"> {' '}Code  {' '} </label>
        </div>
        <div>
        {formErrors.libelle && <span className="text-danger">{formErrors.libelle}</span>}
          <input type="text" name="libelle" id="libelle" placeholder="Entrer le libelle d'une sous famille" className="formbold-form-input" value={item.libelle}  onChange={handleInputChange} required/>
          <label htmlFor="libelle" className="formbold-form-label"> {' '}Libelle  {' '} </label>
        </div>
      </div>
      <div className="formbold-input-flex">
      <div>
  {formErrors.famille_code && <span className="text-danger">{formErrors.famille_code}</span>}
<select name="famille_code" id="famille_code" className="formbold-form-input" onChange={handleInputChange} required>
<option value="">Sélectionner une famille</option>
      {familles.map(famille => <option value={famille.code}>{famille.libelle}</option>)}
  </select>
  
  <label htmlFor="famille" className="formbold-form-label">
    Famille
  </label>
</div>
        <div>
        {formErrors.ordre && <span className="text-danger">{formErrors.ordre}</span>}
          <input type="text" name="ordre" id="ordre" placeholder="0" className="formbold-form-input" value={item.ordre}  onChange={handleInputChange} required/>
          <label htmlFor="libelle" className="formbold-form-label"> {' '}Ordre  {' '} </label>
        </div>
      </div>

      <div className="formbold-input-flex">
      <div>
      {formErrors.prix_sousfamille_ht && <span className="text-danger">{formErrors.prix_sousfamille_ht}</span>}
          <input type="text" name="prix_sousfamille_ht" id="prix_sousfamille_ht" placeholder="0" className="formbold-form-input"  value={item.prix_sousfamille_ht} onChange={handleInputChange} required/>
          <label htmlFor="prix_sousfamille_ht" className="formbold-form-label"> {' '}Prix sousfamille ht {' '} </label>
        </div>
        <div>
        {formErrors.prix_sousfamille_ttc && <span className="text-danger">{formErrors.prix_sousfamille_ttc}</span>}
          <input type="text" name="prix_sousfamille_ttc" id="prix_sousfamille_ttc" placeholder="0 " className="formbold-form-input" value={item.prix_sousfamille_ttc}  onChange={handleInputChange} required/>
          <label htmlFor="prix_sousfamille_ttc" className="formbold-form-label"> {' '}Prix sousfamille ttc  {' '} </label>
        </div>
      </div>
    </div>
        </form>
                    <div className="modal-footer md-button">
                        <button className="btn " data-dismiss="modal" style={{backgroundColor:"#c30010",color:"white"}} onClick={()=> handleCloseModal()} ><i className="flaticon-cancel-12"  /> Fermer</button>   
                        <button type="button"  className="btn mb-2 mr-2" style={{backgroundColor: "#0F056B",color:"white"}} onClick={(e) => handleSubmit(e)}>Enregistrer</button>
                    </div>
                      </div>
                    </div>
                  </div> 
        </div> 

    </div>
  )
}

 