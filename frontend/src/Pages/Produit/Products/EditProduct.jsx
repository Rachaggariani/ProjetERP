
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../Products/EditProd.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts, updateProd } from '../../../ReduxToolkit/Features/ProductSlice';
function EditProduct() {
    const { id } = useParams();
    const navigate=useNavigate();
    const [familleupdate,setFamilleUpdate]=useState([]);
    const [sousfamilleUpdate,setSousFamilleUpdate]=useState([]);
    const [fournisseurUpdate,setFournisseurUpdate]=useState([]);
    const [soussocieteUpdate,setSousSocieteUpdate]=useState([]);
    const [gammeUpdate,setGammeUpdate]=useState([]);
    const [marqueUpdate,setMarqueUpdate]=useState([]);
    const [produit, setProduit] = useState({
        code: "",
        code_a_barre:"",
        libelle: "",
        fournisseur_code:"",
        soussociete_code:"",
        gamme_code:"",
        marque_code:"",
        famille_code:"",
        sousfamille_code:"",
        type:"",
        colisage:null,
        ordre: null,
        prix_achat_ht:null,
        prix_achat_ttc:null,
        prix_ht:null,
      id:null,
    });
    const dispatch = useDispatch();
    const handleUpdate = async () => {
        console.log("produxt object",produit);
      await   dispatch(updateProd({id,produit,navigate}));
      await  dispatch(fetchProducts());
      };
      
      useEffect(() => {
        const getProduct = async (id) => {
          const apiResponse = await axios.get(
            `http://localhost:5000/api/v1/produit/${id}`
          );
          console.log("response from api", apiResponse);
          setProduit(apiResponse.data);
        };
        getProduct(id);
        axios
        .get("http://localhost:5000/api/v1/fournisseur")
        .then((res) => {
          console.log("Getting fournisseur update data", res.data);
          setFournisseurUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/gamme")
        .then((res) => {
          console.log("Getting gamme update data", res.data);
          setGammeUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/famille")
        .then((res) => {
          console.log("Getting famille update data", res.data);
          setFamilleUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/sousfamille")
        .then((res) => {
          console.log("Getting sous famille update data", res.data);
          setSousFamilleUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/sousSocietes")
        .then((res) => {
          console.log("Getting sous societe update data", res.data);
          setSousSocieteUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/marque")
        .then((res) => {
          console.log("Getting marque update data", res.data);
          setMarqueUpdate(res.data);
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
           value={produit.code}
           onChange={(e) => setProduit({ ...produit, code: e.target.value })} 
           disabled
         />
          <label htmlFor="code_a_barre"> Code a barre </label>
         <input
           name="code_a_barre"
           id="code_a_barre"
           type="text"
           value={produit.code_a_barre}
           onChange={(e) => setProduit({ ...produit, code_a_barre: e.target.value })}
           disabled
         />
         <label htmlFor="libelle">Libelle</label>
         <input
           name="libelle"
           id="libelle"
           type="text"
           value={produit.libelle}
           onChange={(e) => setProduit({ ...produit, libelle: e.target.value })}
         />
                     <div>
     <label htmlFor="soussociete_code" className="formbold-form-label" value={produit.soussociete_code}>Distributeur</label>
     <select name="soussociete_code" id="soussociete_code" className="formbold-form-input" onChange={(e) => setProduit({ ...produit, soussociete_code: e.target.value })} required>
         <option value="">Sélection un distributeur à modifier</option>
          {soussocieteUpdate.map(distributeur => <option value={distributeur.code} selected={distributeur.soussociete_code === distributeur.code}>{distributeur.nom}</option>)}
     </select>
 </div>
               <div>
     <label htmlFor="fournisseur_code" className="formbold-form-label" value={produit.fournisseur_code}>Fournisseur</label>
     <select name="fournisseur_code" id="fournisseur_code" className="formbold-form-input"   onChange={(e) => setProduit({ ...produit, fournisseur_code: e.target.value })} required>
         <option value="">Sélection un fournisseur à modifier</option>
          {fournisseurUpdate.map(fournisseur => <option value={fournisseur.code} selected={fournisseur.fournisseur_code === fournisseur.code}>{fournisseur.libelle}</option>)}
     </select>
 </div>
        <div>
     <label htmlFor="gamme_code" className="formbold-form-label" value={produit.gamme_code}>Gamme</label>
     <select name="gamme_code" id="gamme_code" className="formbold-form-input"   onChange={(e) => setProduit({ ...produit, gamme_code: e.target.value })} required>
         <option value="">Sélection une gamme à modifier</option>
          {gammeUpdate.map(gamme => <option value={gamme.code} selected={gamme.gamme_code === gamme.code}>{gamme.libelle}</option>)}
     </select>
 </div>
 <div>
     <label htmlFor="marque_code" className="formbold-form-label" value={produit.marque_code}>Marque</label>
     <select name="marque_code" id="marque_code" className="formbold-form-input"   onChange={(e) => setProduit({ ...produit, marque_code: e.target.value })} required>
         <option value="">Sélection une marque à modifier</option>
          {marqueUpdate.map(marque => <option value={marque.code} selected={marque.marque_code === marque.code}>{marque.libelle}</option>)}
     </select>
 </div>
 <div>
     <label htmlFor="famille_code" className="formbold-form-label" value={produit.famille_code}>Famille</label>
     <select name="famille_code" id="famille_code" className="formbold-form-input"   onChange={(e) => setProduit({ ...produit, famille_code: e.target.value })} required>
         <option value="">Sélection une famille à modifier</option>
          {familleupdate.map(famille => <option value={famille.code} selected={famille.famille_code === famille.code}>{famille.libelle}</option>)}
     </select>
 </div>
 <div>
     <label htmlFor="sousfamille_code" className="formbold-form-label" value={produit.sousfamille_code}>Sous Famille</label>
     <select name="sousfamille_code" id="sousfamille_code" className="formbold-form-input"   onChange={(e) => setProduit({ ...produit, sousfamille_code: e.target.value })} required>
         <option value="">Sélection une sous famille à modifier</option>
          {sousfamilleUpdate.map(sousfamille => <option value={sousfamille.code} selected={sousfamille.sousfamille_code === sousfamille.code}>{sousfamille.libelle}</option>)}
     </select>
 </div>
 <label htmlFor="type">Type</label>
         <input
           name="type"
           id="type"
           type="text"
           value={produit.type}
           onChange={(e) => setProduit({ ...produit, type: e.target.value })}
         /> 
           <label htmlFor="colisage">Colisage</label>
         <input
           name="colisage"
           id="colisage"
           type="text"
           value={produit.colisage}
           onChange={(e) => setProduit({ ...produit, colisage: e.target.value })}
         /> 
         <label htmlFor="ordre">Ordre</label>
         <input
           name="ordre"
           id="ordre"
           type="text"
           value={produit.ordre}
           onChange={(e) => setProduit({ ...produit, ordre: e.target.value })}
         /> 
          <label htmlFor="prix_achat_ht">Prix achat HT</label>
         <input
           name="prix_achat_ht"
           id="prix_achat_ht"
           type="text"
           value={produit.prix_achat_ht}
           onChange={(e) => setProduit({ ...produit, prix_achat_ht: e.target.value })}
         />
               <label htmlFor="prix_achat_ttc">Prix achat TTC</label>
         <input
           name="prix_achat_ttc"
           id="prix_achat_ttc"
           type="text"
           value={produit.prix_achat_ttc}
           onChange={(e) => setProduit({ ...produit, prix_achat_ttc: e.target.value })}
         />
     <label htmlFor="prix_ht">Prix HT</label>
         <input
           name="prix_ht"
           id="prix_ht"
           type="text"
           value={produit.prix_ht}
           onChange={(e) => setProduit({ ...produit, prix_ht: e.target.value })}
         /> 
         <div
           className="espace"
           style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
         >
           <div>
           <Link to="/Produits">
             <button
               className="btn btn-outline-primary btn-sm"
               style={{ fontSize: '15px', padding: '10px 20px', width: '100px' }}
               onClick={() => handleUpdate()}>
               Update
             </button>
             </Link>
           </div>
           <div>
             <Link to="/Produits">
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

export default EditProduct