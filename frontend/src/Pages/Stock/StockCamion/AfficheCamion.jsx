import React, { useEffect, useState } from "react";
import "./Consulte.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./Print.css";
import axios from "axios";
import { Link } from "react-router-dom";
function AfficheCamion() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [commercialUpdate, setCommercialUpdate] = useState([]);
  const [commercialSelect, setCommercialslect] = useState([]);
  const [stock, setStock] = useState([]);
  const [produits, setProduits] = useState([]);
  const [client, setClient] = useState({});
  const [selectedCommercialCode, setSelecteCommercialCode] = useState([]);

  const getStock = async (id) => {
    const apiResponse = await axios.get(
      `http://localhost:5000/api/v1/detailsCamion/${id}`
    );
    console.log("response from api", apiResponse);
    setStock(apiResponse.data);
  };
  // Fonction qui récupère les données associées au commercial sélectionné
  const handleCommercialChange = (e) => {
    setSelecteCommercialCode(e.target.value);
    console.log("selectedCommercialCode", selectedCommercialCode);
    getStock(selectedCommercialCode);
  };

  useEffect(() => {
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

    axios
      .get("http://localhost:5000/api/v1/produit")
      .then((res) => {
        setProduits(res.data);

        // Assuming you have a state variable named 'commercialUpdate' and a setter function 'setCommercialUpdate'
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getStock(selectedCommercialCode);
    axios
      .get(
        `http://localhost:5000/api/v1/Entete/clientByUser/${selectedCommercialCode}`
      )
      .then((res) => {
        setClient(res.data);

        // Assuming you have a state variable named 'commercialUpdate' and a setter function 'setCommercialUpdate'
      })
      .catch((err) => console.log(err));
  }, [selectedCommercialCode]);

  console.log("clients", client);

  return (
    <>
      <div className="overlay" />
      <div className="cs-overlay" />
      <div className="search-overlay" />
      <div>
        <div className="layout-px-spacing">
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12 text-center"></div>
              </div>
            </div>
          </div>
          <div
            className="card"
            style={{
              marginTop: "40px",
              boxShadow: " 0px 0px 5px rgb(232, 230, 230)",
            }}
          >
            <div className="card-body">
              <div
                className="invoice"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYNsNnqMnIh5mnOD5YdFwLLvYo740wIb1pQMlIcd7Y1X-HqMYLhy5uR_iilWqhjb-M3P4&usqp=CAU"
                  style={{
                    width: "80%",
                    height: "340px",
                    marginLeft: "140px",
                    marginTop: "-22px",
                  }}
                />
                <div>
                  <div style={{ marginLeft: "auto" }}>
                    <h1 className="document-type display-4">Stock Camion</h1>
                    <p className="text-right"></p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ marginTop: "65px" }}>
                    <p className="addressMySam">
                      <strong>CLEDISS</strong>
                      <br />
                      Résidence Nahli 5 <br />
                      App A304 Riadh Andalous 2058,
                      <br /> Ariana 2058
                      <br />
                    </p>
                  </div>
                  <div>
                    <br />
                    <br />
                    <br />
                    <p className="addressDriver">
                      <strong>Société CLEDISS</strong>
                      <br />
                      Réf. Client <em>{client.code || "-"}</em>
                      <br />
                      <span>Prénom : {client.prenom || "-"}</span>
                      <br />
                      <span>Nom : {client.nom || "-"} </span>
                      <br />
                      <span>Adresse : {client.adresse || "-"}</span>
                      <br />
                      <span>Code postal : {"-"}</span>
                      <br />
                      <span>VILLE : {"-"}</span>
                    </p>
                  </div>
                </div>
                <br />
                <br />
                <div style={{ width: "250px" }}>
                  <label
                    htmlFor="commercial_code"
                    value={stock.commercial_code}
                  >
                    Commercial
                  </label>
                  <select
                    name="commercial_code"
                    id="commercial_code"
                    className="form-control form-control-sm"
                    onChange={handleCommercialChange}
                    value={stock.commercial_code}
                  >
                    <option value="">Sélectionner un commercial</option>
                    {commercialSelect.map((comm) => (
                      <option key={comm} value={comm}>
                        {comm}
                      </option>
                    ))}
                  </select>
                </div>

                <br />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Numéro camion</th>
                      <th>Colisage</th>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Etat</th>
                      <th>dlc</th>
                      <th>casse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.map((camion) => {
                      const produit = produits.find(
                        (produit) => produit.code === camion.produit_code
                      );
                      const colisage = produit ? produit.colisage : "";

                      const shouldHighlight = colisage > camion.quantite;
                      const rowStyle = shouldHighlight
                        ? { backgroundColor: "rgba(255, 0, 0, 0.3)" }
                        : {};

                      return (
                        <tr key={camion.id}>
                          <td style={rowStyle}>{camion.date}</td>
                          <td style={rowStyle}>{camion.depot_code}</td>
                          <td style={rowStyle}>{colisage || "-"}</td>
                          <td style={rowStyle}>{camion.produit_code}</td>
                          <td style={rowStyle}>{camion.quantite}</td>
                          <td style={rowStyle}>{camion.etat}</td>
                          <td style={rowStyle}>{camion.dlc}</td>
                          <td style={rowStyle}>{camion.casse}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                className="get-privacy-terms align-self-center"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
              <div>
              <Link to="/camion">
              <button class="btn btn-secondary mb-2 noprint" style={{marginLeft:"48px"}}>Retour</button>
              </Link>
              </div>
              <div>
              <button
              style={{marginRight:"48px"}}
              className="btn btn-primary noprint"
              onClick={() => window.print()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-printer"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>{" "}
              Imprimer
            </button>
              </div>
            
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AfficheCamion;
