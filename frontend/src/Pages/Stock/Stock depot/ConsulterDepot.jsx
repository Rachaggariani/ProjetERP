import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  deleteDepotById,
  fetchDepot,
} from "../../../ReduxToolkit/Features/StockDepotSlice";
import DepotAdd from "./DepotAdd";
import { IoIosAdd } from "react-icons/io";
import { FaFileImport } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
function ConsulterDepot() {
  const [data,setData]=useState([]);
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let produitLibelle = "";
  let distributeurLibelle = "";
  let fournisseurLibelle = "";
  const [ProduitUpdate, setProduitUpdate] = useState([]);
  const [FournisseurUpdate, setFournisseurUpdate] = useState([]);
  const [distributeurUpdate, setDistributeurUpdate] = useState([]);
  const depotState = useSelector((state) => state.depot);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(depotState.depots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    dispatch(fetchDepot());
    axios
      .get("http://localhost:5000/api/v1/produit/")
      .then((res) => {
        setProduitUpdate(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/api/v1/fournisseur/")
      .then((res) => {
        setFournisseurUpdate(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/api/v1/sousSocietes/")
      .then((res) => {
        setDistributeurUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  const EditDepot = (id) => {
    navigate(`/editDepot/${id}`);
  };
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "êtes-vous sûr de vouloir supprimer un depot définitivement ?"
      )
    ) {
      //  -----------------------------------------------------------------
      await dispatch(deleteDepotById(id));
      await dispatch(fetchDepot());
    }
  };
  const openModalAjout = () => {
    const modal = document.getElementById("fadeupModal");
    modal.style.display = "block";
  };

  console.log("Produit data", ProduitUpdate);

  return (
    <>
      <div className="main-container" id="container">
        <div className="overlay" />
        <div className="cs-overlay" />
        <div className="search-overlay" />
        <div id="tableHover" className="col-lg-12 col-12 layout-spacing">
          <div className="statbox widget box box-shadow">
            <div style={{ marginTop: "58px" }}>
              <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12"></div>
              </div>
            </div>
            <div className="widget-content widget-content-area">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="d-flex">
                  <button
                    class=" btn-primary btn-circle"
                    data-toggle="modal"
                    data-target="#fadeupModal"
                    style={{
                      position: "relative",
                      marginRight: "2px",
                      marginBottom: "20px",
                    }}
                    onClick={() => {
                      openModalAjout();
                    }}
                  >
                    <IoIosAdd style={{ fontSize: "25px" }} />
                  </button>
                  <DepotAdd modalDisplay={modalDisplay} />

                  
                </div>
                <div style={{paddingLeft:"1444px"}}>
                <label htmlFor="input-file-max-fs" className=" mb-2 mr-2" style={{ border: "none" }}>
                <FaFileImport style={{ color: "black",width:"54px",height:"26px" }} />
              </label>
              <input
                type="file"
                id="input-file-max-fs"
                className="dropify"
                data-max-file-size="2M"
                accept=".xlsx, .xls"
                onChange={(e) => handleFileUpload(e)}
                style={{ display: "none" }}
              />
              </div>
                <div>
                
                </div>
              
              </div>
              <div
              style={{
                display:"flex",
                justifyContent:"flex-end",
                position: "relative",
                marginRight: "-1px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                className="noprint"
                style={{
                  background: "#fff",
                  width: "170px",
                  border: "none",
                  boxShadow: "none",
                  borderRadius: "6px",
                  border: "1px solid #e0e6ed",
                  padding: "6px 29px 8px 14px",
                  height: "auto",
                  fontSize: "12px",
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Recherche..."
              />
              <svg
                style={{
                  color: "#d3d3d3",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "10px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="10" cy="10" r="6"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
              <div className="table-responsive">
              {data.length>0?(
                <table className="table table-bordered item-table">
                              <thead>
                                <tr>
                                  {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((row, index) => (
                                  <tr key={index}>
                                    {Object.values(row).map((value, index) => (
                                      <td key={index}>{value}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
              ):(    <table className="table table-bordered table-hover table-striped mb-4">
              <thead>
                <tr>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Code
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Produit
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Fournisseur
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Distributeur
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#B4DEB8",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Colisage
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      backgroundColor: "#E3ACBB",
                      textTransform: "none",
                    }}
                  >
                    Quantité en piéce
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      backgroundColor: "#B4DEB8",
                      textTransform: "none",
                    }}
                  >
                    Quantité en carton
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      backgroundColor: "#AAF0D1",
                      textTransform: "none",
                    }}
                  >
                    Valorisé achat
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#99caff",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Valorisé vente
                  </th>
                  <th
                    className=""
                    tabindex="0"
                    aria-controls="show-hide-col"
                    rowspan="1"
                    colspan="1"
                    aria-label="Position: activate to sort column ascending"
                    style={{
                      backgroundColor: "#F2F3F4",
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              {depotState.status == "succeeded" ? (
                depotState.depots
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.code.toLowerCase().includes(search);
                  })
                  .slice(startIndex, endIndex)
                  .map((data) => {
                    ProduitUpdate.forEach((element) => {
                      if (element.code === data.produit_code) {
                        produitLibelle = element.libelle;
                      }
                    });
                    FournisseurUpdate.forEach((element) => {
                      if (element.code === data.fournisseur_code) {
                        fournisseurLibelle = element.libelle;
                      }
                    });
                    distributeurUpdate.forEach((element) => {
                      if (element.code === data.soussociete_code) {
                        distributeurLibelle = element.nom;
                      }
                    });

                    return (
                      <tr className="hoverable" key={data.id}>
                        <td>{data.code}</td>
                        <td>{produitLibelle}</td>
                        <td>{fournisseurLibelle}</td>
                        <td>{distributeurLibelle}</td>
                        <td style={{ backgroundColor: "#B4DEB8" }}>
                          {data.colisage}
                        </td>
                        <td style={{ backgroundColor: "#E3ACBB" }}>
                          {data.qte_piece}
                        </td>
                        <td style={{ backgroundColor: "#B4DEB8" }}>
                          {data.qte_carton}
                        </td>
                        <td style={{ backgroundColor: "#AAF0D1" }}>
                          {data.val_achat}
                        </td>
                        <td style={{ backgroundColor: "#99caff" }}>
                          {data.val_vente}
                        </td>
                        <td
                          className="text-center noprint"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            type="button"
                            className="noprint"
                            style={{
                              border: "none",
                            }}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            data-original-title="Edit"
                            onClick={() => EditDepot(data.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="feather feather-check-circle text-primary"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </button>
                          <button
                            href="javascript:void(0);"
                            class="bs-tooltip"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Delete"
                            style={{
                              border: "none",
                              color: "#CC0605",
                              width: "5px",
                              height: "5px",
                            }}
                            onClick={() => handleDelete(data.id)}
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
                              class="feather feather-x-octagon table-cancel"
                            >
                              <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                              <line x1="15" y1="9" x2="9" y2="15"></line>
                              <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <div>Loading</div>
              )}
            </table>)}
            
                <div className="pagination-container">
                  <nav aria-label="Pagination">
                    <ul className="pagination">
                      <li className="page-item bichevron-left">
                        <a
                          href="#"
                          className=""
                          onClick={() => paginate(currentPage - 1)}
                        ></a>
                      </li>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <li
                          className={`page-item ${
                            i + 1 === currentPage ? "active" : ""
                          }`}
                          key={i}
                        >
                          <a
                            href="#"
                            className="num"
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </a>
                        </li>
                      ))}
                      <li className="page-item bichevron-right">
                        <a
                          href="#"
                          className=""
                          onClick={() => paginate(currentPage + 1)}
                        ></a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConsulterDepot;
