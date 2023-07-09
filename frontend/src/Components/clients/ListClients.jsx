import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ListClients = () => {
    const [clients, setClients] = useState([])
    const [client, setClient] = useState({
        code:"",
    libelle:""
    })

    const fetchClients = async()=>{
        const {data} = await axios.get("/clients")
        setClients(data)
   
}
useEffect(() => {
    fetchClients()
}, [])
console.log("liste des clients: ",clients);

    const handleChange =(e)=>{
        setClient((elt) => ({ ...elt, [e.target.name]: e.target.value }))
    }
    
    const handleSubmit =()=>{
        axios.post("/clients/add",client).then((res)=>{
            console.log(res.data);
          }).catch((err)=>{
            console.log(err);
          })
        }

        const handleDelete = async (id)=>{
            try {
                if(window.confirm('etes-vous sures de vouloir supprimer ce client ?')){
                    await axios.delete(`/clients/${id}`)
                    setClients(clients.filter( (elt)=> elt.id !== id));
                }
                
            } catch (error) {
                console.log(error);
            }
                }

  return (

    <div className="container">
    
        <div className="row align-items-center">
            <div className="col-md-6">
                <div className="mb-3">
                    <h5 className="card-title">Liste des Clients <span className="text-muted fw-normal ms-2">(25)</span></h5>
                </div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                    <div>
                        <ul className="nav nav-pills">
                           
                            <li className="nav-item">
                                <a href="#" className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Grid" aria-label="Grid"><i className="bx bx-grid-alt"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link to="/add_client" href="#" data-bs-toggle="modal" data-bs-target=".add-new" className="btn btn-primary"><i className="bx bx-plus me-1"></i> Add New</Link>
                    </div>
                    
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-lg-12">
                <div className="">
                    <div className="table-resp">
                        <table className="table project-list-table table-nowrap align-middle table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col" className="ps-4" style={{width: "50px"}}>

                                    </th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Activite</th>
                                    <th scope="col">Adresse</th>
                                    
                                    <th scope="col" style={{width: "200px"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {clients.map((current)=>(
                                <tr>
                                    <th scope="row" className="ps-4">
                                        <div className="htmlForm-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck1" /><label className="form-check-label" htmlFor="contacusercheck1"></label></div>
                                    </th>
                                    <td><img src={current.profile} alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{current.nom} {current.prenom}</a></td>
                                    <td><span className="badge badge-soft-success mb-0">{current.categorie}</span></td>
                                    <td>{current.zone}</td>
                                   
                                    <td>
                                        <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                                <a href={{javascript:void(0)}} data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" className="px-2 text-primary"><i className="bx bx-pencil font-size-18"></i></a>
                                            </li>
                                            <li className="list-inline-item">
                                                <a href={{javascript:void(0)}} data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" className="px-2 text-danger" onClick={()=>handleDelete(current.id)}><i className="bx bx-trash-alt font-size-18"></i></a>
                                            </li>
                                            <li className="list-inline-item dropdown">
                                                <a className="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i className="bx bx-dots-vertical-rounded"></i></a>
                                                <div className="dropdown-menu dropdown-menu-end">
                                                    <a className="dropdown-item dp" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                           
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div className="row g-0 align-items-center pb-4">
            <div className="col-sm-6">
                <div><p className="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
            </div>
            <div className="col-sm-6">
                <div className="float-sm-end">
                    <ul className="pagination mb-sm-0">
                        <li className="page-item disabled">
                            <a href="#" className="page-link"><i className="mdi mdi-chevron-left"></i></a>
                        </li>
                        <li className="page-item active"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item"><a href="#" className="page-link">3</a></li>
                        <li className="page-item"><a href="#" className="page-link">4</a></li>
                        <li className="page-item"><a href="#" className="page-link">5</a></li>
                        <li className="page-item">
                            <a href="#" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default ListClients
