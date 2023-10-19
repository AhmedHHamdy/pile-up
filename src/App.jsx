import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/Layout'
import CollectionsView from './pages/CollectionsView'
import SideNav from './components/SideNav'
import HistoryView from './pages/HistoryView'
import ManagerView from './pages/ManagerView'
import ReportView from './pages/ReportView'
import AddressBookView from './pages/AddressBookView'
import CreatePile from './pages/pile/CreatePile'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from "./pages/Signup"
import PileView from './pages/pile/PileView'
import ItemsView from "./pages/pile/pile-details/ItemsView"
import ShareView from "./pages/pile/pile-details/ShareView"
import ManagersView from "./pages/pile/pile-details/ManagersView"
import ReportsView from "./pages/pile/pile-details/ReportsView"


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='dashboard' element={<SideNav />}>
          <Route index element={<CollectionsView />}/>
          <Route path='history' element={<HistoryView />} />
          <Route path='managers' element={<ManagerView />} />
          <Route path='reports' element={<ReportView />} />
          <Route path='addressBook' element={<AddressBookView />} />
          <Route path='createpile' element={<CreatePile />} />
          <Route path='pileview' element={<PileView />}>
            <Route index element={<ItemsView />} />
            <Route path='share' element={<ShareView />} />
            <Route path='managers' element={<ManagersView />} />
            <Route path='reports' element={<ReportsView />} />

          </Route>
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup/>} />

      </Route>
    </Routes>
    
   </BrowserRouter>
  )
}

export default App
