import React, { useEffect, useState } from "react";
import "./Ajout.css";
import "./DateBL.css";
import "./btncss.css";
// import './PaginationBL.css';
import Flatpickr from "react-flatpickr";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addPaiment } from "../../ReduxToolkit/Features/PaiementSlice";
import { addBL } from "../../ReduxToolkit/Features/BlSlice";
function AddBL() {
  const [enteteCommercial, setEnteteCommercial] = useState({
    timbre: "",
    quantite: "",
    soussociete_code: "",
    client_nom: "",
    net_a_payer: "",
    montant_total_ttc: "",
    client_code: "",
    depot_code: "",
    remise: "",
  });

  const [Paiement, setPaiement] = useState({

    client_code: "",
    espece: "",
    cheque: "",
    num_cheque: "",
    banque_cheque: "",
    montantTicket:"",
    traite: "",
    num_traite: "",
    banque_traite: "",
    credit: "",
    date_echeance_cheque: new Date(),
    date_echeance_traite: new Date(),
    date_echeance_credit: new Date(),
    commentaire: "",
  });
  const dispatch = useDispatch();
  const [distributeur, setDistributeur] = useState([]);
  const [camion, setCamion] = useState([]);
  const [produit, setProduit] = useState([]);
  const [item, setItem] = useState({
    produit_code: "",
    soussociete_code: "",
    depot_code: "",
  });
  const [formErrors, setFormErrors] = useState({
    depot_code: "",
    produit_code: "",
    soussociete_code: "",
  });
  const [CommercialRows, setCommercialRows] = useState([
    {
      produit_code: "",
    quantite: "",
    pu_ttc: "",
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
        total_net: "",
        total: "",
        remise: "",
      },
    ]);
  };

  const handleTraiteDateChange = (date) => {
    setPaiement((prevState) => ({
      ...prevState,
      date_echeance_traite: date[0],
    }));
    console.log("date3 paiment", Paiement);
  };
  const handleChequeDateChange = (date) => {
    setPaiement((prevState) => ({
      ...prevState,
      date_echeance_cheque: date[0],
    }));
    console.log("date2 paiment", Paiement);
  };
  const handleCreditDateChange = (date) => {
    setPaiement((prevState) => ({
      ...prevState,
      date_echeance_credit: date[0],
    }));
    console.log("date1 paiment", Paiement);
  };
  const handlePaiementChange = (event) => {
    const { name, value } = event.target;

    setPaiement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("paiement ", Paiement);
  };

  const handleEnteteChange = (event) => {
    const { name, value } = event.target;

    setEnteteCommercial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log("our entete  => chrayek trah ?", enteteCommercial);

  const handleCommercialChange = (event, index) => {
    const { name, value } = event.target;

    console.log("produit***********",value);

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

    if (!item.soussociete_code) {
      errors.soussociete_code = "Le distributeur est requise.";
      isValid = false;
    }
    if (!item.produit_code) {
      errors.produit_code = "Le produit est requise.";
      isValid = false;
    }
    if (!item.depot_code) {
      errors.depot_code = "Camion est requise.";
      isValid = false;
    }
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

    const result = await dispatch(addBL({ Paiement, enteteCommercial, CommercialRows })
    );
    // DISPATCH ENTETE---
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
      .get("http://localhost:5000/api/v1/sousSocietes")
      .then((res) => {
        console.log("Getting data", res.data);
        setDistributeur(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/stockcamion")
      .then((res) => {
        console.log("Getting data", res.data);
        setCamion(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const calculCredit=(montant_total_ttc,espece,cheque,traite)=>{
const cdt=montant_total_ttc-espece-cheque-traite;
return cdt;
  }
useEffect(()=>{
const credit= calculCredit(enteteCommercial.montant_total_ttc,Paiement.espece,Paiement.cheque,Paiement.traite);
setPaiement((prevState) => ({
  ...prevState,
  credit: credit,
}));
},[enteteCommercial.montant_total_ttc,Paiement.espece,Paiement.cheque,Paiement.traite]);
console.log('credit',Paiement.credit);
const calculespece=(montantTicket,quantite)=>{
  const esp=montantTicket*quantite;
  return esp;
    }
  useEffect(()=>{
  const espece= calculespece(Paiement.montantTicket,enteteCommercial.quantite);
  setPaiement((prevState) => ({
    ...prevState,
    espece: espece,
  }));
  },[enteteCommercial.quantite,Paiement.montantTicket]);
  console.log('espece',Paiement.espece);
  return (
    <>
      <div className="card">
        <div class="card-content"></div>
        <div className="invoice-detail-header">
          <div
            className="row justify-content-between"
            style={{ marginLeft: "1px" }}
          >
            <div className="col-xl-5">
              <div className="invoice-address-company-fields">
                <div className="form-group row">
                  <label
                    htmlFor="Name"
                    className="col-sm-3 col-form-label col-form-label-sm"
                  >
                    Nom Client passager
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="client_nom"
                      value={enteteCommercial.client_nom}
                      type="text"
                      className="form-control form-control-sm"
                      id="company-name"
                      placeholder="Business Name"
                      onChange={handleEnteteChange}
                    />
                  </div>
                </div>
                <div className="form-group row">
                <label
                   htmlFor="credit" className="col-sm-3 col-form-label col-form-label-sm">Crédit
                </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="credit"
                      className="form-control form-control-sm"
                      id="credit"
                      placeholder="0000.00"
                      value={Paiement.credit}
                      onChange={handlePaiementChange}
                      disabled  
                    />

                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="company-address"
                    className="col-sm-3 col-form-label col-form-label-sm"
                  >
                    Date echeance crédit
                  </label>
                  <div className="col-sm-9">
                    <Flatpickr
                      name="date_echeance_credit"
                      value={Paiement.date_echeance_credit}
                      onChange={handleCreditDateChange}
                      options={{
                        altInput: true,
                        altFormat: "F j, Y",
                        dateFormat: "Y-m-d",
                        defaultDate: "today",
                        minDate: "today",
                        maxDate: "2025-12-31",
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="company-phone"
                    className="col-sm-3 col-form-label col-form-label-sm"
                  >
                    Timbre
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="timbre"
                      value={enteteCommercial.timbre}
                      onChange={handleEnteteChange}
                      type="text"
                      className="form-control form-control-sm"
                      id="company-phone"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="form-group row" >
                  <label
                    htmlFor="company-phone"
                    className="col-sm-3 col-form-label col-form-label-sm">
                    Montant Ticket {" "}
                  </label>
                  <input
                  style={{width:"477px",marginLeft:"14px"}}
                      name="montantTicket"
                      value={Paiement.montantTicket}
                      onChange={handlePaiementChange}
                      type="text"
                      className="form-control form-control-sm"
                      id="company-phone"
                      placeholder="0"
                    />
                </div>
              </div>
            </div>
            <div className="col-xl-5 invoice-address-client">
              <div className="invoice-address-client-fields">
                <div
                  className="form-group row"
                  style={{ paddingRight: "35px" }}
                >
                  <label
                    htmlFor="client-name"
                    className="col-sm-3 col-form-label col-form-label-sm"
                  >
                    Quantité
                  </label>
                  <div className="col-sm-9">
                    <input
                      name="quantite"
                      value={enteteCommercial.quantite}
                      onChange={handleEnteteChange}
                      type="text"
                      className="form-control form-control-sm"
                      id="client-name"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div
                  className="form-group row"
                  style={{ paddingRight: "35px" }}
                >
                  <label
                    htmlFor="client-email"
                    className="col-sm-3 col-form-label col-form-label-sm"
                  >
                    Espece
                  </label>
                  <div className="col-sm-9">
                    <input
                      onChange={handlePaiementChange}
                      type="text"
                      name="espece"
                      value={Paiement.espece}
                      className="form-control form-control-sm"
                      id="espece"
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div
                  className="form-group row"
                  style={{ paddingRight: "35px" }}
                >
                  <label
                    htmlFor="client-email"
                    className="col-sm-3 col-form-label col-form-label-sm"
                  >
                    Paiement Espece
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="Paiement espece"
                      name="paiement_espece"
                      onChange={handlePaiementChange}
                      placeholder="0000.0000"
                      disabled
                    />
                  </div>
                </div>
                <div
                  className="form-group row"
                  style={{ paddingRight: "35px" }}
                >
                  <label
                    htmlFor="invoice-detail-notes"
                    className="col-sm-3 col-form-label col-form-label-sm"
                   
                  >
                    Commentaire
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      className="form-control"
                      id="invoice-detail-notes"
                      placeholder="Ecrire Ici..."
                      style={{ height: 88 }}
  
                      onChange={handlePaiementChange}
                      value={Paiement.commentaire}
                      name="commentaire"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invoice-detail-terms">
          <div className="row justify-content-between">
            <div className="col-md-3">
              <div className="form-group mb-4">
                <label htmlFor="date">Paiement Cheque </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="date"
                  name="cheque"
                  placeholder="Cheque"
                  value={Paiement.cheque}
                  onChange={handlePaiementChange}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="date"
                  name="num_cheque"
                  value={Paiement.num_cheque}
                  placeholder="Num cheque"
                  onChange={handlePaiementChange}
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-4">
                <label htmlFor="date">Paiement Cheque </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="date"
                  name="banque_cheque"
                  placeholder="Banque cheque"
                  value={Paiement.banque_cheque}
                  onChange={handlePaiementChange}
                />
                <div style={{ marginTop: "10px" }}>
                  <Flatpickr
                    name="date_echeance_cheque"
                    value={Paiement.date_echeance_cheque}
                    onChange={handleChequeDateChange}
                    placeholder="date echeance cheque "
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      defaultDate: "today",
                      minDate: "today",
                      maxDate: "2025-12-31",
                    }}
                    style={{ marginTop: "10px" }}
                    required
                  />{" "}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-4">
                <label htmlFor="due">Paiement Traite</label>
                <input
                  type="text"
                  name="traite"
                  value={Paiement.traite}
                  className="form-control form-control-sm"
                  id="due"
                  placeholder="Traite"
                  onChange={handlePaiementChange}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="due"
                  name="banque_traite"
                  value={Paiement.banque_traite}
                  onChange={handlePaiementChange}
                  placeholder="Banque Traite"
                  style={{ marginTop: "10px" }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mb-4">
                <label htmlFor="due">Paiement Traite</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="due"
                  name="num_traite"
                  placeholder="Num Traite "
                  value={Paiement.num_traite}
                  onChange={handlePaiementChange}
                />
                <div style={{ marginTop: "10px" }}>
                  <Flatpickr
                    name="date_echeance_traite"
                    value={Paiement.date_echeance_traite}
                    onChange={handleTraiteDateChange}
                    placeholder="date echeance Traite "
                    options={{
                      altInput: true,
                      altFormat: "F j, Y",
                      dateFormat: "Y-m-d",
                      defaultDate: "today",
                      minDate: "today",
                      maxDate: "2025-12-31",
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
        <div className="invoice-detail-items">
          <div className="row mb-4">
            <div className="col">
              {formErrors.soussociete_code && (
                <span className="text-danger">
                  {formErrors.soussociete_code}
                </span>
              )}
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Distributeur
              </label>
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
              {formErrors.depot_code && (
                <span className="text-danger">{formErrors.depot_code}</span>
              )}
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Camion
              </label>
              <select
                name="depot_code"
                id="depot_code"
                className="form-control form-control-sm"
                value={camion.depot_code}
                onChange={handleEnteteChange}
              >
                <option value="">Sélectionner une camion</option>
                {camion
                  .filter((eltCamion) =>
                    eltCamion.soussociete_code.includes(item.soussociete_code)
                  )
                  .map((camion) => (
                    <option value={camion.code}>{camion.libelle}</option>
                  ))}
              </select>
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Client
              </label>
              <input
                type="text"
                value={enteteCommercial.client_code}
                onChange={handleEnteteChange}
                className="form-control"
                placeholder="Client"
                name="client_code"
              />
            </div>
            <div className="col">
              <label className="new-control new-checkbox new-checkbox-text checkbox-primary">
                Total Remise
              </label>
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
                Total TTC{" "}
              </label>
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
                          .map((produit)=>(
                            <option
                            value={produit.code}
                            >
                              {produit.libelle}
                            </option>
                          ))}
                      </select>
                    </td>

                    {/* <td className="text-right carton">
                      <input
                        type="text"
                        name="carton"
                        className="form-control form-control-sm"
                        placeholder="0"
                        value={row.carton}
                        onChange={(e) => handleCommercialChange(e, index)}
                      />
                    </td> */}
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
                    <td className="text-right ">
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
                <Link to="/BondeLivraison">
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

export default AddBL;
