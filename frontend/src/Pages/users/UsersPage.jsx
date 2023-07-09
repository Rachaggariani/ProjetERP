import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from '../../Components/Users/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersFailed, setUsersPending, setUsersSuccess } from '../../ReduxToolkit/Features/UserSlice';
import Pagination from "react-bootstrap/Pagination";
function UsersPage() {
     const [user, setUser] = useState({
        code: "",
        code_a_barre: "",
        nom: "",
        prenom:"",
        telephone:"",
        mobile:"",
        cin:"",
        email:"",
        login:"",
        password:"",
        matricule:"",
        grade:"",
        type:"",
        pre_commande:"",
        role_code:"",
        societe_code:"",
        soussociete_code:"",
        isactif:"",
        only_my_data:"",
        vente_comptoir:"",
        adresse:""
      });
      
      const userData = useSelector((state) => state.user);

      const dispatch = useDispatch();

      const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = userData.users.slice(startIndex, endIndex);
      useEffect(() => {
        const fetchUsers = () => {
          dispatch(setUsersPending());
          axios
            .get("/users")
            .then((response) => {
              dispatch(setUsersSuccess(response.data));
            })
            .catch((error) => {
              dispatch(setUsersFailed(error.message));
            });
        };
    
        fetchUsers();
      }, [dispatch]);

  return (
    <div id="content1" className="main-content col-lg-12">
    <div className="layout-px-spacing">                
        <div className="row layout-spacing layout-top-spacing" id="cancel-row">
            <div className="col-lg-12">
                <div className="widget-content searchable-container list ">

                    <div className="row">
                        <div className="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search layout-spacing align-self-center">
                            <form className="form-inline my-2 my-lg-0">
                                <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    <input type="text" className="form-control product-search" id="input-search" placeholder="Search Contacts..."/>
                                </div>
                            </form>
                        </div>

                        <div className="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
                            <div className="d-flex justify-content-sm-end justify-content-center">
                               <Link to="/add_User"> <svg id="btn-add-contact" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg> </Link>

                                <div className="switch align-self-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list view-list active-view"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid view-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="searchable-items list ">
                        <div className="items items-header-section ">
                            <div className="item-content ">

							
                                <div className="users">
                                    
                                    <h4>Utilisateurs</h4>
                                </div>
                                <div className="user-email  ">
                                    <h4>Email</h4>
                                </div>
                                <div className="user-location  ">
                                    <h4 style={{"marginLeft": 0}}>Location</h4>
                                </div>
                                <div className="user-phone ">
                                    <h4 style={{"marginLeft": "3px"}}>Phone</h4>
                                </div>
                                <div className="user-actions">
                                  <h4> Actions    </h4>
								</div>
                            </div>
                        </div>

                        {userData.status === "succeeded" ? (
                            items.map((elt)=>(
                            <UserCard key={elt.id} item={elt}  />)
                        )):(
                            <h3>Loading...</h3>
                        )
                    }
                    {userData.status === "succeeded" && (
                        <div className="pagination-container">
                          <Pagination>
                            <Pagination.First
                              onClick={() => setCurrentPage(1)}
                              disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                              onClick={() =>
                                setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))
                              }
                              disabled={currentPage === 1}
                            />
                            {Array.from({ length: Math.ceil(userData.users.length / pageSize) }, (_, index) => {
                              const pageNumber = index + 1;
                              return (
                                <Pagination.Item
                                  key={pageNumber}
                                  active={pageNumber === currentPage}
                                  onClick={() => setCurrentPage(pageNumber)}
                                >
                                  {pageNumber}
                                </Pagination.Item>
                              );
                            })}
                            <Pagination.Next
                              onClick={() =>
                                setCurrentPage((prev) =>
                                  prev < Math.ceil(userData.users.length / pageSize)
                                    ? prev + 1
                                    : Math.ceil(userData.users.length / pageSize)
                                )
                              }
                              disabled={
                                currentPage === Math.ceil(userData.users.length / pageSize)
                              }
                            />
                            <Pagination.Last
                              onClick={() =>
                                setCurrentPage(Math.ceil(userData.users.length / pageSize))
                              }
                              disabled={
                                currentPage === Math.ceil(userData.users.length / pageSize)
                              }
                            />
                          </Pagination>
                        </div>
                      )}

                    </div>
  
                </div>
            </div>
        </div>
        </div>

</div>
  )
}

export default UsersPage;