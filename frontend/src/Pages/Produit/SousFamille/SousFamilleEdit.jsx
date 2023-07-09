
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../SousFamille/EditSousFamille.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSousfamille } from '../../../ReduxToolkit/Features/SousFamilleSlice';
function SousFamilleEdit() {
  const { id } = useParams();
    const [familleupdate,setFamilleUpdate]=useState([]);
    const [sousF, setSousF] = useState({
      code:"",
      libelle:"",
      prix_sousfamille_ht:null,
      prix_sousfamille_ttc:null,
      famille_code:"",
      ordre:null,
      id:null,
    });
    const dispatch = useDispatch();
    const navigate=useNavigate();
  //   useEffect(()=>{
  //     axios.get('http://localhost:5000/api/v1/famille')
  //     .then(res=>{console.log("Getting data",res.data)
  //     setFamilleUpdate(res.data)
  // }).catch(err=>console.log(err))
  //   },[]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("sous famille object",sousF);
 await dispatch(updateSousfamille({id,sousF,navigate}));
    
  };

  useEffect(() => {
    const getSousFamille = async (id) => { 
        const apiResponse = await axios.get(`http://localhost:5000/api/v1/sousfamille/${id}`
        );
        setSousF(apiResponse.data);
    };
    getSousFamille(id);
    axios
      .get("http://localhost:5000/api/v1/famille")
      .then((res) => {
        console.log("Getting famille update data", res.data);
        setFamilleUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <>
    <form className="updateform">
       <h2 className="h2">Modifier Sous Famille</h2>
       <div className="input">
         <label htmlFor="code">Code</label>
         <input
           name="code"
           id="code"
           type="text"
           value={sousF.code}
           onChange={(e) => setSousF({ ...sousF, code: e.target.value })}
           disabled
         />
         <label htmlFor="libelle">Libelle</label>
         <input
           name="libelle"
           id="libelle"
           type="text"
           value={sousF.libelle}
           onChange={(e) => setSousF({ ...sousF, libelle: e.target.value })}
         />
         <label htmlFor="prix_sousfamille_ht">Prix HT du sous famille</label>
         <input
           name="prix_sousfamille_ht"
           id="prix_sousfamille_ht"
           type="text"
           value={sousF.prix_sousfamille_ht}
           onChange={(e) => setSousF({ ...sousF, prix_sousfamille_ht: e.target.value })}
         />
          <label htmlFor="prix_sousfamille_ttc">Prix ttc du sous famille</label>
         <input
           name="prix_sousfamille_ttc"
           id="prix_sousfamille_ttc"
           type="text"
           value={sousF.prix_sousfamille_ttc}
           onChange={(e) => setSousF({ ...sousF, prix_sousfamille_ttc: e.target.value })}
         />
         <label htmlFor="ordre">Ordre</label>
         <input
           name="ordre"
           id="ordre"
           type="text"
           value={sousF.ordre}
           onChange={(e) => setSousF({ ...sousF, ordre: e.target.value })}
         /> 
   <div>
     <label htmlFor="famille_code" className="formbold-form-label" value={sousF.famille_code}>Famille</label>
     <select name="famille_code" id="famille_code" className="formbold-form-input"   onChange={(e) => setSousF({ ...sousF, famille_code: e.target.value })} required>
         <optgroup  label="Sélection et modifier une famille">
          {familleupdate.map((famille) => 
            <option value={famille.code} selected={sousF.famille_code === famille.code} >{famille.libelle}</option>
          
          )}
          </optgroup>
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
               onClick={(e) => handleUpdate(e)}>
               Update
             </button>
           
           </div>
           <div>
             <Link to="/sous_familles">
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
export default SousFamilleEdit


