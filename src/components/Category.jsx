import axios from "axios"
import "../App.css"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function Category(props) {

  const { t } = useTranslation()


  return (
    <div className="category-list-container-item">
      <div className="category-name-container">
        <h3>Category 1</h3>
        <div className="category-buttons-container">
          <button><MdModeEdit /></button>
          <button><MdDeleteOutline /></button>
        </div>
      </div>
      <div>
        
      </div>
  
    </div>
  )
}