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

        </Route>

        <Route path='createpile' element={<CreatePile />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup/>} />

      </Route>
    </Routes>
    
   </BrowserRouter>
  )
}

export default App
