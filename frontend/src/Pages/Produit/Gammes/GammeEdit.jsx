import React, { useState, useEffect } from "react";
import "../Gammes/Edit.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { updateGamme } from "../../../ReduxToolkit/Features/GammeSlice";

const GammeEdit = () => {
  const { id } = useParams();
  const [gamme, setGamme] = useState({
    code: "",
    libelle: "",
    color: "",
    ordre: null,
    id: null,
  });
  const dispatch = useDispatch();
  const handleUpdate = async () => {
    console.log("gamme object",gamme);
    await dispatch(updateGamme({id,gamme}));
  };
  useEffect(() => {
    const getGamme = async (id) => {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/v1/gamme/${id}`
      );
      console.log("response from api", apiResponse);
      setGamme(apiResponse.data);
    };
    getGamme(id);
  }, []);

  return (
    <>
      <form className="updateform">
        <h2 className="h2">Modifier Gamme</h2>
        <div className="input">
          <label htmlFor="code">Code</label>
          <input
            name="code"
            id="code"
            type="text"
            value={gamme.code}
            onChange={(e) => setGamme({ ...gamme, code: e.target.value })}
            disabled
          />
          <label htmlFor="libelle">Libelle</label>
          <input
            name="libelle"
            id="libelle"
            type="text"
            value={gamme.libelle}
            onChange={(e) => setGamme({ ...gamme, libelle: e.target.value })}
          />
          <label htmlFor="color">Couleur</label>
          <input
            name="color"
            id="color"
            type="color"
            value={gamme.color}
            onChange={(e) => setGamme({ ...gamme, color: e.target.value })}
          />
          <label htmlFor="ordre">Ordre</label>
          <input
            name="ordre"
            id="ordre"
            type="text"
            value={gamme.ordre}
            onChange={(e) => setGamme({ ...gamme, ordre: e.target.value })}
          />
          <div
            className="espace"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Link to="/gammes">
                <button
                  className="btn btn-outline-primary btn-sm"
                  style={{
                    fontSize: "15px",
                    padding: "10px 20px",
                    width: "100px",
                  }}
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              </Link>
            </div>
            <div>
              <Link to="/gammes">
                <button
                  className="btn btn-outline-dark mb-2"
                  style={{
                    fontSize: "15px",
                    padding: "10px 20px",
                    width: "100px",
                  }}
                >
                  Retour
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default GammeEdit;
