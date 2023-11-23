import { useState } from "react"
import "../App"
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai"
import { MdOutlineDelete } from "react-icons/md"
import axios from "axios"
import { useTranslation } from "react-i18next"

export default function Item(props) {

  const { t } = useTranslation()

  const [itemRemovalStatus, setItemRemovalStatusState] = useState(false)

  // function handleAdding() {
  //   axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/carts/addtocart`, {item_id: props.itemId, price: props.total})
  //   .then(res => {
  //     console.log(res)
  //     setState(previousValue => previousValue + 1)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
    
  // }

  function handleRemoving() {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/carts/removecart`, {cart_id: props.id})
      .then(res => {
        console.log(res)
        // setItemRemovalStatusState(true)
        // console.log(itemRemovalStatus)
        props.removeCartItemCheck(true)
      })
      .catch(err => {
        console.log(err)
        props.removeCartItemCheck(false)
      })
      .finally()
  }

    // function handleRemoveFromCart() {
  //   axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/carts/removecart`, {cart_id: props.id})
  //         .then(res => {
  //           setAddedtoCart(false)
  //           console.log(res)
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         })
  // }

  return (
    <section className="item-component-container">
      <div className="item-cart-image-name">
        {/* <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M54.8089 25.1938C55.5035 25.8883 56.0546 26.7128 56.4305 27.6202C56.8065 28.5277 57 29.5004 57 30.4826C57 31.4649 56.8065 32.4375 56.4305 33.345C56.0546 34.2525 55.5035 35.077 54.8089 35.7715L35.7715 54.8089C35.077 55.5035 34.2525 56.0546 33.345 56.4305C32.4375 56.8065 31.4649 57 30.4826 57C29.5004 57 28.5277 56.8065 27.6202 56.4305C26.7128 56.0546 25.8883 55.5035 25.1938 54.8089L2.18972 31.8048C1.49532 31.1102 0.944534 30.2857 0.568817 29.3782C0.193104 28.4707 -0.000183105 27.4982 0 26.516V4.48714C0 3.29707 0.472755 2.15575 1.31425 1.31425C2.15576 0.472751 3.29708 1.29979e-07 4.48714 1.29979e-07H26.519C27.5011 -0.000182978 28.4737 0.193101 29.3812 0.568816C30.2887 0.944531 31.1132 1.49532 31.8078 2.18972L54.8089 25.1938ZM17.9844 11.9657C21.3049 11.9657 23.9314 14.4546 23.9314 17.9126C23.9314 21.3737 21.3049 23.9314 17.9844 23.9314C14.5952 23.9314 11.9657 21.3737 11.9657 17.9126C11.9657 14.4546 14.5982 11.9657 17.9844 11.9657Z" fill="#D9F5F1"/>
        </svg> */}
        <img className="item-component-container-cart-img" src={props.image} alt="cartItem-picture"/>
        <h1>{props.name}</h1>
      </div>
{/* 
      <div className="item-component-buttons">
        <button onClick={handleRemoving}><AiOutlineMinusSquare /></button>
        <span>{1}</span>
        <button onClick={handleAdding}><AiOutlinePlusSquare /></button>
      </div> */}

      <div className="cart-item-total">
        <h2>{props.total} {t("EGP")}</h2>
      </div>
      {!props.orderNumber && <button className="remove-cart-Item" onClick={handleRemoving}><MdOutlineDelete /></button>}

    </section>
  )
}