import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/Layout'
import CollectionsView from './pages/dashboard/CollectionsView'
import SideNav from './components/SideNav'
import HistoryView from './pages/dashboard/HistoryView'
import ContactsView from './pages/dashboard/ContactsView'
import ReportView from './pages/dashboard/ReportView'
import AddressBookView from './pages/dashboard/AddressBookView'
import CreatePile from './pages/pile/CreatePile'
import Home from './pages/Home'
import Login from './pages/account/login/Login'
import Signup from "./pages/account/register/Signup"
import PileView from './pages/pile/PileView'
import ItemsView from "./pages/pile/pile-details/ItemsView"
import ShareView from "./pages/pile/pile-details/ShareView"
import ManagersView from "./pages/pile/pile-details/ManagersView"
import ReportsView from "./pages/pile/pile-details/ReportsView"
import SendInvitation from './pages/pile/SendInvitation'
import AuthRequired from './components/AuthRequired'
import Profile from './pages/profile/Profile'
import SendResetCode from './pages/account/forgot/SendResetCode'
import CartPage from './pages/cart/CartPage'


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>

        <Route element={<AuthRequired />}>
          <Route path='dashboard' element={<SideNav />}>
            <Route path='folders' element={<CollectionsView />}>

            </Route>

            <Route path='folders/pileview/:id' element={<PileView />}>
              <Route index element={<ItemsView />} />
              <Route path='share' element={<ShareView />} />
              <Route path='managers' element={<ManagersView />} />
              <Route path='reports' element={<ReportsView />} />
            </Route>

            
            <Route path='history' element={<HistoryView />} />
            <Route path='contacts' element={<ContactsView />} />
            <Route path='reports' element={<ReportView />} />
            <Route path='addressBook' element={<AddressBookView />} />
            <Route path='createpile' element={<CreatePile />} />
            


            <Route path='sendInvitation' element={<SendInvitation />} />
          </Route>
        </Route>
        

        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup/>} />

        <Route path='sendResetCode' element={<SendResetCode />} />
        
        <Route path='profile' element={<AuthRequired />}>
          <Route index element={<Profile />}/>
        </Route>

        <Route path='cart' element={<AuthRequired />}>
          <Route index element={<CartPage />} />
        </Route>

      </Route>
    </Routes>



    
   </BrowserRouter>
  )
}

export default App
