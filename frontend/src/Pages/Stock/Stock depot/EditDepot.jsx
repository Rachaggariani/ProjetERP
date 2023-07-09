import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { updateDepot } from '../../../ReduxToolkit/Features/StockDepotSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditDepot() {
    const [distributeurUpdate,setDistributeurUpdate]=useState([]);
    const [ProduitUpdate,setProduitUpdate]=useState([]);
    const [fournisseurUpdate,setFournisseurUpdate]=useState([]);
    const { id } = useParams();
    const [depot, setDepot] = useState({
      code: "",
      produit_code:"",
      soussociete_code:"",
      fournisseur_code:"",
      colisage:null,
      qte_piece:null,
      qte_carton:null,
      val_achat:null,
      val_vente:null,
      id: null,
    });
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleUpdate = async (e) => {
        e.preventDefault();
      console.log("depot object",depot);
      await dispatch(updateDepot({id,depot,navigate}));
    };
    useEffect(() => {
        const getDepot = async (id) => {
          const apiResponse = await axios.get(
            `http://localhost:5000/api/v1/stockdepot/${id}`
          );
          console.log("response from api", apiResponse);
          setDepot(apiResponse.data);
        };
        getDepot(id);
        axios
        .get("http://localhost:5000/api/v1/sousSocietes")
        .then((res) => {
          console.log("Getting distributeur update data", res.data);
          setDistributeurUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/produit")
        .then((res) => {
          console.log("Getting produit update data", res.data);
          setProduitUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/produit")
        .then((res) => {
          console.log("Getting produit update data", res.data);
          setProduitUpdate(res.data);
        })
        .catch((err) => console.log(err));
        axios
        .get("http://localhost:5000/api/v1/fournisseur")
        .then((res) => {
          console.log("Getting fournisseur update data", res.data);
          setFournisseurUpdate(res.data);
        })
        .catch((err) => console.log(err));
      }, []);
  return (
  <>

<div className="card" style={{ boxShadow: "0px 0px 9px grey",marginTop:"20px"}}>
  <div className="card-body">
    <div className="title" style={{fontSize: "25px", fontWeight: "500", position: "relative",marginBottom:"20px",color:"#11146b"}}>
      Modifier depot 
      <span style={{content: '',position: "absolute",height:"3.5px", width: "30px",background: "linear-gradient(135deg, var(--main-blue), var(--main-purple))", left: "0",bottom: "0"}}></span>
    </div>
    <form>
      <div className="form-row mb-4">
        <div className="col">
        <label htmlFor="code">Code</label>
          <input type="text" className="form-control" placeholder="Code" name="code" id="code" value={depot.code}  onChange={(e) => setDepot({ ...depot, code: e.target.value })} disabled/>
        </div>
        <div className="col">
        <label htmlFor="produit_code"value={depot.produit_code} >Produit</label>
        <select name="produit_code" id="produit_code"  className="form-control form-control-sm"  onChange={(e) => setDepot({ ...depot, produit_code: e.target.value })} required>
         <option>Sélectionner un produit</option>
          {ProduitUpdate.map(prod => <option key={prod.code} value={prod.code} selected={depot.produit_code === prod.code}>{prod.libelle}</option>)}
     </select>
        </div> 
        <div className="col">
  <label htmlFor="soussociete_code" value={depot.soussociete_code}>Distributeur</label>
  <select name="soussociete_code" id="soussociete_code" className="form-control form-control-sm" onChange={(e) => setDepot({ ...depot, soussociete_code: e.target.value })} required>
    <option>Sélectionner un distributeur</option>
    {distributeurUpdate.map(distributeur =><option key={distributeur.soussociete_code} value={distributeur.code} selected={depot.soussociete_code === distributeur.code}>{distributeur.nom}</option>)}
  </select>
</div>
      </div>
      <div className="form-row mb-4">
      <div className="col">
  <label htmlFor="fournisseur_code" value={depot.fournisseur_code}>Fournisseur</label>
  <select name="fournisseur_code" id="fournisseur_code" className="form-control form-control-sm" onChange={(e) => setDepot({ ...depot, fournisseur_code: e.target.value })} required>
    <option>Sélectionner un fournisseur</option>
    {fournisseurUpdate.map(fournisseur => <option key={fournisseur.code} value={fournisseur.code} selected={depot.fournisseur_code === fournisseur.code}>{fournisseur.libelle}</option>)}
  </select>
</div>
      <div className="col">
        <label htmlFor="colisage">Colisage</label>
          <input type="text" className="form-control" placeholder="Modifier votre colisage "  name="colisage" id="colisage"  onChange={(e) => setDepot({ ...depot, colisage: e.target.value })} value={depot.colisage} />
        </div>
        <div className="col">
        <label htmlFor="qte_piece">Quantité en piéce</label>
          <input type="text" className="form-control" placeholder="Modifier votre quantité en piéce"  name="qte_piece" id="qte_piece"   onChange={(e) => setDepot({ ...depot, qte_piece: e.target.value })}value={depot.qte_piece} />
        </div>
        
      </div>

      <div className="form-row mb-4">
      <div className="col">
        <label htmlFor="qte_carton">Quantité en carton</label>
          <input type="text" className="form-control" placeholder="Modifier votre quantité en carton"  name="qte_carton" id="qte_carton" value={depot.qte_carton}   onChange={(e) => setDepot({ ...depot, qte_carton: e.target.value })} required/>
        </div>
      <div className="col">
        <label htmlFor="val_achat">Valorisé achat</label>
          <input type="text" className="form-control" name="val_achat" id="val_achat" placeholder="Modifier votre valorisant achat  " value={depot.val_achat}  onChange={(e) => setDepot({ ...depot, val_achat: e.target.value })} required/>
        </div>
        <div className="col">
        <label htmlFor="val_vente">Valorisé vente</label>
          <input type="text" className="form-control" name="val_vente" id="val_vente" value={depot.val_vente}  onChange={(e) => setDepot({ ...depot, val_vente: e.target.value })} required  />
        </div>
        
       
      </div>
      {/*  */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Link to="/stockdepot">

    <button className="btn btn-info  mb-2" style={{ fontSize: '15px'}}  onClick={(e) => handleUpdate(e)}> Enregistrer la Modification</button>
  </Link>
  <Link to="/stockdepot">
    <button className="btn btn-dark mb-2" style={{ fontSize: '15px', padding: '10px 20px', width: '216px' }}>Retour</button>
  </Link>
</div>
    </form>
  </div>
</div>
  </>
  )
}

export default EditDepot