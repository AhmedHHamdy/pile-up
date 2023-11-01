import "../../../App.css"
import { AiOutlinePlus } from "react-icons/ai"
import { Link } from "react-router-dom"
import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/AuthProvider";

export default function ItemsView() {
  const [value, setValue] = useState('');
  const { token } = useAuth()

  console.log(token)

  const pileData = useOutletContext()
  console.log(pileData)

  const modalRef = useRef(null)
  const modalCategoryRef = useRef(null)

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false)

  useEffect(() => {
    axios.get(`https://test.zauzat.net/api/v1/items/list?pile_id=${pileData.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
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
        <div className="items-list-container-item">
          <div className="items-list-container-item-checkbox">
            <input type="checkbox" name="" id="" />
          </div>
          
          <div className="items-list-container-item-info">
            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clip-rule="evenodd" d="M54.8089 25.1938C55.5035 25.8883 56.0546 26.7128 56.4305 27.6202C56.8065 28.5277 57 29.5004 57 30.4826C57 31.4649 56.8065 32.4375 56.4305 33.345C56.0546 34.2525 55.5035 35.077 54.8089 35.7715L35.7715 54.8089C35.077 55.5035 34.2525 56.0546 33.345 56.4305C32.4375 56.8065 31.4649 57 30.4826 57C29.5004 57 28.5277 56.8065 27.6202 56.4305C26.7128 56.0546 25.8883 55.5035 25.1938 54.8089L2.18972 31.8048C1.49532 31.1102 0.944534 30.2857 0.568817 29.3782C0.193104 28.4707 -0.000183105 27.4982 0 26.516V4.48714C0 3.29707 0.472755 2.15575 1.31425 1.31425C2.15576 0.472751 3.29708 1.29979e-07 4.48714 1.29979e-07H26.519C27.5011 -0.000182978 28.4737 0.193101 29.3812 0.568816C30.2887 0.944531 31.1132 1.49532 31.8078 2.18972L54.8089 25.1938ZM17.9844 11.9657C21.3049 11.9657 23.9314 14.4546 23.9314 17.9126C23.9314 21.3737 21.3049 23.9314 17.9844 23.9314C14.5952 23.9314 11.9657 21.3737 11.9657 17.9126C11.9657 14.4546 14.5982 11.9657 17.9844 11.9657Z" fill="#D9F5F1"/>
            </svg>

            <div className="item-info-name">
              <h3>New Item 1</h3>
              <span>EGP 500</span>
            </div>

            <div className="item-info-total-collected">
              <h3>Collected</h3>
              <span>EGP 500.00</span>
            </div>
          </div>
        </div>
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