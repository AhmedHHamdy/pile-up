import "../../../App.css"
import { AiOutlinePlus, AiFillCloseCircle } from "react-icons/ai"
import { Link } from "react-router-dom"
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";
import PileItem from "../../../components/PileItem";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const navigate = useNavigate()

  const [itemCreateForm, setItemCreateForm] = useState({
    name: '',
    description: '',
    status: 'active',
    is_required: 1,
    price: '',
    price_type: 'total_amount',
    quantity: '',
    can_show_quantity: 1,
    starting_price: '',
    pile_id: pileData.id,
    category_id: '1',
    image: null
  })


  function handleContentChange(value) {
    const text = value
    if (itemCreateForm.description !== text) { // Check if the content has changed
      setItemCreateForm((prevFormData) => ({
        ...prevFormData,
        description: text,
      }));
    }
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setItemCreateForm((prevFormData) => ({
      ...prevFormData,
      image: selectedFile, // Store the selected file in your state
    }));
  }

  function handleCreateItemChange(event) {
    const {name, value} = event.target
    setItemCreateForm(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  console.log(itemCreateForm)

  function handleCreateItemSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(); // Create a new FormData object
  
    // Append the fields from pileFormData
    for (const key in itemCreateForm) {
      if (key === "description") {
        formData.append(key, itemCreateForm[key].replace(/<[^>]*>/g, ''))
      } else if (key == "starting_price") {
        delete itemCreateForm[key]
      } else {
        formData.append(key, itemCreateForm[key]);
      }
    }
  
    // Append the file data
    // formData.append("image", itemCreateForm.image);
  
    axios
      .post(`${import.meta.env.VITE_BACKEND_API_URL}/items/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          // Include any other necessary headers, such as authorization
        },
      })
      .then((res) => {
        if (res) {
          console.log(res);
          // window.location.reload()
          setItemData(prevItemData => ([...prevItemData, res.data.data]))
          setItemCreateForm({
            name: '',
            description: '',
            status: 'active',
            is_required: 1,
            price: '',
            price_type: 'total_amount',
            quantity: '',
            can_show_quantity: 1,
            starting_price: '',
            pile_id: pileData.id,
            category_id: '1',
            image: null
          })
          closeForm()
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message)
      });
  }


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
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     console.log(modalRef)
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       closeForm();
  //     }
  //   }

  //   if (isFormVisible) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isFormVisible]);


  // useEffect(() => {
  //   function handleClickOutsideCategory(event) {
  //     if (modalCategoryRef.current && !modalCategoryRef.current.contains(event.target)) {
  //       closeCategoryForm()
  //     }
  //   }

  //     if (isCategoryFormVisible) {
  //       document.addEventListener('mousedown', handleClickOutsideCategory)
  //     }

  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutsideCategory)
  //   }
  // }, [isCategoryFormVisible])


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
        {/* <div className="items-select-input">
          <input type="checkbox" name="" id="" />
          <label htmlFor="">Select all</label>
        </div> */}

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
          <ToastContainer />
          <div className="modal item-form" ref={modalRef}>
                <h1>Add Item</h1>
                <button className="close-button" type="button" onClick={closeForm}><AiFillCloseCircle /></button>
                <div className="form-container">
                  <form onSubmit={handleCreateItemSubmit}>
                    <div className="from-elements-container">
                    <div className="input-banner-container" style={{display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1rem", justifyContent: "flex-start", alignItems: "flex-start", paddingLeft: "2rem"}}>
                      <label for="image" class="custom-file-upload" style={{ paddingLeft: "2rem" }}> Upload Image <span style={{ color: "#EF6C4D" }}>*</span> </label>
                      <input className="input-banner-container" style={{ paddingLeft: "2rem" }} id="image" type="file" name="image" onChange={handleFileChange}  required/>
                    </div>


                      <div className="title-input-container">
                        <label htmlFor="name">Title <span>*</span></label>
                        <input type="text" placeholder="New Item 1" name="name" id="name" onChange={handleCreateItemChange} value={itemCreateForm.name} required/>
                      </div>

                      <div className="category-input-container">
                        <label htmlFor="category-selection">Category</label>
                        <select name="category_id" id="category-selection" value={itemCreateForm.category_id} onChange={handleCreateItemChange}>
                          <option value="1">Category 1</option>
                        </select>
                      </div>


                      <ReactQuill className="editor" theme="snow" value={itemCreateForm.description} onChange={handleContentChange} required />

                      <div className="item-price-input-container">
                        <div className="item-price-input-container-select">
                          <label htmlFor="price_type">Item price</label>
                          <select name="price_type" id="price_type" value={itemCreateForm.price_type} onChange={handleCreateItemChange} required>
                            <option value="total_amount">Total Amount</option>
                            <option value="any_amount">Any Amount</option>
                            <option value="recurring_amount">Recurring Amount</option>
                          </select>  
                        </div>

                        <div className="item-price-input-container-input">
                          <div><span>EGP</span></div>
                          <input type="text" placeholder="500" name="price" value={itemCreateForm.price} onChange={handleCreateItemChange} required/>
                        </div>        
                      </div>
                    </div>

                    {itemCreateForm.price_type == "any_amount" && <div className="item-starting-price-input-container-input">
                        {/* <label htmlFor="starting_price">Starting Price </label> */}
                        <div><span>EGP</span></div>
                        <input type="text" placeholder="Starting Price" id="starting_price" name="starting_price" value={itemCreateForm.starting_price} onChange={handleCreateItemChange} required />
                    </div>}

                    <div className="quantity-status-container">
                      <div className="item-quantity-input-container-input">
                          <label htmlFor="quantity">Quantity</label>
                          <input type="text" placeholder="5" name="quantity" id="quantity" value={itemCreateForm.quantity} onChange={handleCreateItemChange} required />
                      </div>        
    

                      <div className="status-input-container">
                          <label htmlFor="status-selection">Status</label>
                          <select name="status" id="status-selection" value={itemCreateForm.status} onChange={handleCreateItemChange} required>
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                          </select>
                      </div>
                    </div>
  

                    <div className="form-buttons">
                      <button type="button" onClick={closeForm}>Cancel</button>
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
                <button className="close-button" type="button" onClick={closeCategoryForm}><AiFillCloseCircle /></button>
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