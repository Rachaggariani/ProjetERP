import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSousSocietes } from '../../ReduxToolkit/Features/SousSocieteSlice';

function SousSocietePage() {
  const sousSocieteData = useSelector((state) => state.sousSociete);

  const dispatch = useDispatch();
  console.log("above",sousSocieteData);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = sousSocieteData.sousSocietes.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(fetchSousSocietes());
    console.log("sous",sousSocieteData);
  
   }, [dispatch]);
  return (
    <div className="container">
    <p className="lead myprofile titleS">Liste des sous societes</p>
      <hr style={{width:280,marginRight:1690}}/>
  <div className="row">
    <div className="col-lg-12">
      <div className="main-box clearfix">
        <div className="table-responsive">
          <table className="table user-list">
            <thead>
              <tr>
                <th><span>Code</span></th>
                <th><span>Sous societes</span></th>
                <th><span>Adresse</span></th>
                <th ><span>MF</span></th>
                <th><span>Societe</span></th>
                <th><span>Actions</span></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            
            <tbody>
            {sousSocieteData.status === "succeeded" ? (
              items.map((current) => (
              <tr>
              <td>{current.code}</td>
                <td>
               {current.nom}
                </td>
                <td>
                  {current.adresse}
                </td>
                
                <td>
                  {current.matricule_fiscale}
                </td>
                <td>
                  {current.societe_code}
                </td>
                <td style={{width: "20%"}}>
                  <a href="#" className="table-link">
                    <span className="fa-stack">
                      <i className="fa fa-square fa-stack-2x"></i>
                      <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                  <a href="#" className="table-link">
                    <span className="fa-stack">
                      <i className="fa fa-square fa-stack-2x"></i>
                      <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                  <a href="#" className="table-link danger">
                    <span className="fa-stack">
                      <i className="fa fa-square fa-stack-2x"></i>
                      <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </td>
              </tr>))):(
                <tr>
                      <td colSpan="3" className="text-center">
                        {sousSocieteData.error}
                      </td>
                    </tr>
              )
            }
            </tbody>
          </table>
        </div>
        <div className="text-center mt-3 mt-sm-3">
              <ul className="pagination justify-content-center mb-0">
                <li className="page-item disabled"> <span className="page-link">Prev</span> </li>
                <li className="page-item active" aria-current="page"><span className="page-link">1 </span> <span className="sr-only">(current)</span></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">...</a></li>
                <li className="page-item"><a className="page-link" href="#">8</a></li>
                <li className="page-item"> <a className="page-link" href="#">Next</a> </li>
              </ul>
            </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default SousSocietePage