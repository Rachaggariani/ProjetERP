import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { toast } from "react-toastify";
import {
  deleteRole,
  addRole,
  setRolesFailed,
  setRolesPending,
  setRolesSuccess,
  updateRole,
  fetchRoles,
} from "../../ReduxToolkit/Features/RoleSlice";

function RolesPage() {
  const [role, setRole] = useState({
    code: "",
    libelle: "",
  });
  const [id, setId] = useState(null);
  const roleData = useSelector((state) => state.role);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setRole((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = roleData.roles.slice(startIndex, endIndex);

  const handleAddRole = async(e) => {
    await dispatch(addRole(role));
    console.log("before");
   await dispatch(fetchRoles());
    setRole({
      code: "",
      libelle: "",
    });

    console.log("after");

  };
  //console.log("this is role ID : ",id);
  const handleUpdateRole =async ({ id: roleId, role: updatedRole }) => {
   await dispatch(updateRole({ id: roleId, role: updatedRole }));
    await dispatch(fetchRoles());

  };

  const handleDeleteRole = async(id) => {
    if (window.confirm("Are you sure that you want to delete this role ?")) {
      await dispatch(deleteRole(id));
      await dispatch(fetchRoles());


    }
  };

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <div className="main-content">
      <p className="lead myprofile">Liste des roles</p>
      <hr style={{ width: 180, marginRight: 1590 }} />
      <div className="container">
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary mb-2 mr-2"
            data-toggle="modal"
            data-target="#exampleAddModalCenter"
          >
            Add Role
          </button>
        </div>

        <div className="row layout-top-spacing">
          <div id="tableFooter" className="col-lg-12 col-12 layout-spacing">
            <div className="statbox widget box ">
              <div className="widget-content widget-content-area">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-condensed mb-4">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Libelle</th>

                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roleData.status === "succeeded" ? (
                        items.map((current) => (
                          <tr key={current.id}>
                            <td>{current.code}</td>
                            <td>{current.libelle}</td>
                            <td className="text-center">
                              <div
                                className="action-btn"
                                style={{
                                  listStyle: "none",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <li>
                                  <button
                                    type="button"
                                    style={{ border: "none" }}
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    data-placement="top"
                                    title="Edit"
                                    onClick={() => {
                                      setRole(current);
                                      setId(current.id);
                                    }}
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
                                      className="feather feather-check-circle text-primary"
                                      style={{ marginRight: 15 }}
                                    >
                                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                  </button>
                                </li>
                                <li>
                                  <button
                                    style={{ border: "none" }}
                                    data-placement="top"
                                    data-toogle="tooltip"
                                    title="Delete"
                                    onClick={() => handleDeleteRole(current.id)}
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
                                      className="feather feather-x-circle text-danger"
                                    >
                                      <circle cx="12" cy="12" r="10"></circle>
                                      <line
                                        x1="15"
                                        y1="9"
                                        x2="9"
                                        y2="15"
                                      ></line>
                                      <line
                                        x1="9"
                                        y1="9"
                                        x2="15"
                                        y2="15"
                                      ></line>
                                    </svg>
                                  </button>
                                </li>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            {roleData.error}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {roleData.status === "succeeded" && (
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
                        {Array.from(
                          {
                            length: Math.ceil(roleData.roles.length / pageSize),
                          },
                          (_, index) => {
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
                          }
                        )}
                        <Pagination.Next
                          onClick={() =>
                            setCurrentPage((prev) =>
                              prev < Math.ceil(roleData.roles.length / pageSize)
                                ? prev + 1
                                : Math.ceil(roleData.roles.length / pageSize)
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(roleData.roles.length / pageSize)
                          }
                        />
                        <Pagination.Last
                          onClick={() =>
                            setCurrentPage(
                              Math.ceil(roleData.roles.length / pageSize)
                            )
                          }
                          disabled={
                            currentPage ===
                            Math.ceil(roleData.roles.length / pageSize)
                          }
                        />
                      </Pagination>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* POPUP ADD*/}
          <div
            className="modal fade"
            id="exampleAddModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ height: 80 }}>
                  <h5
                    className="modal-title"
                    id="exampleModalCenterTitle"
                    style={{ color: "blue" }}
                  >
                    Add Role
                  </h5>
                </div>

                <div style={{ marginTop: "35px", height: 90 }}>
                  <form style={{ width: 430, marginLeft: 35 }}>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="code"
                          className="form-control"
                          placeholder="Code"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          name="libelle"
                          className="form-control"
                          placeholder="Libelle"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button className="btn" data-dismiss="modal">
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => handleAddRole()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* POPUP EDIT*/}
          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header" style={{ height: 80 }}>
                  <h5
                    className="modal-title"
                    id="exampleModalCenterTitle"
                    style={{ color: "blue" }}
                  >
                    Update Role
                  </h5>
                </div>

                <div style={{ marginTop: "35px", height: 90 }}>
                  <form style={{ width: 430, marginLeft: 35 }}>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="code"
                          className="form-control"
                          value={role.code}
                          disabled
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="text"
                          name="libelle"
                          className="form-control"
                          value={role.libelle}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button className="btn" data-dismiss="modal">
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={() => handleUpdateRole({ id, role })}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesPage;
