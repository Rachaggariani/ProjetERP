import React from "react";
import { Routes, Route} from "react-router-dom";
import DashboardPage from "./Pages/dashboard/DashboardPage";
import Page404 from "./Pages/Page404";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout";
import Auth from "./Pages/Authentification/Auth";

import Container from "./layouts/Container";
// -------------------------------------------------------------------------------

import UsersPage from "./Pages/users/UsersPage";
import ListClients from "./Components/clients/ListClients";
import ForgotPassword from "./Pages/Authentification/ForgotPassword";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import EditUser from "./Pages/users/EditUser";
// import AlerteProtection from "./Components/AlerteProtection";
import ResetPassword from "./Pages/Authentification/ResetPassword";
import ProfilePage from "./Pages/Profile/ProfilePage";
import SecurityPage from "./Pages/Authentification/SecurityPage";
import AddUser from "./Pages/users/AddUser";
import DetailUser from "./Pages/users/DetailUser";
import AddClient from "./Pages/Clients/AddClient";
import EditClient from "./Pages/Clients/EditClient";
import DetailClient from "./Pages/Clients/DetailClient";
import Profile from "./layouts/Profile";
import SousSocietePage from "./Pages/Profile/SousSocietePage";
import RolesPage from "./Pages/roles/RolesPage";
import CategoriesPage from "./Pages/Categories/CategoriesPage";
import ActivitesPage from "./Pages/Activites/ActivitesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GammePage from "./Pages/Produit/Gammes/GammePage";
import MarquePage from "./Pages/Produit/Marques/MarquePage";
import MarqueEdit from "./Pages/Produit/Marques/MarqueEdit";
import FamillePage from "./Pages/Produit/Familles/FamillePage";
import FamilleEdit from "./Pages/Produit/Familles/FamilleEdit";
import SousFamilleEdit from "./Pages/Produit/SousFamille/SousFamilleEdit";
import GammeEdit from './Pages/Produit/Gammes/GammeEdit'
import SousFamilePages from "./Pages/Produit/SousFamille/SousFamilePages";
import ProdPages from "./Pages/Produit/Products/ProdPages";
import EditProduct from "./Pages/Produit/Products/EditProduct";
import StockCamionPage from "./Pages/Stock/StockCamion/StockCamionPage";
import EditCamion from "./Pages/Stock/StockCamion/EditCamion";
import AfficheCamion from "./Pages/Stock/StockCamion/AfficheCamion";
import BondeLivraisonPage from "./Pages/BondeLivraison/BondeLivraisonPage";
import ConsulterDepot from "./Pages/Stock/Stock depot/ConsulterDepot";
import EditDepot from "./Pages/Stock/Stock depot/EditDepot";
import AddBL from "./Pages/BondeLivraison/AddBL";
import DetailsPageBL from "./Pages/BondeLivraison/DetailsPageBL";
import CommandePage from "./Pages/Commandes/CommandePage";
import DetailCommande from "./Pages/Commandes/DetailCommande";
import AddCommande from "./Pages/Commandes/AddCommande";
function App() {
 
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route
          path="dashboard"
          element={
            <Container>
              <DashboardPage />
            </Container>
          }
        />
     
        <Route
          path="gammes"
          element={
            <Container>
              <GammePage />
            </Container>
          }
        />
      
        <Route
          path="editgamme/:id"
          element={
            <Container>
              <GammeEdit/>
            </Container>
          }
        />
  
        <Route
          path="marques"
          element={
            <Container>
              <MarquePage />
            </Container>
          }
        />
        <Route
          path="/editmarque/:id"
          element={
            <Container>
              <MarqueEdit />
            </Container>
          }
        />
        <Route
          path="familles"
          element={
            <Container>
              <FamillePage />
            </Container>
          }
        />
        <Route
          path="/editfamille/:id"
          element={
            <Container>
              <FamilleEdit />{" "}
            </Container>
          }
        />
         <Route
          path="sous_familles"
          element={
            <Container>
              <SousFamilePages/>
            </Container>
          }
        />
        <Route
          path="/editsousfamille/:id"
          element={
            <Container>
              <SousFamilleEdit/>
            </Container>
          }
        />
       <Route
          path="produits"
          element={
            <Container>
              <ProdPages/>
            </Container>
          }
        />
        <Route
          path="/editprod/:id"
          element={
            <Container>
              <EditProduct/>
            </Container>
          }
        />
         <Route
          path="camion"
          element={
            <Container>
              <StockCamionPage/>
            </Container>
          }
        />
         <Route
          path="/editCamion/:id"
          element={
            <Container>
              <EditCamion/>
            </Container>
          }
        />
           <Route
          path="/stockcamion"
          element={
            <Container>
              <AfficheCamion/>
            </Container>
          }
        />
          <Route
          path="/stockdepot"
          element={
            <Container>
              <ConsulterDepot/>
            </Container>
          }
        />
               <Route
          path="/EditDepot/:id"
          element={
            <Container>
              <EditDepot/>
            </Container>
          }
        />
              <Route
          path="/BondeLivraison"
          element={
            <Container>
              <BondeLivraisonPage/>
            </Container>
          }
        />
              <Route
          path="/AjouterBL"
          element={
            <Container>
              <AddBL/>
            </Container>
          }
        />
              <Route
          path="/DetailsBL/:id"
          element={
            <Container>
              <DetailsPageBL/>
            </Container>
          }
        />
               <Route
          path="/Commande"
          element={
            <Container>
              <CommandePage/>
            </Container>
          }
        />
            <Route
          path="/AjouterCMD"
          element={
            <Container>
              <AddCommande/>
            </Container>
          }
        />
             <Route
          path="/DetailsCMD/:id"
          element={
            <Container>
              <DetailCommande/>
            </Container>
          }
        />
        <Route
          path="clients"
          element={
            <Container>
              <ListClients />{" "}
            </Container>
          }
        />
        <Route
          path="add_client"
          element={
            <Container>
              <AddClient />
            </Container>
          }
        />
        <Route
          path="edit_client/:id"
          element={
            <Container>
              <EditClient />
            </Container>
          }
        />
        <Route
          path="historique_client"
          element={
            <Container>
              <DetailClient />
            </Container>
          }
        />
        <Route
          path="activites"
          element={
            <Container>
              <ActivitesPage />
            </Container>
          }
        />
        <Route
          path="categories"
          element={
            <Container>
              <CategoriesPage />
            </Container>
          }
        />

        <Route
          path="utilisateurs"
          element={
            <Container>
              <UsersPage />
            </Container>
          }
        />
        <Route
          path="add_User"
          element={
            <Container>
              <AddUser />
            </Container>
          }
        />
        <Route
          path="edit_User/:id"
          element={
            <Container>
              <EditUser />
            </Container>
          }
        />
        <Route
          path="detailUser"
          element={
            <Container>
              <DetailUser />
            </Container>
          }
        />
        <Route
          path="role"
          element={
            <Container>
              <RolesPage />
            </Container>
          }
        />

        <Route
          path="profile"
          element={
            <Container>
              <Profile />
            </Container>
          }
        >
          <Route
            path="profilePage"
            element={
              <Container>
                <ProfilePage />
              </Container>
            }
          />
          <Route
            path="sous_societe"
            element={
              <Container>
                <SousSocietePage />
              </Container>
            }
          />
        </Route>
      </Route>

      <Route path="/login" element={<LoginLayout/>}>
        <Route index element={<Auth/>} />
      </Route>
      <Route path="/forget_password" element={<ForgotPassword/>} />
      <Route path="/otp/:id" element={<SecurityPage/>} />
      <Route path="/reset_password/:id" element={<ResetPassword/>} />
      {/*<Route path="/not_connected" element={<AlerteProtection/>} />*/}
      <Route path="*" element={<Page404/>} />
    </Routes>
    </>
  );
}
export default App;
