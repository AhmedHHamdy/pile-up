import "../../../App.css"
import { AiOutlinePlus } from "react-icons/ai"
import { Link } from "react-router-dom"
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import PileItem from "../../../components/PileItem";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ItemsView() {
  const [value, setValue] = useState('');
  const { token } = useAuth()

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const pileData = useOutletContext()
  console.log(pileData)

  const modalRef = useRef(null)
  const modalCategoryRef = useRef(null)

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false)

  const [itemsData, setItemData] = useState([])
  console.log(itemsData)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/items/list?pile_id=${pileData.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setLoadingStatus(false)
      console.log(res)
      setItemData(res.data.data)
    })
    .catch(err => {
      console.log(err)
      setError(err.message)
    })
  }, [])

  const openCategoryForm = () => {
    setIsCategoryFormVisible(true);
  };

  const closeCategoryForm = () => {
    setIsCategoryFormVisible(false);
  };

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  // Close the model when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeForm();
      }
    }

    if (isFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormVisible]);


  useEffect(() => {
    function handleClickOutsideCategory(event) {
      if (modalCategoryRef.current && !modalCategoryRef.current.contains(event.target)) {
        closeCategoryForm()
      }
    }

      if (isCategoryFormVisible) {
        document.addEventListener('mousedown', handleClickOutsideCategory)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutsideCategory)
    }
  }, [isCategoryFormVisible])


  const itemsElements = itemsData.map((item, i) => {
    return (<PileItem key={i} name={item.name_en} price={item.price} id={item.id} image={item.image} />)
  })


  if (loadingStatus) {
    return (
      <Box sx={{ display: 'flex', justifyContent:"center", alignSelf: "center", marginTop: "5rem" }}>
        <CircularProgress color="success"  />
      </Box>
    )
  }

  if (error) {
    return (
      <h1 style={{gridColumn: "2/-1", textAlign: "center" }}>{error} <br/> Please Refresh</h1>
    )
  }


  return (
    <section className="items-container">
      <div className="items-buttons-container">
        <div className="items-select-input">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Select all</label>
        </div>

        <div className="items-create-buttons">
          <button onClick={openForm}><AiOutlinePlus /> Add item</button>
          <button onClick={openCategoryForm}><AiOutlinePlus /> Add a category</button>
          <input type="search" placeholder="Search for an item" />
        </div>
      </div>


      <div className="items-list-container">
        {itemsElements}
        {itemsData.length == 0 && 
        <div className="no-item-container">
          <h1>You didn't add any item yet</h1>
          <button onClick={openForm}><AiOutlinePlus /> Add Item</button>
        </div>}
      </div>

      {isFormVisible && (
        <section className="modal-overlay item-form-container">
          <div className="modal item-form" ref={modalRef}>
                <h1>Add Item</h1>
                <div className="form-container">
                  <form>
                    <div className="from-elements-container">
                      <input className="input-banner-container" type="file" />

                      <div className="title-input-container">
                        <label htmlFor="">Title <span>*</span></label>
                        <input type="text" placeholder="New Item 1" />
                      </div>

                      <div className="category-input-container">
                        <label htmlFor="category-selection">Category</label>
                        <select name="categories" id="category-selection">
                          <option value="Category01">Category 1</option>
                          <option value="Category02">Category 2</option>
                          <option value="Category03">Category 3</option>
                        </select>

                      </div>




                      <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />

                      <div className="item-price-input-container">
                        <div className="item-price-input-container-select">
                          <label htmlFor="item-price">Item price</label>
                          <select name="item-price" id="item-price" pl>
                            <option value="Exact Amount">Exact Amount</option>
                            <option value="half Amount">Half Amount</option>
                          </select>  
                        </div>

                        <div className="item-price-input-container-input">
                          <div><span>EGP</span></div>
                          <input type="text" placeholder="500" />
                        </div>        
                      </div>
                    </div>

                    <div className="form-buttons">
                      <button onClick={closeForm}>Cancel</button>
                      <button>save</button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
      )}

      {isCategoryFormVisible && (
        <section className="modal-overlay item-form-container">
          <div className="modal item-form category-form" ref={modalCategoryRef}>
                <h1>Add category</h1>
                <div className="form-container">
                  <form>
                    <div className="from-elements-container">
                      <div className="title-input-container">
                        <label htmlFor="">Category name <span>*</span></label>
                        <input type="text" placeholder="Category 1" />
                      </div>
                    </div>

                      <ReactQuill className="editor category" theme="snow" value={value} onChange={setValue} />


                    <div className="form-buttons">
                      <button onClick={closeCategoryForm}>Cancel</button>
                      <button>save</button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
      )}
    </section>
  )
}