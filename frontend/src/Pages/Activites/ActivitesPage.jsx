import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addActivite,
  deleteActivite,
  setActivitesFailed,
  setActivitesPending,
  setActivitesSuccess,
  updateActivite,
} from "../../ReduxToolkit/Features/ActiviteSlice";
import { toast } from "react-toastify";
import Pagination from "react-bootstrap/Pagination";

function ActivitesPage() {
  const [activite, setActivite] = useState({
    code: "",
    libelle: "",
  });

  const [id, setId] = useState(null);
  const activiteData = useSelector((state) => state.activite);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchActivites = () => {
      dispatch(setActivitesPending());
      axios
        .get("/activites")
        .then((response) => {
          dispatch(setActivitesSuccess(response.data));
          console.log("here", response.data);
        })
        .catch((error) => {
          dispatch(setActivitesFailed(error.message));
        });
    };

    fetchActivites();
    console.log("useEffect", activiteData.activites);
  }, [dispatch]);

  const handleChange = (e) => {
    setActivite((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = activiteData.activites.slice(startIndex, endIndex);

  const handleAddActivite = () => {
    dispatch(addActivite(activite));

    toast.success("Activite added successfully");
    setActivite({
      code: "",
      libelle: "",
    });
  };
  const handleDelete = async (id) => {
    try {
      if (
        window.confirm("etes-vous sures de vouloir supprimer cette activite ?")
      ) {
        dispatch(deleteActivite(id));
        toast.success("Activite Deleted successfuly");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = ({ id, activite }) => {
    dispatch(updateActivite({ id, activite }));
    toast.success("Activite Updated successfully");
  };

  return (
    <div>
      <div
        id="tableCheckbox"
        className="col-lg-12 col-12 layout-spacing actStyle"
      >
        <div className="">
          <div className="">
            <div className="row">
              <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                <h4 style={{ marginBottom: 15 }}>Liste des activites</h4>
              </div>
              <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                <button
                  type="button"
                  className="btn btn-primary mb-2 mr-2"
                  data-toggle="modal"
                  data-target="#exampleModalActCenter"
                  style={{ marginLeft: 1070 }}
                >
                  Add activite{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="widget-content widget-content-area">
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped table-checkable table-highlight-head mb-4">
                <thead>
                  <tr>
                    <th className="checkbox-column">
                      <label
                        className="new-control new-checkbox checkbox-primary"
                        style={{ height: "18px", margin: " 0 auto" }}
                      >
                        <input
                          type="checkbox"
                          className="new-control-input todochkbox"
                          id="todoAll"
                        />
                        <span className="new-control-indicator"></span>
                      </label>
                    </th>
                    <th className="">Code</th>
                    <th className="">Libelle</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activiteData.status === "succeeded" ? (
                    items.map((current) => (
                      <tr key={current.id}>
                        <td className="checkbox-column">
                          <label
                            className="new-control new-checkbox checkbox-primary"
                            style={{ height: "18px", margin: "0 auto" }}
                          >
                            <input
                              type="checkbox"
                              className="new-control-input todochkbox"
                              id="todo-1"
                            />
                            <span className="new-control-indicator"></span>
                          </label>
                        </td>
                        <td>
                          <p className="mb-0">{current.code}</p>
                        </td>
                        <td>{current.libelle}</td>
                        <td className="text-center">
                          <ul className="table-controls">
                            <li>
                              <button
                                type="button"
                                style={{ border: "none" }}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                data-placement="top"
                                title="Edit"
                                onClick={() => {
                                  setActivite(current);
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
                                  className="feather feather-edit-2 text-success"
                                >
                                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                style={{ border: "none" }}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                                onClick={() => handleDelete(current.id)}
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
                                  className="feather feather-trash-2 text-danger"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </button>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        {activiteData.error}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {activiteData.status === "succeeded" && (
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
                        length: Math.ceil(
                          activiteData.activites.length / pageSize
                        ),
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
                          prev <
                          Math.ceil(activiteData.activites.length / pageSize)
                            ? prev + 1
                            : Math.ceil(
                                activiteData.activites.length / pageSize
                              )
                        )
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(activiteData.activites.length / pageSize)
                      }
                    />
                    <Pagination.Last
                      onClick={() =>
                        setCurrentPage(
                          Math.ceil(activiteData.activites.length / pageSize)
                        )
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(activiteData.activites.length / pageSize)
                      }
                    />
                  </Pagination>
                </div>
              )}
            </div>

            <div
              className="modal fade"
              id="exampleModalActCenter"
              tabIndex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header" style={{ height: 80 }}>
                    <h5
                      className="modal-title"
                      id="exampleModalCenterTitle"
                      style={{ color: "blue" }}
                    >
                      Add activite
                    </h5>
                  </div>

                  <div style={{ marginTop: "35px", height: 90 }}>
                    <form style={{ width: 430, marginLeft: 35 }}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="contact-name">
                            <i className="flaticon-user-11"></i>
                            <input
                              type="text"
                              id="c-name"
                              name="code"
                              className="form-control"
                              placeholder="Code"
                              onChange={(event) => handleChange(event)}
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="contact-email">
                            <i className="flaticon-mail-26"></i>
                            <input
                              type="text"
                              id="c-email"
                              name="libelle"
                              className="form-control"
                              placeholder="Libelle"
                              onChange={(event) => handleChange(event)}
                            />
                            <span className="validation-text"></span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="modal-footer">
                    <button className="btn" data-dismiss="modal">
                      <i className="flaticon-cancel-12"></i> Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => handleAddActivite()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header" style={{ height: 80 }}>
                    <h5
                      className="modal-title"
                      id="exampleModalCenterTitle"
                      style={{ color: "blue" }}
                    >
                      Update Activite
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
                            value={activite.code}
                            disabled
                          />
                        </div>

                        <div className="col-md-6">
                          <input
                            type="text"
                            name="libelle"
                            className="form-control"
                            value={activite.libelle}
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
                      onClick={() => handleUpdate({ id, activite })}
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
    </div>
  );
}

export default ActivitesPage;
