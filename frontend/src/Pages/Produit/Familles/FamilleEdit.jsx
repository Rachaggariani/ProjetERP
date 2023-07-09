import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../Gammes/Edit.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateFamille } from '../../../ReduxToolkit/Features/FamilleSlice';

function FamilleEdit() {
  const { id } = useParams();
 
    const [gammeupdate,setGammeUpdate]=useState([]);
    const [famille, setFamille] = useState({
      code: "",
      libelle: "",
      color: "",
      gamme_code:"",
      ordre: null,
      id:null,
    });
    const dispatch = useDispatch();

const navigate=useNavigate();
const handleUpdate = async (e) => {
  e.preventDefault();
  console.log("famille object",famille);
    await dispatch(updateFamille({id,famille,navigate}));
};

useEffect(() => {
  const getFamille = async (id) => {
    const apiResponse = await axios.get(
      `http://localhost:5000/api/v1/famille/${id}`
    );
    console.log("response from api", apiResponse);
    setFamille(apiResponse.data);
  };
  getFamille(id);

  axios
  .get("http://localhost:5000/api/v1/gamme")
  .then((res) => {
    console.log("Getting famille update data", res.data);
    setGammeUpdate(res.data);
  })
  .catch((err) => console.log(err));
}, []);
 
  return (
    <>
    <form className="updateform">
       <h2 className="h2">Modifier Famille</h2>
       <div className="input">
         <label htmlFor="code">Code</label>
         <input
           name="code"
           id="code"
           type="text"
           value={famille.code}
           onChange={(e) => setFamille({ ...famille, code: e.target.value })} disabled
         />
         <label htmlFor="libelle">Libelle</label>
         <input
           name="libelle"
           id="libelle"
           type="text"
           value={famille.libelle}
           onChange={(e) => setFamille({ ...famille, libelle: e.target.value })}
         />
         <label htmlFor="color">Couleur</label>
         <input
           name="color"
           id="color"
           type="color"
           value={famille.color}
           onChange={(e) => setFamille({ ...famille, color: e.target.value })}
         />
         <label htmlFor="ordre">Ordre</label>
         <input
           name="ordre"
           id="ordre"
           type="text"
           value={famille.ordre}
           onChange={(e) => setFamille({ ...famille, ordre: e.target.value })}
         /> 
   <div>
     <label htmlFor="gamme" className="formbold-form-label"value={famille.gamme_code}>Gamme</label>
     <select name="gamme_code" id="gamme_code" className="formbold-form-input"   onChange={(e) => setFamille({ ...famille, gamme_code: e.target.value })} required>
         <option>Sélectionner une gamme</option>
          {gammeupdate.map(gamme=><option value={gamme.code} selected={famille.gamme_code === gamme.code}>{gamme.libelle}</option>)}
     </select>
 </div>
         <div
           className="espace"
           style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
         >
           <div>
        
             <button
               className="btn btn-outline-primary btn-sm"
               style={{ fontSize: '15px', padding: '10px 20px', width: '100px' }}
               onClick={(e) => handleUpdate(e)}
             >
               Update
             </button>
           
           </div>
           <div>
             <Link to="/familles">
               <button
                 className="btn btn-outline-dark mb-2"
                 style={{ fontSize: '15px', padding: '10px 20px', width: '100px' }}
               >
                 Retour
               </button>
             </Link>
           </div>
         </div>
       </div>
     </form> 
  </>
  )
}

export default FamilleEdit