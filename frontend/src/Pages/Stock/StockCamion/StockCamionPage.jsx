import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import './PaginationCamion.css';
import './CamionStyle.css';
import { FiGrid } from "react-icons/fi";
import {IoIosAdd} from "react-icons/io";
import { deleteCamionById, fetchCamion } from '../../../ReduxToolkit/Features/CamionStockSlice';
import { useNavigate } from 'react-router';
import AddCamion from './AddCamion';
import './Button.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
function StockCamionPage() {
  const [search, setSearch] = useState("");
  const [modalDisplay,setModalDisplay]= useState(false);
  const navigate = useNavigate();
  const camionState = useSelector((state) => state.camion);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const openModalAjout=()=>{
    const modal = document.getElementById('fadeupModal');
    modal.style.display = 'block';
  }
  

  const handleDelete = async (id) => {
  if (
      window.confirm(
        "êtes-vous sûr de vouloir supprimer un camion définitivement ?"
      )
  ){
      //  -----------------------------------------------------------------
      await dispatch(deleteCamionById(id));
      await dispatch(fetchCamion());
    }
  };
  const EditCamion = (id) => {
    navigate(`/editCamion/${id}`);
  };
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(camionState.camions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [distributeurUpdate, setDistributeurUpdate] = useState([]);
  useEffect(() => {
    dispatch(fetchCamion());
    axios
    .get("http://localhost:5000/api/v1/sousSocietes/")
    .then((res) => {
      setDistributeurUpdate(res.data);
    })
    .catch((err) => console.log(err));
  }, [dispatch]);
  
  // useEffect(()=>{
   
  // })
  return (
    <>
    <div className="main-container" id="container">
      <div className="overlay" />
      <div className="cs-overlay" />
      <div className="search-overlay" />
     <div id="tableHover" className="col-lg-12 col-12 layout-spacing">
      <div className="statbox widget box box-shadow">
       <div style={{marginTop:"58px"}}>
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
              {/* <h4>Hover Table</h4> */}
            </div>                 
          </div>
        </div>
        <div className="widget-content widget-content-area">
        <div style={{marginTop:"5px"}}>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"20px"}}>
          <Link to="/stockcamion">
                            <butonn><FiGrid style={{ color: 'black', width:"20",height:"20"  }}/></butonn> 
                            </Link>
          </div>
        <div style={{ display: "flex",justifyContent:"space-between" }}>
        <div className="d-flex" >
    <button class=" btn-primary btn-circle" data-toggle="modal" data-target="#fadeupModal"  style={{
      position: "relative",
      marginRight: "2px",
      marginBottom: "20px",
    }}
    onClick={()=>{openModalAjout()}}
    >
      <IoIosAdd style={{ fontSize: "25px" }} />
    </button>
    <AddCamion modalDisplay={modalDisplay}/>
  </div>
  <div
    style={{
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
 </div>
</div>
          <div className="table-responsive">
            <table  className="table table-bordered table-hover table-striped mb-4">
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
                        Libelle
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
                          backgroundColor: "#F2F3F4",
                          color: "black",
                          textTransform: "none",
                        }}
                      >
                        Destination
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
                        Site Ventes
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
                        Type
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
                        BLS
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
                        Commandes
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
                        Recouvrements
                      </th>
                      <th
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
                        O.Achat.Avoir
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
                        Syncronisation
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
                        Taux avoir 
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
                        }}>
                         Paiement Espéce 
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
                        }}>
                         Remise 
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
                        }}>
                       Gestion Client   
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
                        }}>
                          Vente Credit
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
                      Plafond Credit
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
                      Version
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
                          textTransform: "none",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  
                  {camionState.status == "succeeded" ? (
                    camionState.camions
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.libelle.toLowerCase().includes(search);
                      })
                      .slice(startIndex, endIndex)
                      .map((data) => {
                        let libelleDistributeur = "";
                        distributeurUpdate.forEach((element) => {
                          if (element.code === data.soussociete_code) {
                            console.log("element",element)
                            libelleDistributeur = element.nom;
                            console.log("libelleDistributeur",libelleDistributeur)
                          }
                         
                        });
                        return (
                          <tr  className="hoverable" key={data.id}>
                            <td>{data.code}</td>
                            <td>{data.libelle}</td>
                            <td>{libelleDistributeur}</td>
                            <td>{data.adresse}</td>
                            <td>{data.site_vente}</td>
                            <td>{data.type}</td>
                            <td>{data.max_bl}</td>
                            <td>{data.max_cmd}</td>
                            <td>{data.max_recouvrement}</td>
                            <td>{data.obligation_achat_avoir}</td>
                            <td>{data.sync_clients}</td>
                            <td>{data.avoir}</td>
                            <td>{data.Paiement_Esp}</td>
                            <td>{data.remise}</td>
                            <td>{data.autorisation_client}</td>
                            <td>{data.vente_credit}</td>
                        
                            <td>{data.plafond_credit}</td>
                            <td>{data.version}</td>
                            <td>{data.colisage}</td>
                            <td
                              className="text-center noprint"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                            
                              {/*  <button type="button" style={{border:"none", marginRight: "25px"}}  data-toggle="modal" data-target="#fadeupModal" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 text-success"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button> */}

                              {/* <button
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
                              </button> */}
                              
                              <button
                                type="button"
                                className="noprint"
                                style={{
                                  border: "none"
                              
                                }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Edit"
                                data-original-title="Edit"
                                onClick={() => EditCamion(data.id)}
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
     <button href="javascript:void(0);" class="bs-tooltip" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" style={{
                                  border: "none",color:"#CC0605",width:"5px",height:"5px"}} 
                                  onClick={() => handleDelete(data.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-octagon table-cancel"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg></button>
                                        </td>
                          </tr>
                        );
                      })
                  ) : (
                    <div>Loading</div>
                  )}
            </table>
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
  )
}

export default StockCamionPage