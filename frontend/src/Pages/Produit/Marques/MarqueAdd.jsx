import React,{useState} from 'react'
  
import { useDispatch } from "react-redux";
import './marque.css';
import './Modal.css';
import { addMarque, fetchMarques } from '../../../ReduxToolkit/Features/MarqueSlice';
export default function MarqueAdd() {
  const dispatch = useDispatch();
    const [item, setItem] = useState({
        code: '',
        libelle: ''
      });
      const [formErrors, setFormErrors] = useState({
        code: '',
        libelle: '',
      });
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
    
      const handleSubmit = async(e) => {
        e.preventDefault();
          if (validateForm()) {
            await dispatch(addMarque(item));
            await dispatch(fetchMarques());
            handleCloseModal();
          }
      };
      const handleCloseModal = ()=>{
        const modal = document.getElementById('fadeupModal');
        modal.style.display = 'none';
      }
      
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
        setFormErrors(errors);
        return isValid;
      };
  return (
    <div id="fadeupModalBackground" >
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
          <input type="text" name="code" id="code" placeholder="Entrer le code d'une marque " className="formbold-form-input"  value={item.code} onChange={handleInputChange} required/>
          <label htmlFor="code" className="formbold-form-label"> {' '}code  {' '} </label>
        </div>
        <div>
        {formErrors.libelle && <span className="text-danger">{formErrors.libelle}</span>}
          <input type="text" name="libelle" id="libelle" placeholder="Entrer le libelle d'une marque" className="formbold-form-input" value={item.libelle}  onChange={handleInputChange} required/>
          <label htmlFor="libelle" className="formbold-form-label"> {' '}libelle  {' '} </label>
        </div>
      </div>
    </div>
        </form>
                    <div className="modal-footer md-button">
                        <button className="btn " data-dismiss="modal" style={{backgroundColor:"#c30010",color:"white"}}onClick={()=> handleCloseModal()} ><i className="flaticon-cancel-12"  /> Fermer</button>   
                        <button type="button" className="btn mb-2 mr-2" style={{backgroundColor: "#0F056B",color:"white"}}onClick={(e)=>handleSubmit(e)}>Enregistrer</button>
                    </div>
                      </div>
                    </div>
                  </div> 
        </div> 
        </div>
  )
}

 