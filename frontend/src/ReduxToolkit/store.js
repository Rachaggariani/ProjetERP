import { configureStore } from '@reduxjs/toolkit'
import AuthSlice  from './Features/AuthSlice'
import RoleSlice from './Features/RoleSlice'
import UserSlice from './Features/UserSlice'

import CategorieSlice from './Features/CategorieSlice'
import ActiviteSlice from './Features/ActiviteSlice'
import SousSocietSlice from './Features/SousSocieteSlice'
import  SocieteSlice  from './Features/SocieteSlice'
import GammeSlice from './Features/GammeSlice'
import FamilleSlice from './Features/FamilleSlice'
import MarqueSlice from './Features/MarqueSlice'
import SousFamilleSlice from './Features/SousFamilleSlice'
import ProductSlice from './Features/ProductSlice'
import CamionStockSlice from './Features/CamionStockSlice'
import StockDepotSlice from './Features/StockDepotSlice'
import StocksSlice from './Features/StocksSlice'
import BlSlice from './Features/BlSlice'
import PaiementSlice from './Features/PaiementSlice'
import LCSlice from './Features/LCSlice'
import EnteteSlice from './Features/EnteteSlice'
import ClientBLSlice from './Features/ClientBLSlice'
import CommandeSlice from './Features/CommandeSlice'
export const store = configureStore({
  reducer: {
    auth:AuthSlice,
    user:UserSlice,
    role: RoleSlice,
    gamme:GammeSlice,
    famille:FamilleSlice,
    marque:MarqueSlice,
    categorie: CategorieSlice,
    activite: ActiviteSlice,
    sousSociete:SousSocietSlice,
    societe:SocieteSlice,
    sousfamille: SousFamilleSlice,
    produit: ProductSlice,
    camion:CamionStockSlice,
    depot:StockDepotSlice,
    stock:StocksSlice,
    BL:BlSlice,
    paiement:PaiementSlice,
    LC:LCSlice,
    Entete:EnteteSlice,
    ClBL:ClientBLSlice,
    CMD:CommandeSlice,
  },
})