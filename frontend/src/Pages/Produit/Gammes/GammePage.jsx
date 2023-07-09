import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PDFExport } from "@progress/kendo-react-pdf";
import "../Gammes/print.css";
import {  useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GammeAdd from "./GammeAdd";
import "../Gammes/search.css";
import { GiSquare } from "react-icons/gi";
import "../Gammes/Scroll.css";
import {
  deleteGammeById,
  fetchGammes,
} from "../../../ReduxToolkit/Features/GammeSlice";
import "../Gammes/paginationGamme.css";
import { useDownloadExcel } from "react-export-table-to-excel";
import { RiFileExcel2Line } from "react-icons/ri";
function GammePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gammeState = useSelector((state) => state.gamme);
  const [modalDisplay, setModalDisplay] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Gamme Data",
  });
  const openModalAjout = () => {
    const modal = document.getElementById("fadeupModal");
    modal.style.display = "block";
  };
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
   dispatch(fetchGammes());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "êtes-vous sûr de vouloir supprimer une gamme définitivement ?"
      )
    ) {
      //  -----------------------------------------------------------------
      await dispatch(deleteGammeById(id));
      await dispatch(fetchGammes());
    }
  };
  const EditGamme = (id) => {
    navigate(`/editgamme/${id}`);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
  const totalPages = Math.ceil(gammeState.gammes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Fichier Gamme",
    sheet: "Gamme File",
  });
  return (
    <>
      <div className="main-container" id="container">
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
                <div style={{ marginTop: "32px", paddingLeft: "16px" }}>
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
  Ajouter Gamme
</button>
                  <GammeAdd modalDisplay={modalDisplay} />
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-download"
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
                <div>
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
              </div>
              <PDFExport
                paperSize="A4"
                fileName="GammeData.pdf"
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
                        Image
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
                        className="sorting scrollable-cell text-center dt-no-sorting"
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
                        Couleur
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
                  {gammeState.status == "succeeded" ? (
                    gammeState.gammes
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.libelle.toLowerCase().includes(search);
                      })
                      .slice(startIndex, endIndex)
                      .map((data) => {
                        return (
                          <tr key={data.id}>
                            <td>
                              <img src={data.image} style={{ width: "60px" }} />
                            </td>
                            <td>{data.code}</td>
                            <td>{data.libelle}</td>
                            <td>
                              <GiSquare
                                style={{
                                  marginLeft: "119px",
                                  marginTop: "11px",
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: data.color,
                                }}
                              />
                            </td>
                            <td>{data.ordre}</td>

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
                                onClick={() => EditGamme(data.id)}
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
export default GammePage;
