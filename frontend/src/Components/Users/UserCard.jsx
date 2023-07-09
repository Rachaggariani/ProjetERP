import React from 'react'
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom';
import { deleteUser } from '../../ReduxToolkit/Features/UserSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
function UserCard({item}) {
    const dispatch= useDispatch()

    const location = useLocation()
    const id = location.pathname.split("/")[2];
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure that you want to delete this user ?")) {
          dispatch(deleteUser(id));
          toast.success("User Deleted successfuly");
        }
      };

    
   
    // const handleEdit = async (user)=>{
    //     try {
    //         await axios.put(`${config.apiUrl}/${id}`, item);
           
    //       } catch (error) {
    //         console.log(error);
    //       }
    //         }

  return (
    <div>
    <div className="items">
                            <div className="item-content">
                                <div className="user-profile">
                                    <div className="n-chk align-self-center text-center">
                                        <label className="new-control new-checkbox checkbox-primary">
                                          <input type="checkbox" className="new-control-input contact-chkbox"/>
                                          <span className="new-control-indicator"></span>
                                        </label>
                                    </div>
                                    <img src={item.photo} alt="avatar" width={200}/>
                                    <div className="user-meta-info">
                                        <p className="user-name" data-name="Alan Green">{item.nom}  {item.prenom}</p>
                                        <p className="user-work" data-occupation="Web Developer">{item.type}</p>
                                    </div>
                                </div>
                                <div className="user-email">
                                    <p className="info-title">Email: </p>
                                    <p className="usr-email-addr" data-email="alan@mail.com">{item.email}</p>
                                </div>
                                <div className="user-location">
                                    <p className="info-title">Location: </p>
                                    <p className="usr-location" data-location="Boston, USA">{item.adresse}</p>
                                </div>
                                <div className="user-phone">
                                    <p className="info-title">Phone: </p>
                                    <p className="usr-ph-no" data-phone="+1 (070) 123-4567">{item.telephone}</p>
                                </div>
                                <div className="action-btn">
                                <Link to="/detailUser"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-zoom-in" style={{marginRight:"13px"}}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></Link>
                                    <Link to={`/edit_User/${id}`}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></Link>

									<a href="#" onClick={()=>handleDelete(id)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user-minus delete"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line></svg></a>
                               
                                    </div>
                                
                            </div>
                        </div>
    </div>
  )
}

export default UserCard