import "../../App.css"
import React, { useEffect, useState } from 'react';
import Item from "../../components/ItemCart";
import axios from "axios";
import Order from "../../components/Order";
import { useLocation } from "react-router-dom";

export default function CartPage() {
  const [creditCardForm, setCreditCardForm] = useState(true)
  const [cashCallForm, setCashCallForm] = useState(true)
  const [vodafoneCashForm, setVodafoneCashForm] = useState(true)
  const [walletForm, setWalletForm] = useState(true)

  const [ordersData, setOrdersData] = useState([])

  const location = useLocation()
  console.log(location)

  console.log(ordersData)
  console.log(location?.state?.cartOrder)

  const [state, setState] = useState({
      cardNumber: '',
      expiration: '',
      cvv: '',
      name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    // axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/orders`)
    // .then(res => {
    //   // setLoadingStatus(false)
    //   console.log(res)
    //   setOrdersData(res.data.data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    if(location?.state?.cartOrder) {
      setOrdersData([location?.state?.cartOrder])
    } else {
      setOrdersData([{
        "order_number": "EA27197890811",
        "total": 0,
        "items": []
    }])
    }
    console.log(ordersData)

  }, [])

  const OrderElements = ordersData.filter(order => order.total !== "0.00").map(order => {
    return (
      <Order key={order} orderNumber={order["order_number"]} total={order["total"]} items={order["items"]} />
    )
  })

  const total = ordersData.reduce((sum, e) => sum + Number(e.total), 0)

  return (
    <section className="cart-container">
      <div className="payment-container">
        <h1>Payment method</h1>

        <form className="credit-card-form" onSubmit={handleSubmit}>
          <div className="card-number-input">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={state.cardNumber}
              onChange={handleInputChange}
              placeholder="0000 0000 0000 0000"
              id="cardNumber"
            />
          </div>

          <div className="expiration-date-input">
            <label htmlFor="expiration">Expiration Date</label>
            <input
              type="text"
              name="expiration"
              value={state.expiration}
              onChange={handleInputChange}
              placeholder="MM/YY"
              id="expiration"
            />
          </div>

          <div className="cvv-input">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              name="cvv"
              value={state.cvv}
              onChange={handleInputChange}
              placeholder="CVV"
              id="cvv"
            />
          </div>

          <div className="name-input">
            <label htmlFor="name">Name on card</label>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                placeholder="Name"
                id="name"
              />
          </div>

          <button>Checkout</button>
        </form>


      </div>

      <div className="order-summary-container">
        <div className="order-summary-container-header">
          <h1>Order summary</h1>
        </div>
        
        <div className="items-container-checkout">
          {OrderElements}
        </div>

        <div className="total-checkout-container">
          <div className="sub-total">
            <span>Sub-total</span>
            <span>{total} EGP</span>
          </div>

          {/* <div className="tax">
            <span>Tax</span>
            <span>60.0 EGP</span>
          </div> */}

          <div className="total">
            <span>Total</span>
            <span>{total} EGP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
