import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PDFExport } from "@progress/kendo-react-pdf";
import'./PrintBL.css';
import {  Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { BiInfoCircle } from "react-icons/bi";
// import GammeAdd from "./GammeAdd";
import "./SearchBL.css";
import "./ScrollBL.css";
// import "./PaginationBL.css";
import { useDownloadExcel } from "react-export-table-to-excel";
import { RiFileExcel2Line } from "react-icons/ri";
import { deleteBLById, fetchBL } from "../../ReduxToolkit/Features/BlSlice";
import axios from "axios";

function BondeLivraisonPage() {
  const { id } = useParams();
  const [commercialUpdate, setCommercialUpdate] = useState([]);
  const [bondls, setBondls] = useState([]);
  const [selectedCommercialCode, setSelectedCommercialCode] = useState('');
  const [sommeTotalNet, setSommeTotalNet] = useState(0);
const [SommeTotalRemise,setTotalRemise]=useState(0);
const [distributeurUpdate, setDistributeurUpdate] = useState([]);
const enteteData = useSelector((state) => state.Entete.eneteComm);
  const navigate=useNavigate();
  const handleCommercialChange = (e) => {
    setSelectedCommercialCode(e.target.value);
  };
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/BL")
      .then((res) => {
        console.log("Getting commercial update data", res.data);
        setCommercialUpdate(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (selectedCommercialCode) {
      getBls(selectedCommercialCode);
    }
  }, [selectedCommercialCode]);
  
  const getBls = async (id) => {
    const apiResponse = await axios.get(
      `http://localhost:5000/api/v1/BL/${id}`
    );
    console.log("bondalllllllll from api", apiResponse.data);
    setBondls(apiResponse.data);
  };
  const dispatch = useDispatch();
//   const gammeState = useSelector((state) => state.gamme);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "BL Data",
  });
  const blState = useSelector((state) => state.BL);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const DetailsBL=(id)=>{
    navigate(`/DetailsBL/${id}`);
       }
  useEffect(() => {
    dispatch(fetchBL());
    setBondls(blState.bondelivs)
    axios
    .get("http://localhost:5000/api/v1/sousSocietes/")
    .then((res) => {
      setDistributeurUpdate(res.data);
    })
    .catch((err) => console.log(err));
  }, [dispatch]);
  // const EditBL = (id) => {
  //   navigate(`/editBL/${id}`);
  // };
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "êtes-vous sûr de vouloir supprimer une BL définitivement ?"
      )
    ) {
      //  -----------------------------------------------------------------
      await dispatch(deleteBLById(id));
      await dispatch(fetchBL());
    }
  };
 
//   useEffect(()=>{
//     axios
//     .get("http://localhost:5000/api/v1/sousSocietes/")
//     .then((res) => {
//       setDistributeurUpdate(res.data);
//     })
// },[])
  const itemsPerPage = 5;
  const totalPages = Math.ceil(blState.bondelivs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Fichier BL",
    sheet: "BL File",
  });
  console.log("commmmeer",bondls);

  useEffect(() => {
    // Calculez la somme du total net lorsque les données changent
    console.log("totall commercialUpdate",commercialUpdate);

    const sum = commercialUpdate.reduce((acc, item) => acc + item.net_a_payer, 0);
    setSommeTotalNet(sum)
   console.log("totall nettt",sum);
  }, [commercialUpdate]);
