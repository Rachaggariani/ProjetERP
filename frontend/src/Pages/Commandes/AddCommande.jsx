import React, { useEffect, useState } from "react";
// import "./Ajout.css";
// import "./DateBL.css";
// import "./btncss.css";
// import './PaginationBL.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { addPaiment } from "../../ReduxToolkit/Features/PaiementSlice";
import { addCMD } from "../../ReduxToolkit/Features/CommandeSlice";

function AddCommande() {
  const [enteteCommercial, setEnteteCommercial] = useState({
    quantite: "",
    soussociete_code: "",
    client_nom: "",
    net_a_payer: "",
    montant_total_ttc: "",
    montant_total_ht: "",
    client_code: "",
    commercial_code: "",
    grossiste_code: "",
    remise: "",
  });
  const [commercialSelect, setCommercialslect] = useState([]);


  const dispatch = useDispatch();
  const [distributeur, setDistributeur] = useState([]);
  const[clientCode,setClientCode]=useState([]);
  const [camion, setCamion] = useState([]);
  const [produit, setProduit] = useState([]);
  const [item, setItem] = useState({
    produit_code: "",
    soussociete_code: "",
  });
  const [formErrors, setFormErrors] = useState({
    produit_code: "",
    quantite: "",
    pu_ttc: "",
    pu_ht: "",
    p_tva: "",
    total_net: "",
    total: "",
    remise: "",
    soussociete_code: "",
    commercial_code:"",
  });
  const [CommercialRows, setCommercialRows] = useState([
    {
      produit_code: "",
      quantite: "",
      pu_ttc: "",
      pu_ht: "",
      p_tva: "",
      total_net: "",
      total: "",
      remise: "",
    },
  ]);

  const handleAddItem = () => {
    setCommercialRows([
      ...CommercialRows,
      {
        produit_code: "",
        quantite: "",
        pu_ttc: "",
        pu_ht: "",
        p_tva: "",
        total_net: "",
        total: "",
        remise: "",
      },
    ]);
  };

  const handleEnteteChange = (event) => {
    const { name, value } = event.target;

    setEnteteCommercial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  console.log("our entete  => chrayek trah ?", enteteCommercial);

  const handleCommercialChange = (event, index) => {
    const { name, value } = event.target;

    console.log("produit***********", value);

    setCommercialRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [name]: value,
      };
      console.log("Ligne Commercial ,", CommercialRows);

      return newRows;
    });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

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

    if (!enteteCommercial.soussociete_code) {
      errors.soussociete_code = "Choisir un distributeur !";
      isValid = false;
    }
    if (!enteteCommercial.commercial_code) {
      errors.commercial_code = "Choisir un commercial !";
      isValid = false;
    }
    if (!enteteCommercial.client_code) {
      errors.client_code = "Code client est requis.";
      isValid = false;
    }
    if (!enteteCommercial.montant_total_ht) {
      errors.montant_total_ht = "Total HT est requis.";
      isValid = false;
    } else if (isNaN(enteteCommercial.montant_total_ht)) {
      errors.montant_total_ht = "Le total HT doit être un nombre.";
      isValid = false;
    }
    if (!enteteCommercial.montant_total_ttc) {
      errors.montant_total_ttc = "Total TTC est requis.";
      isValid = false;
    } else if (isNaN(enteteCommercial.montant_total_ttc)) {
      errors.montant_total_ttc = "Le total TTC doit être un nombre.";
      isValid = false;
    }
    if (!enteteCommercial.net_a_payer) {
      errors.net_a_payer = "net a payer est requis.";
      isValid = false;
    } else if (isNaN(enteteCommercial.net_a_payer)) {
      errors.net_a_payer = "Le net a payer doit être un nombre.";
      isValid = false;
    }
    // if (!enteteCommercial.quantite) {
    //   errors.quantite = "Quantite est requis.";
    //   isValid = false;
    // } else if (isNaN(enteteCommercial.quantite)) {
    //   errors.quantite = "La quantite doit être un nombre.";
    //   isValid = false;
    // }
    
   
    setFormErrors(errors);
    return isValid;
  };

  const handleElimine = (index) => {
    const newRows = CommercialRows.filter((row, i) => i !== index);
    setCommercialRows(newRows);
  };
  const handleAddPaiement = async (e) => {
    e.preventDefault();
    console.log("our entete data", enteteCommercial);
    if (validateForm()) {
    const result = await dispatch(addCMD({ enteteCommercial, CommercialRows }));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/produit")
      .then((res) => {
        console.log("Getting produit", res.data);
        setProduit(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/Entete")
      .then((res) => {
        console.log("Getting produit", res.data);
        setClientCode(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/sousSocietes")
      .then((res) => {
        console.log("Getting data", res.data);
        setDistributeur(res.data);
      })
      .catch((err) => console.log(err));
      axios
      .get("http://localhost:5000/api/v1/detailsCamion")
      .then((res) => {
        const commercialCodes = [
          ...new Set(res.data.map((obj) => obj.commercial_code)),
        ];
        console.log("Unique commercial codes:", commercialCodes);

        // Assuming you have a state variable named 'commercialUpdate' and a setter function 'setCommercialUpdate'
        setCommercialslect(commercialCodes);
      })
      .catch((err) => console.log(err));
  }, []);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/api/v1/stockcamion")
  //       .then((res) => {
  //         console.log("Getting data", res.data);
  //         setCamion(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  return (
    <>
      <div className="card">
        <div class="card-content"></div>

        <div className="invoice-detail-items">
          <div className="row mb-4">
            <div className="col">
            
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Distributeur
              </label>
              <br/>
              {formErrors.soussociete_code && (
                <span className="text-danger" style={{marginLeft:"2px"}}>
                  {formErrors.soussociete_code}
                </span>
              )}
              <select
                name="soussociete_code"
                id="soussociete_code"
                className="form-control form-control-sm"
                value={distributeur.code}
                onChange={handleEnteteChange}
              >
                <option value="">Sélectionner un distributeur</option>
                {distributeur.map((distributeur) => (
                  <option value={distributeur.code}>{distributeur.nom}</option>
                ))}
              </select>
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Commercial
              </label>
              <br/>
              {formErrors.commercial_code && (
                <span className="text-danger" style={{marginLeft:"2px"}}>
                  {formErrors.commercial_code}
                </span>
              )}
              <select
                name="commercial_code"
                id="commercial_code"
                className="form-control form-control-sm"
                value={camion.commercial_code}
                onChange={handleEnteteChange}
              >
                <option value="">Sélectionner un commercial</option>
                {commercialSelect.map((comm) => (
                      <option key={comm} value={comm}>
                        {comm}
                      </option>
                    ))}
              </select>
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Client
              </label>
              <br/>
              {formErrors.client_code && (
                <span className="text-danger" style={{marginLeft:"2px"}}>
                  {formErrors.client_code}
                </span>
              )}
              <select
              name="client_code"
              id="client_code"
              className="form-control form-control-sm"
              value={clientCode.client_code}
              onChange={handleEnteteChange}>
              <option value="">Sélectionner un client</option>
              {clientCode.map((client) => (
                <option value={client.client_code}>{client.client_code}</option>
              ))}
            </select>
            
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Total Remise
              </label>
              <br/>
             
              <input
                type="text"
                className="form-control"
                name="remise"
                value={enteteCommercial.remise}
                onChange={handleEnteteChange}
              />
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Total HT{" "}
              </label>
              <br/>
              {formErrors.montant_total_ht && (
                <span className="text-danger" style={{marginLeft:"2px"}}>
                  {formErrors.montant_total_ht}
                </span>
              )}
              <input
                type="text"
                name="montant_total_ht"
                className="form-control"
                placeholder="0"
                value={enteteCommercial.montant_total_ht}
                onChange={handleEnteteChange}
              />
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Total TTC{" "}
              </label>
              <br/>
              {formErrors.montant_total_ttc && (
                <span className="text-danger" style={{marginLeft:"2px"}}>
                  {formErrors.montant_total_ttc}
                </span>
              )}
              <input
                type="text"
                name="montant_total_ttc"
                className="form-control"
                placeholder="0"
                value={enteteCommercial.montant_total_ttc}
                onChange={handleEnteteChange}
              />
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Net à payer
              </label>
              <br/>
              {formErrors.net_a_payer && (
                <span className="text-danger" style={{marginLeft:"2px"}}>
                  {formErrors.net_a_payer}
                </span>
              )}
              <input
                type="text"
                name="net_a_payer"
                value={enteteCommercial.net_a_payer}
                className="form-control"
                placeholder="0"
                onChange={handleEnteteChange}
              />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table ">
              <thead>
                <tr>
                  <th />
                  <th style={{ textAlign: "center" }}>Produit</th>
                  <th style={{ textAlign: "center" }}>Quantité</th>
                  <th style={{ textAlign: "center" }}>Prix HT</th>
                  <th style={{ textAlign: "center" }}>TVA</th>
                  <th style={{ textAlign: "center" }}>Prix TTC</th>
                  <th style={{ textAlign: "center" }}>Remise</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                  <th style={{ textAlign: "center" }}>Net à payer</th>
                </tr>
              </thead>
              <tbody>
                {CommercialRows.map((row, index) => (
                  <tr key={index}>
                    <td
                      className="delete-item-row"
                      onClick={() => handleElimine(index)}
                    >
                      <ul className="table-controls">
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="delete-item"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-x-circle"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                              <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </td>
                    <td className="produit_code">
                      {formErrors.produit_code && (
                        <span className="text-danger">
                          {formErrors.produit_code}
                        </span>
                      )}
                      <select
                        name="produit_code"
                        id="produit_code"
                        className="form-control form-control-sm"
                        value={row.produit_code}
                        onChange={(e) => handleCommercialChange(e, index)}
                      >
              
                        <option value="">Choisir un produit</option>
                        {produit
                          .filter((eltProduit) =>
                            eltProduit.soussociete_code.includes(
                              item.soussociete_code
                            )
                          )
                          .map((produit) => (
                            <option value={produit.code}>
                              {produit.libelle}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="text-right quantite">
                      <input
                        type="text"
                        name="quantite"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={row.quantite}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
             
                    </td>
                    <td className="text-right pu_ht">
                      <input
                        type="text"
                        name="pu_ht"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={row.pu_ht}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td>
                    <td className="text-right p_tva">
                      <input
                        type="text"
                        name="p_tva"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={row.p_tva}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td>
                    <td className="text-right pu_ttc">
                      <input
                        type="text"
                        name="pu_ttc"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={row.pu_ttc}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td>
                    <td className="text-right remise">
                      <input
                        type="text"
                        name="remise"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={row.remise}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td>
                    <td className="text-right total">
                      <input
                        type="text"
                        name="total"
                        className="form-control form-control-sm"
                        placeholder="0.0"
                        value={row.total}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td>
                    <td className="text-right total_net">
                      <input
                        type="text"
                        name="total_net"
                        className="form-control form-control-sm"
                        value={row.total_net}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <button
                className="btn btn-secondary additem btn-sm"
                onClick={() => handleAddItem()}
              >
                Add Item
              </button>
            </div>
            <div>
              <button
                style={{
                  height: "36px",
                  width: "87px",
                  backgroundColor: "#0F056B",
                  color: "white",
                }}
                onClick={(e) => handleAddPaiement(e)}
                type="button"
                className="btn mb-2 mr-2"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>

        <div className="invoice-detail-note">
          <div className="row">
            <div className="col-md-12 align-self-center">
              <div
                className="form-group row invoice-note"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {/* <button class="btn btn-dark mb-2" >Dark</button> */}
                <Link to="/Commande">
                  <button class=" btn btn-outline-dark mb-2">Retour</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCommande;
