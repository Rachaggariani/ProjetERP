import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { updateCamion } from '../../../ReduxToolkit/Features/CamionStockSlice';
import axios from 'axios';
function EditCamion() {
  const [distributeurUpdate,setDistributeurUpdate]=useState([]);
    const { id } = useParams();
    const [camion, setCamion] = useState({
      code: "",
      libelle: "",
      soussociete_code:"",
      adresse: "",
      site_vente: "",
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
      id: null,
    });
    const dispatch = useDispatch();
    const handleUpdate = async () => {
      console.log("camion object",camion);
       dispatch(updateCamion({id,camion}));
    };
    useEffect(() => {
        const getCamion = async (id) => {
          const apiResponse = await axios.get(
            `http://localhost:5000/api/v1/stockcamion/${id}`
          );
          console.log("response from api", apiResponse);
          setCamion(apiResponse.data);
        };
        getCamion(id);
        axios
        .get("http://localhost:5000/api/v1/sousSocietes")
        .then((res) => {
          console.log("Getting sous societe update data", res.data);
          setDistributeurUpdate(res.data);
        })
        .catch((err) => console.log(err));
      }, []);
  return (
<>
<div className="card" style={{ boxShadow: "0px 0px 9px grey",marginTop:"20px"}}>
  <div className="card-body">
    <div className="title" style={{fontSize: "25px", fontWeight: "500", position: "relative",marginBottom:"20px",color:"#11146b"}}>
      Modifier camion 
      <span style={{content: '',position: "absolute",height:"3.5px", width: "30px",background: "linear-gradient(135deg, var(--main-blue), var(--main-purple))", left: "0",bottom: "0"}}></span>
    </div>
    <form>
      <div className="form-row mb-4">
        <div className="col">
        <label htmlFor="code">Code</label>
          <input type="text" className="form-control" placeholder="Code"  name="code" id="code" value={camion.code}  onChange={(e) => setCamion({ ...camion, code: e.target.value })} disabled/>
        </div>
        <div className="col">
        <label htmlFor="libelle">Libelle</label>
          <input type="text" className="form-control" placeholder="Modifier votre libelle"  name="libelle" id="libelle"  onChange={(e) => setCamion({ ...camion, libelle: e.target.value })}  value={camion.libelle} disabled />
        </div> 
        <div className="col">
     
        <label htmlFor="soussociete_code"value={camion.soussociete_code} >Distributeur</label>
        <select name="soussociete_code" id="soussociete_code"  className="form-control form-control-sm"  onChange={(e) => setCamion({ ...camion, soussociete_code: e.target.value })} required>
         <option>Sélectionner un distributeur</option>
         {distributeurUpdate.map(distributeur => <option value={distributeur.code} selected={distributeur.soussociete_code === distributeur.code}>{distributeur.nom}</option>)}
     </select>
        </div>
      </div>

      <div className="form-row mb-4">
      <div className="col">
        <label htmlFor="adresse">Destination</label>
          <input type="text" className="form-control" placeholder="Modifier votre destination "  name="adresse" id="adresse"  onChange={(e) => setCamion({ ...camion, adresse: e.target.value })} value={camion.adresse} />
        </div>
        <div className="col">
        <label htmlFor="site_vente">Site Vente</label>
          <input type="text" className="form-control" placeholder="Modifier votre site vente"  name="site_vente" id="site_vente"   onChange={(e) => setCamion({ ...camion, site_vente: e.target.value })}value={camion.site_vente} />
        </div>
        <div className="col">
        <label htmlFor="type">Type</label>
          <input type="text" className="form-control" placeholder="Modifier votre site vente"  name="type" id="type" value={camion.type}   onChange={(e) => setCamion({ ...camion, type: e.target.value })} disabled/>
        </div>
      </div>


      <div className="form-row mb-4">
      <div className="col">
        <label htmlFor="obligation_achat_avoir"  > Obligation achat avoir</label>
        <input type="text" className="form-control"  name="obligation_achat_avoir" id="obligation_achat_avoir" value={camion.obligation_achat_avoir}    onChange={(e) => setCamion({ ...camion, obligation_achat_avoir: e.target.value })} />
       
        </div>
        <div className="col">
        <label htmlFor="max_bl">BLS</label>
          <input type="text" className="form-control" name="max_bl" id="max_bl" value={camion.max_bl}  onChange={(e) => setCamion({ ...camion, max_bl: e.target.value })} disabled  />
        </div>
        <div className="col">
        <label htmlFor="max_cmd">Commandes</label>
          <input type="text" className="form-control"  name="max_cmd" id="max_cmd" value={camion.max_cmd}  onChange={(e) => setCamion({ ...camion, max_cmd: e.target.value })} disabled />
        </div>
       
      </div>

      <div className="form-row mb-4">
      <div className="col">
        <label htmlFor="max_recouvrement">Recouverement</label>
          <input type="text" className="form-control"  name="max_recouvrement" id="max_recouvrement" value={camion.max_recouvrement}   onChange={(e) => setCamion({ ...camion, max_recouvrement: e.target.value })} disabled />
        </div>
      <div className="col">
        <label htmlFor="sync_clients">Synchronisation</label>
        <select className="form-control form-control-sm"  name="sync_clients" id="sync_clients" value={camion.sync_clients}   onChange={(e) => setCamion({ ...camion, sync_clients: e.target.value })}disabled>
    <option>Choisir une route </option>  
</select>
        </div>
        <div className="col">
        <label htmlFor="avoir">Taux Avoir</label>
          <input type="text" className="form-control" name="avoir" id="avoir" value={camion.avoir}  onChange={(e) => setCamion({ ...camion, avoir: e.target.value })} />
        </div>
       
      </div>

   <div className="form-row mb-4">
   <div className="col">
        <label htmlFor="Paiement_Esp">Paiement Espece</label>
          <input type="text" className="form-control" name="Paiement_Esp" id="Paiement_Esp" placeholder="Modifier votre paiement en espece  " value={camion.Paiement_Esp}  onChange={(e) => setCamion({ ...camion, Paiement_Esp: e.target.value })}/>
        </div>
        <div className="col">
        <label htmlFor="remise">Remise</label>
          <input type="text" className="form-control"  name="remise" id="remise" value={camion.remise}  onChange={(e) => setCamion({ ...camion, remise: e.target.value })}/>
        </div>
        <div className="col">
        <label htmlFor="autorisation_client">Gestion Client </label>
        <input type="text" className="form-control"  name="autorisation_client" id="autorisation_client" value={camion.autorisation_client}   onChange={(e) => setCamion({ ...camion, autorisation_client: e.target.value })} />
         
        </div>
        
      </div>

      <div className="form-row mb-4">
      <div className="col">
        <label htmlFor="plafond_credit">Plafond Credit</label>
          <input type="text" className="form-control" placeholder="plafond_credit"  name="plafond_credit" id="plafond_credit" value={camion.plafond_credit}  onChange={(e) => setCamion({ ...camion, plafond_credit: e.target.value })} disabled />
        </div>
        <div className="col">
        <label htmlFor="version">Version</label>
          <input type="text" className="form-control"  name="version" id="version" value={camion.version}  onChange={(e) => setCamion({ ...camion, version: e.target.value })}/>
        </div>
        <div className="col">
        <label htmlFor="colisage">Colisage </label>
        <input className="form-control" name="colisage" id="colisage" value={camion.colisage}   onChange={(e) => setCamion({ ...camion, colisage: e.target.value })}disabled/>
        </div>
        
      </div>





      {/*  */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Link to="/camion">

    <button className="btn btn-info  mb-2" style={{ fontSize: '15px'}}  onClick={() => handleUpdate()}> Enregistrer la Modification</button>
  </Link>
  <Link to="/camion">
    <button className="btn btn-dark mb-2" style={{ fontSize: '15px', padding: '10px 20px', width: '216px' }}>Retour</button>
  </Link>
</div>
    </form>
  </div>
</div>



</>
  )
}

export default EditCamion