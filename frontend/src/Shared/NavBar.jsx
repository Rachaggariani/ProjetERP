import {useState,React, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../ReduxToolkit/Features/AuthSlice";
import { IoMdNotificationsOutline } from "react-icons/io";
import {TfiMenuAlt} from "react-icons/tfi";
import '../../src/cssFolderNotification/Badge.css';
import '../../src/Shared/CssFoldering/logologout.css';
import {IoLogOutOutline} from "react-icons/io5";
// import photoracha from '../../public/';
function Navbar() {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setLogout());
      };
      const location = useLocation();
      const [pageTitle, setPageTitle] = useState('');
      const [showSearchBar, setShowSearchBar] = useState(true);
      const [badgeNum, setBadgeNum] = useState(0);
const navigate=useNavigate();
const handleclickdeconnete={

}
      const incrementBadgeNum = () => {
        const currentBadgeNum = parseInt(localStorage.getItem('badgeNum')) || 0;
        setBadgeNum(currentBadgeNum + 1);
        localStorage.setItem('badgeNum', currentBadgeNum + 1);
      };
    
      const [popoverVisible, setPopoverVisible] = useState(false);
    const[logout,setLogOut]=useState(false);
      const handleClick = () => {
        setPopoverVisible(!popoverVisible);
        incrementBadgeNum();
      };
      const handleClicklogout = () => {
        setLogOut(!logout);
      };
    
    //   useEffect(() => {
    //     // Récupérer la valeur actuelle du badgeNum depuis le localStorage
    //     const currentBadgeNum = parseInt(localStorage.getItem('badgeNum')) || 0;
    //     setBadgeNum(currentBadgeNum);
    
    //     // Incrémenter le badgeNum lors de l'actualisation de la page
    //     localStorage.setItem('badgeNum', currentBadgeNum + 1);
    //   }, []);
    
      useEffect(() => {
        switch (location.pathname) {
          case '/gammes':
            setPageTitle('Gamme');
            setShowSearchBar(false);
            break;
          case '/familles':
            setPageTitle('Famille');
            setShowSearchBar(false);
            break;
          case '/sous_familles':
            setPageTitle('Sous Famille');
            setShowSearchBar(false);
            break;
          case '/marques':
            setPageTitle('Marque');
            setShowSearchBar(false);
            break;
          case '/Produits':
            setPageTitle('Liste des produits');
            setShowSearchBar(false);
            break;
          case '/camion':
            setPageTitle('Camion');
            setShowSearchBar(false);
            break;
          case '/stockcamion':
            setPageTitle('Stock Camion');
            setShowSearchBar(false);
            break;
          case '/stockdepot':
            setPageTitle('Stock Dépôt');
            setShowSearchBar(false);
            break;
          case '/BondeLivraison':
            setPageTitle('Bonde de livraison');
            setShowSearchBar(false);
            break;
            case '/AjouterBL':
                setPageTitle(' Ajouter une bonde de livraison');
                setShowSearchBar(false);
                break;
          case '/Commande':
            setPageTitle('Commandes');
            setShowSearchBar(false);
            break;
          case '/avoir':
            setPageTitle('Avoir');
            setShowSearchBar(false);
            break;
            case '/dashboard':
                setPageTitle('Dashbord');
                setShowSearchBar(false);
                break;
          default:
            setPageTitle('');
            setShowSearchBar(true);
            break;
        }
      }, [location]);
   
  return (
    <div className="header-container fixed-top">
        <header className="header navbar navbar-expand-sm">
            <a href={{javascript:void(0)}} className="sidebarCollapse" data-placement="bottom"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='feather feather-menu'><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>  
            <ul className="navbar-item flex-row">
                <li className="nav-item align-self-center page-heading">
                    <div className="page-header">
                        <div className="page-title">
                        <h3>{pageTitle}</h3>
                        </div>
                    </div>
                </li>
            </ul>
            <ul className="navbar-item flex-row search-ul">
            {showSearchBar && (
                <li className="nav-item align-self-center search-animated">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search toggle-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <form className="form-inline search-full form-inline search" role="search">
                        <div className="search-bar">
                            <input type="text" className="form-control search-form-control  ml-lg-auto" placeholder="Search..."/>
                        </div>
                    </form>
                </li>
                )}
            </ul>
            <ul className="navbar-item flex-row navbar-dropdown">
            
                <li className="nav-item dropdown language-dropdown more-dropdown">
                
                    <div className="dropdown  custom-dropdown-icon">
                        <a className="dropdown-toggle btn" href="#" role="button" id="customDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/img/flag-ca.svg" className='flag-width' alt="flag"/><span>English</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='feather feather-chevron-down'><polyline points="6 9 12 15 18 9"></polyline></svg></a>

                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="customDropdown">
                            <a className='dropdown-item' data-img-value="flag-de" data-value="German" href={{javascript:void(0)}}><img src="assets/img/flag-de.svg" className='flag-width' alt="flag"/> German</a>
                            <a className='dropdown-item' data-img-value="flag-sp" data-value="Spanish" href={{javascript:void(0)}}><img src="assets/img/flag-sp.svg" className='flag-width' alt="flag"/> Spanish</a>
                            <a className='dropdown-item' data-img-value="flag-fr" data-value="French" href={{javascript:void(0)}}><img src="assets/img/flag-fr.svg" className='flag-width' alt="flag"/> French</a>
                            <a className='dropdown-item' data-img-value="flag-ca" data-value="English" href={{javascript:void(0)}}><img src="assets/img/flag-ca.svg" className='flag-width' alt="flag"/> English</a>
                        </div>
                    </div>
                </li>
                
                <li className="nav-item dropdown message-dropdown">
                    <a href={{javascript:void(0)}} className='nav-link dropdown-toggle' id="messageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg><span className='badge badge-primary'></span>
                    </a>
                    <div className="dropdown-menu p-0 position-absolute" aria-labelledby="messageDropdown">
                        <div className="">
                            <a className="dropdown-item">
                                <div className="">

                                    <div className="media">
                                        <div className="user-img">
                                            <div className="avatar avatar-xl">
                                                <span className="avatar-title rounded-circle">KY</span>
                                            </div>
                                        </div>
                                        
                                        <div className="media-body">
                                            <div className="">
                                                <h5 className="usr-name">Kara Young</h5>
                                                <p className="msg-title">ACCOUNT UPDATE</p>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                   
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div className="">
                                    <div className="media">
                                        <div className="user-img">
                                            <div className="avatar avatar-xl">
                                                <span className="avatar-title rounded-circle">DA</span>
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div className="">
                                                <h5 className="usr-name">Daisy Anderson</h5>
                                                <p className="msg-title">ACCOUNT UPDATE</p>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div className="">

                                    <div className="media">
                                        <div className="user-img">
                                            <div className="avatar avatar-xl">
                                                <span className="avatar-title rounded-circle">OG</span>
                                            </div>
                                        </div>
                                        <div className="media-body">
                                            <div className="">
                                                <h5 className="usr-name">Oscar Garner</h5>
                                                <p className="msg-title">ACCOUNT UPDATE</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </a>
                        </div>
                    </div>
                </li>

                <li className="nav-item dropdown notification-dropdown">
                <div className="notification-bell" style={{ fontSize: '30px', marginTop: '-11px', marginLeft: '-12px' }}>
      <div className="bell-container">
        <span className="bell-badge">{badgeNum}</span>
        <div className="bell-pulse"></div>
      </div>
      <IoMdNotificationsOutline onClick={handleClick} />
      {popoverVisible && (
        <div className="popover">
          <div className="popover-content" style={{ textAlign: 'center' }}>Vous avez une nouvelle demande de chargement</div>
        </div>
      )}
      </div>
                    {/* <div className="dropdown-menu position-absolute" aria-labelledby="notificationDropdown">
                        <div className="notification-scroll">

                            <div className="dropdown-item">
                                <div className="media server-log">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='feather feather-server'><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6" y2="6"></line><line x1="6" y1="18" x2="6" y2="18"></line></svg>
                                    <div className="media-body">
                                        <div className="data-info">
                                            <h6 className="">Server Rebooted</h6>
                                            <p className="">45 min ago</p>
                                        </div>

                                        <div className="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown-item">
                                <div className="media ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    <div className="media-body">
                                        <div className="data-info">
                                            <h6 className="">Licence Expiring Soon</h6>
                                            <p className="">8 hrs ago</p>
                                        </div>

                                        <div className="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown-item">
                                <div className="media file-upload">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    <div className="media-body">
                                        <div className="data-info">
                                            <h6 className="">Kelly Portfolio.pdf</h6>
                                            <p className="">670 kb</p>
                                        </div>

                                        <div className="icon-status">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </li>

                <li className="nav-item dropdown user-profile-dropdown  order-lg-0 order-1">
                    {/* <a href={{javascript:void(0)}} className='nav-link dropdown-toggle user' id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={user?.result?.photo} alt="avatar"/>
                    </a> */}
                    <img src="/photoracha.jpg" style={{width:"29px", marginTop:"14px",marginRight:"12px"}} alt='photo'/>
        
 
                    <div style={{marginTop:"-23px",paddingLeft:"35px"}}>
                    <TfiMenuAlt style={{width:"20px",height:"19px"}} onClick={handleClicklogout}/>
                    <div>
                    {/* drop down*/}
                  
                    {logout && (
                        <div className="popover" style={{width:"134px",height:"50px",marginLeft:"34px",marginTop:"2px"}}>
                          <div className="popover-content " style={{ textAlign: 'center',display:"flex",justifyContent:"space-around"}}>
                          <div  style={{marginTop:"5px"}}>
                          <Link to="/login" onClick={()=>handleclickdeconnete()}>
                            <IoLogOutOutline  className="hovered" style={{ width:"20px",height:"23px"}} />
                            <span style={{color:"black"}} onClick={()=>handleclickdeconnete()}> Déconnection</span>
                            </Link>
                          </div>
                          </div>
                        </div>
                      )}
            






                    </div>
                    </div>
                    <div className="dropdown-menu position-absolute" aria-labelledby="userProfileDropdown">
                        {/* <div className="user-profile-section">
                            <div className="media mx-auto">
                                <img src={user?.result?.photo}  alt="avatar" />
                                <div className="media-body">
                                    <h6 style={{color:"white",width:10}}>{user?.result?.nom}</h6>
                                    <p>{user?.result?.type} </p>
                                </div>
                            </div>
                        </div> */}
                        
                        <div className="dropdown-item">
                            <Link to="profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> <span> Profile</span>
                            </Link>
                        </div>
                        
                        <div className="dropdown-item">
                            <a href="auth_lockscreen.html">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='feather feather-lock'><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span>Lock Screen</span>
                            </a>
                        </div>
                        <div className="dropdown-item">
                            <Link to="/login" onClick={()=>handleLogout()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> <span>Log Out</span>
                            </Link>
                        </div>
                    </div>
                </li>
            </ul>
        </header>
    </div>
  )
}

export default Navbar
