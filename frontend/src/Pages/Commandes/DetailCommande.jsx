import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchLC } from "../../ReduxToolkit/Features/LCSlice";
import { fetchProducts } from "../../ReduxToolkit/Features/ProductSlice";
import { fetchEntete } from "../../ReduxToolkit/Features/EnteteSlice";
import { fetchClientBL, fetchClientBLById } from "../../ReduxToolkit/Features/ClientBLSlice";
import MapComponent from "../../Components/MapComponent/MapComponent";
import axios from "axios";

function DetailCommande() {
    const BlCode = useParams().id;
  const ligneCData = useSelector((state) => state.LC);
  const produitData = useSelector((state) => state.produit.produits);
  const enteteData = useSelector((state) => state.Entete.eneteComm);
  const clientsBLData = useSelector((state) => state.ClBL.clients);
  const [distributeurUpdate, setDistributeurUpdate] = useState([]);
  const [camionUpdate, setCamionUpdate] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const style = document.createElement("style");
    style.innerText = `
      .table-hover tr:hover {
        background-color: grey;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  useEffect(() => {
    dispatch(fetchLC(BlCode));
    dispatch(fetchEntete(BlCode));
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {

dispatch(fetchClientBLById(enteteData.client_code))
console.log("client bl from details",clientsBLData);
  }, [enteteData]);
  let libelleDistributeur = "";
  distributeurUpdate.forEach((element) => {
    if (element.code === enteteData.soussociete_code) {
      console.log("element", element);
      libelleDistributeur = element.nom;
      console.log("libelleDistributeur", libelleDistributeur);
    }
  });
  let libelleadresse = "";
  distributeurUpdate.forEach((element) => {
    if (element.code === enteteData.soussociete_code) {
      console.log("element", element);
      libelleadresse = element.adresse;
      console.log("libelleadresse", libelleadresse);
    }
  });
  let libellematriculefiscale = "";
  distributeurUpdate.forEach((element) => {
    if (element.code === enteteData.soussociete_code) {
      console.log("element", element);
      libellematriculefiscale = element.matricule_fiscale;
      console.log("libellematriculefiscale", libellematriculefiscale);
    }
  });
  let telephones = "";
  distributeurUpdate.forEach((element) => {
    if (element.code === enteteData.soussociete_code) {
      console.log("element", element);
      telephones = element.telephone;
      console.log("telephones", telephones);
    }
  });
useEffect(()=>{
    axios
    .get("http://localhost:5000/api/v1/sousSocietes/")
    .then((res) => {
      setDistributeurUpdate(res.data);
    })
},[])
let libelleCamion = "";
camionUpdate.forEach((element) => {
  if (element.code === enteteData.depot_code) {
    console.log("element", element);
    libelleCamion = element.libelle;
    console.log("libelleCamion", libelleCamion);
  }
});
useEffect(()=>{
  axios
  .get("http://localhost:5000/api/v1/depot/")
  .then((res) => {
    setCamionUpdate(res.data);
  })
},[])
  return (
    <>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{ display: "flex", marginTop: "10px", alignItems: "center" }}
      >
        <h3>Commande N°: </h3> 
         <h4> {BlCode}</h4>
      
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <div>
            
          <h6 style={{ marginRight: "10px" }}>Distributeur: { libelleDistributeur}</h6>
        </div>
        <div>
          <h6 style={{ marginRight: "10px" }}>Commercial: {enteteData.commercial_code}</h6>
        </div>
        <div>
          <h6 style={{ marginRight: "10px" }}>Camion: {libelleCamion}</h6>
        </div>
      </div>
    </div>
    <div style={{ display: "flex" }}>
      <div className="card" style={{ marginRight: "10px" }}>
        <div className="card-content">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p >Date:{enteteData.date}</p>
              </div>
              <div>
                <p >Date livraison: {enteteData.date_prevu_livraison}</p>
              </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between",marginTop:"7px" }}>
              <div >
              <div>
                <p>Adresse:{libelleadresse}</p>
              </div>
              <div>
                <p>MF:{libellematriculefiscale}</p>
                <div>
                <p>Telephone:{telephones}</p>
              </div>
              </div>
            </div>
            <div>
              <div style={{ marginRight: "30px" }}>Client:{clientsBLData.nom}</div>
             
              <div style={{ marginRight: "30px" }}>Code :{clientsBLData.code}</div>
              <div style={{ marginRight: "30px" }}>Code a bare :{clientsBLData.code_a_barre}</div>
              <div style={{ marginRight: "30px" }}>Code ERP :{clientsBLData.code_erp}</div>
              <div style={{ marginRight: "30px" }}>Mobile:{clientsBLData.mobile}</div>
            </div>
          </div>
          <div>
            <br />
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ color: "black", textTransform: "capitalize" }}>
                    {"N°".charAt(0).toUpperCase() +
                      "N°".slice(1).toLowerCase()}
                  </th>
                  <th style={{ color: "black", textTransform: "capitalize" }}>
                    {"Réf".charAt(0).toUpperCase() +
                      "Réf".slice(1).toLowerCase()}
                  </th>
                  <th style={{ color: "black", textTransform: "capitalize" }}>
                    {"Produit".charAt(0).toUpperCase() +
                      "Produit".slice(1).toLowerCase()}
                  </th>
                  <th
                    style={{ color: "black", textTransform: "capitalize" }}
                    className="text-right"
                  >
                    {"Prix HT".charAt(0).toUpperCase() +
                      "Prix HT".slice(1).toLowerCase()}
                  </th>
                  <th
                    style={{ color: "black", textTransform: "capitalize" }}
                    className="text-right"
                  >
                    {"Prix TTC".charAt(0).toUpperCase() +
                      "Prix TTC".slice(1).toLowerCase()}
                  </th>
                  <th
                    style={{ color: "black", textTransform: "capitalize" }}
                    className="text-right"
                  >
                    {"Quantite".charAt(0).toUpperCase() +
                      "Quantite".slice(1).toLowerCase()}
                  </th>
                  <th
                    style={{ color: "black", textTransform: "capitalize" }}
                    className="text-right"
                  >
                    {"Total".charAt(0).toUpperCase() +
                      "Total".slice(1).toLowerCase()}
                  </th>
                  <th
                    style={{ color: "black", textTransform: "capitalize" }}
                    className="text-right"
                  >
                    {"remis commande".charAt(0).toUpperCase() +
                      "remise commande".slice(1).toLowerCase()}
                  </th>
                  <th
                    style={{ color: "black", textTransform: "capitalize" }}
                    className="text-right"
                  >
                    {"Total Net".charAt(0).toUpperCase() +
                      "Total Net".slice(1).toLowerCase()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ligneCData.status === "succeeded" ? (
                  ligneCData.lcomm.map((data, key) => {
                    const matchingProduit = produitData.find(
                      (produit) => produit.code === data.produit_code
                    );

                    const labelle = matchingProduit
                      ? matchingProduit.libelle
                      : "Unknown";

                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{data.produit_code}</td>
                        <td>{labelle}</td>
                        <td>{data.pu_ht}</td>
                        <td>{data.pu_ttc}</td>
                        <td>{data.quantite}</td>
                        <td>{data.total}</td>
                        <td>{enteteData.remise_commande}</td>
                        <td className="text-right">{data.total_net}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      <h1>Loading...</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="row">
              <div className="col-8"></div>
              <div className="col-4">
                <table className="table table-sm text-right">
                  <tr>
                    <td
                      style={{ color: "black", textTransform: "capitalize" }}
                      className="text-right"
                    >
                      {"Total HT".charAt(0).toUpperCase() +
                        "Total HT".slice(1)} : {enteteData.montant_total_ht}
                    </td>
                    <td className="text-right"></td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "black", textTransform: "capitalize" }}
                      className="text-right"
                    >
                      {"Total TTC".charAt(0).toUpperCase() +
                        "Total TTC".slice(1)} : {enteteData.montant_total_ttc}
                    </td>
                    <td className="text-right"></td>
                  </tr>
                  <tr>
                    <td
                      style={{ color: "black", textTransform: "capitalize" }}
                      className="text-right"
                    >
                      {"Net a payer".charAt(0).toUpperCase() +
                        "Net a payer".slice(1).toLowerCase()} : {enteteData.net_a_payer}
                    </td>
                    <td className="text-right"></td>
                  </tr>
                </table>
              
              </div>
             {/* <h6>  <p>Arreté la présente commande a la somme de : et cent et quatorze millimes</p></h6> */}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="card">
        <div className="card-content">  <MapComponent lat={36.922534916085105} lng={10.27346875783726} details={{text:"my camion 55"}}/></div>
      </div>
    </div>
  </>
  )
}

export default DetailCommande




  