import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './EditMarque.css';
import { useDispatch } from 'react-redux';
import { updateMarque } from '../../../ReduxToolkit/Features/MarqueSlice';
export default function MarqueEdit() {
  const { id } = useParams();
  const [marque, setMarque] = useState({
    code: "",
    libelle: "",
    id: null,
  });
  const dispatch = useDispatch();
  const handleUpdate = async () => {
    console.log("marque object",marque);
    await dispatch(updateMarque({id,marque}));
  };
  
  useEffect(() => {
    const getMarque = async (id) => {
      const apiResponse = await axios.get(
        `http://localhost:5000/api/v1/marque/${id}`
      );
      console.log("response from api", apiResponse);
      setMarque(apiResponse.data);
    };
    getMarque(id);
  }, []);
  return (
    <>
    <form className="updateform">
      <h2 className="h2">Modifier marque</h2>
      <div className="input">
        <label htmlFor="code">Code</label>
        <input
          name="code"
          id="code"
          type="text"
          value={marque.code}
          onChange={(e) => setMarque({ ...marque, code: e.target.value })}
          disabled
        />
        <label htmlFor="libelle">Libelle</label>
        <input
          name="libelle"
          id="libelle"
          type="text"
          value={marque.libelle}
          onChange={(e) =>setMarque({ ...marque, libelle: e.target.value })}
        />
        <div className="espace"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <div>
          <Link to="/marques">
            <button
              className="btn btn-outline-primary btn-sm"
              style={{ fontSize: '15px', padding: '10px 20px', width: '100px' }}
              onClick={() => handleUpdate()}
            >
              Update
            </button>
            </Link>
          </div>
          <div>
            <Link to="/marques">
              <button
                className="btn btn-outline-dark mb-2"
                style={{ fontSize: '15px', padding: '10px 20px', width: '100px' }}>
                Retour
              </button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  </>
  )
}