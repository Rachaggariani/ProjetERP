import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SousFamilleAdd from "./SousFamilleAdd";
import { useReactToPrint } from "react-to-print";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useNavigate } from "react-router-dom";
import "../SousFamille/Scroll.css";
import "../SousFamille/paginatiossousfamille.css";
import { useDownloadExcel } from "react-export-table-to-excel";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  deleteSousfamilleById,
  fetchSousfamilles,
} from "../../../ReduxToolkit/Features/SousFamilleSlice";
import "../SousFamille/paginatiossousfamille.css";
import axios from "axios";
function SousFamilePages() {
  const dispatch = useDispatch();
  const sousfamilleState = useSelector((state) => state.sousfamille);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [familleupdate, setFamilleUpdate] = useState([]);

  const openModalAjout = () => {
    const modal = document.getElementById("fadeupModal");
    modal.style.display = "block";
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Sous Famille Data",
  });
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchSousfamilles());
    axios
      .get("http://localhost:5000/api/v1/famille/")
      .then((res) => {
        setFamilleUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer une famille définitivement ?"
      )
    ) {
      await dispatch(deleteSousfamilleById(id));
      await dispatch(fetchSousfamilles());
    }
  };
  const EditsousFamille = (id) => {
    navigate(`/editsousfamille/${id}`);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const tableRef = useRef(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(sousfamilleState.familles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Fichier Sous Famille",
    sheet: "Sous Famille File",
  });
  return (
    <>
      <div className="main-container" id="container">
        {/*  BEGIN CONTENT AREA  */}
        <div id="content">
          <div>{/* <h4 className>Show/ Hide Columns</h4> */}</div>
          <div className="col-lg-12">
            <div
              className="statbox widget box box-shadow"
              style={{ borderRadius: "10px", marginLeft: "-240px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    marginTop: "32px",
                    paddingLeft: "16px",
                    display: "flex",
                  }}
                >
                  <button
                    type="button"
                    className="btn mb-2 mr-2"
                    style={{backgroundColor: "#0F056B",color:"white"}}
                    data-toggle="modal"
                    data-target="#fadeupModal"
                    onClick={() => {
                      openModalAjout();
                    }}
                  >
                    Ajouter Sous Famille
                  </button>
                  <SousFamilleAdd modalDisplay={modalDisplay} />
                  <button
                    onClick={handlePrint}
                    className="btn btn-danger mb-2 mr-2"
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
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                  <button className="btn btn-success mb-2" onClick={onDownload}>
                    <RiFileExcel2Line />
                  </button>
                </div>
                <div
                  style={{
                    position: "relative",
                    marginRight: "18px",
                    marginTop: "25px",
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
                      paddingRight: "20px",
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
              </div>
              <PDFExport
                paperSize="A4"
                fileName="FamilleData.pdf"
                ref={componentRef}
              >
                <table
                  id="show-hide-col"
                  className="table"
                  style={{
                    width: "98.2%",
                    marginTop: "15px",
                    marginLeft: "13px",
                    border: "1px solid #F2F3F4",
                  }}
                  ref={tableRef}
                >
                  <thead style={{ borderBottom: "none" }}>
                    <tr>
                      <th
                        className="sorting scrollable-cell"
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
                        className="sorting scrollable-cell"
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
                        Libelle
                      </th>
                      <th
                        className="sorting scrollable-cell"
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
                        Famille
                      </th>
                      <th
                        className="sorting scrollable-cell"
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
                        Prix sousfamille ht
                      </th>
                      <th
                        className="sorting scrollable-cell"
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
                        Prix sousfamille ttc
                      </th>
                      <th
                        className="sorting scrollable-cell"
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
                        Ordre
                      </th>
                      <th
                        className="sorting scrollable-cell text-center dt-no-sorting noprint"
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
                  {sousfamilleState.status == "succeeded" ? (
                    sousfamilleState.familles
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.libelle.toLowerCase().includes(search);
                      })
                      .slice(startIndex, endIndex)
                      .map((sousfamille) => {
                        let libelleFamille = "";
                        familleupdate.forEach((element) => {
                          if (element.code === sousfamille.famille_code) {
                            libelleFamille = element.libelle;
                          }
                        });
                        return (
                          <tr key={sousfamille.id}>
                            <td>{sousfamille.code}</td>
                            <td>{sousfamille.libelle}</td>
                            <td>{libelleFamille}</td>
                            <td>{sousfamille.prix_sousfamille_ht}</td>
                            <td>{sousfamille.prix_sousfamille_ttc}</td>
                            <td>{sousfamille.ordre}</td>
                            <td
                              className="text-center noprint"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {/*  <button type="button" style={{border:"none", marginRight: "25px"}}  data-toggle="modal" data-target="#fadeupModal" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 text-success"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button> */}
                              <button
                                type="button"
                                className="noprint"
                                style={{
                                  border: "none",
                                  backgroundColor: "white",
                                }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                data-original-title="Edit"
                                onClick={() => EditsousFamille(sousfamille.id)}
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
                                  class="feather feather-check-circle text-primary"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                              </button>
                              <button
                                className="noprint"
                                style={{ border: "none" }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                                data-original-title="Delete"
                                onClick={() => handleDelete(sousfamille.id)}
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
                                  class="feather feather-x-circle text-danger"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
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
                  <tbody></tbody>
                </table>
              </PDFExport>
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
    </>
  );
}

export default SousFamilePages;