useEffect(()=>{
  console.log("total ",commercialUpdate);
  const sumR=commercialUpdate.reduce((acc, item) => acc + item.remise, 0);
  setTotalRemise(sumR);
  console.log("total Remise",commercialUpdate);
})
  return (
    <div className="main-container" id="container">
    <div id="content">
      <div>{/* <h4 className>Show/ Hide Columns</h4> */}</div>
      <div className="col-lg-12">
        
        <div
          className="statbox widget box box-shadow"
          style={{ borderRadius: "10px", marginLeft: "-240px" }}
        >
            <div style={{paddingTop:"0.3%"}}>
            <div style={{ marginTop: "32px", paddingLeft: "16px" }}>
            <Link to="/AjouterBL">
            <button
            style={{backgroundColor:"#191e3a",color:"White"}}
              type="button"
              className="btn btn mb-2 mr-2">
              +
            </button>
              </Link>
              <button
              style={{backgroundColor:"#650065",color:"White"}}
                onClick={handlePrint}
                className="btn btn mb-2 mr-2"
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
              <button className="btn btn mb-2" style={{backgroundColor:"#e3e4eb"}} onClick={onDownload}>
                <RiFileExcel2Line />
              </button>
            </div>
            </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            
               <div style={{width:"180px",marginTop:"15px",marginLeft:"15px"}}>

               <select
  name="commercial_code"
  id="commercial_code"
  className="form-control form-control-sm"
  onChange={handleCommercialChange}
  value={bondls.commercial_code}
>
  <option value="">Sélectionner un commercial</option>
  {commercialUpdate
    .filter(
      (comm, index, self) =>
        index === self.findIndex((c) => c.commercial_code === comm.commercial_code)
    )
    .map((comm) => (
      <option key={comm.commercial_code} value={comm.commercial_code}>
        {comm.commercial_code}
      </option>
    ))}
</select>
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
            ref={componentRef}>
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
              <th></th>
              <th></th>
              <th></th>
              
  <th  style={{textTransform: "capitalize"}}>Total Remise: {SommeTotalRemise}</th>
  <th></th>
  <th></th>
  <th></th>
  <th></th>
  <th  style={{textTransform: "capitalize"}}> Total NET: {sommeTotalNet}</th>
  <th></th>
  <th></th>
  <th></th>
  <th></th>
</tr>
<tr>
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
                    Code
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
                    Vendeur
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
                    Camion
                  </th>
                  <th
                    className="text-center dt-no-sorting"
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
                    Code Client
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
                    Client
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
               Magasin
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
                     Remise
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
                   Remise Espace
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
                    Total TTC
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
                   Net a payer
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
                  Date
                  </th>
             
                  <th
                    className="text-center dt-no-sorting noprint"
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
    <tbody>
    {blState.status == "succeeded" ? (
                bondls
                  .filter((bdl) => {
                    return search.toLowerCase() === ""
                      ? bdl
                      : bdl.date.toLowerCase().includes(search);
                  })
                  .slice(startIndex, endIndex)
                  .map((bdl) => {
                    let libelleDistributeur = "";
                    distributeurUpdate.forEach((element) => {
                      if (element.code === bdl.soussociete_code) {
                        console.log("element",element)
                        libelleDistributeur = element.nom;
                        console.log("libelleDistributeur",libelleDistributeur)
                      }
                     
                    });
                    return (
                      <tr  className="hoverable" key={bdl.id}>
                        
                        <td style={{backgroundColor:"transparent"}}>{bdl.code}</td>
                        <td style={{backgroundColor:"transparent"}}>{bdl.commercial_code}</td>
                        <td style={{backgroundColor:"transparent"}}>{bdl.depot_code }</td>
                        <td style={{backgroundColor:"transparent"}}>{libelleDistributeur}</td>
                        <td style={{backgroundColor:"transparent"}}>{bdl.client_code}</td>
                        <td style={{backgroundColor:"transparent"}}>{bdl.client_nom}</td>
                        <td style={{backgroundColor:"transparent"}} >{bdl.grossiste_code}</td>
                        <td style={{backgroundColor:"transparent"}} >{bdl.remise}</td>
                        <td  style={{backgroundColor:"transparent"}}>{bdl.remiseEspece}</td>
                        <td style={{backgroundColor:"transparent"}} >{bdl.montant_total_ttc}</td>
                        <td style={{backgroundColor:"transparent"}} >{bdl.net_a_payer}</td>
                        <td style={{backgroundColor:"transparent"}} >{bdl.date}</td>
                        <td
                          className="text-center noprint"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundColor:"transparent",
                          }}
                        >
                          {/*  <button type="button" style={{border:"none", marginRight: "25px"}}  data-toggle="modal" data-target="#fadeupModal" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 text-success"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button> */}

                          <button
                            type="button"
                            className="noprint"
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Details"
                            data-original-title="Edit"
                            // onClick={() => EditGamme(data.id)}
                          >
                          <BiInfoCircle style={{color:"Balck",fontSize:"23px",marginRight:"9px"}} onClick={()=>DetailsBL(bdl.code)}/>
                          </button>
                          <button
                            className="noprint"
                            style={{ border: "none",backgroundColor:"transparent", }}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            data-original-title="Delete"
                            onClick={() => handleDelete(bdl.id)}
                          >
                            <MdDelete style={{fontSize:"27px",color:"#650065"}}/>
                          </button>
                        </td>
                      </tr>
                      );
                  })
              ) : (
                <div>Loading</div>
              )}
            </tbody>
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
      {totalPages <= 7 ? (
        // Afficher toutes les pages si le nombre total de pages est inférieur ou égal à 7
        Array.from({ length: totalPages }).map((_, i) => (
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
        ))
      ) : (
        // Utiliser des ellipses si le nombre total de pages est supérieur à 7
        <>
          <li
            className={`page-item ${
              1 === currentPage ? "active" : ""
            }`}
            key={1}
          >
            <a href="#" className="num" onClick={() => paginate(1)}>
              1
            </a>
          </li>
          {currentPage > 4 && (
            <li className="page-item ellipsis" key="start-ellipsis">
              <span style={{color:"black",border:"none"}}>...</span>
            </li>
          )}
          {Array.from({ length: 5 }).map((_, i) => {
            const pageNumber =
              currentPage <= 3
                ? i + 2
                : currentPage >= totalPages - 2
                ? totalPages - 4 + i
                : currentPage - 2 + i;
            return (
              <li
                className={`page-item ${
                  pageNumber === currentPage ? "active" : ""
                }`}
                key={pageNumber}
              >
                <a
                  href="#"
                  className="num"
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </a>
              </li>
            );
          })}
          {currentPage < totalPages - 3 && (
            <li className="page-item ellipsis" key="end-ellipsis">
              <span style={{color:"black",border:"none"}}>...</span>
            </li>
          )}
          <li
            className={`page-item ${
              totalPages === currentPage ? "active" : ""
            }`}
            key={totalPages}
          >
            <a
              href="#"
              className="num"
              onClick={() => paginate(totalPages)}
            >
              {totalPages}
            </a>
          </li>
        </>
      )}
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
  )
}

export default BondeLivraisonPage