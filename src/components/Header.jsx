import pileUp_logo from "../assets/pileup_logo.png";
import { IoNotificationsOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineShoppingCart, AiFillCloseCircle } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import "../App.css"
import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import ItemCart from "./ItemCart";
import Menu from "./menu/Menu";
import MenuButton from "./menu/MenuButton";
import MenuDropdown from "./menu/MenuDropdown";
import MenuItem from "./menu/MenuItem";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
// import '../App.rtl.css'; // Import styles as a module



export default function Header() {

  const { i18n, t } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  // Remove existing style elements
  document.querySelectorAll('style[data-dynamic-style]').forEach((element) => {
    element.parentNode.removeChild(element);
  });

  // Create a new style element
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-dynamic-style', 'true'); // Set a data attribute to identify dynamic styles

  if (i18n.language === 'ar') {
    import('../App.rtl.css').then((module) => {
      // Apply styles dynamically
      styleElement.textContent = module.default;
      document.head.appendChild(styleElement);
    });
  } else if (i18n.language === 'en') {
    import('../App.css').then((module) => {
      // Apply styles dynamically
      styleElement.textContent = module.default;
      document.head.appendChild(styleElement);
    });
  }

  // Remove the current style element when the component is unmounted or when the language changes
  return () => {
    if (styleElement.parentNode) {
      const lastStyleElement = document.head.lastElementChild;
      const prevStyleElement = lastStyleElement.previousElementSibling;
      document.head.removeChild(prevStyleElement);

      styleElement.parentNode.removeChild(styleElement);
    }
  };
}, [i18n.language]);


  const { token, setToken } = useAuth()
  const navigate = useNavigate()

  const [cartDialog, setCartDialog] = useState(false)
  const modelRef = useRef(null)

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)


  const [cartData, setCartData] = useState([])

  const total = cartData.reduce((sum, item) => item.total + sum, 0)

  const openCartDialog = (event) => {
    event.stopPropagation();

    setCartDialog(true)

    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/carts/cart`)
          .then(res => {
            setLoadingStatus(false)
            console.log(res)
            setCartData(res.data.data)
          })
          .catch(err => {
            console.log(err)
          })
  }

  function handleRemoveElementFromCart(status) {
    console.log(status)
    if (status) {
      setLoadingStatus(true)
      axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/carts/cart`)
      .then(res => {
        setLoadingStatus(false)
        console.log(res)
        setCartData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  const closeCartDialog = () => {
    setCartDialog(false)
  }

  const cartElements = cartData.map(item => {
    return (<ItemCart key={item.id} removeCartItemCheck={handleRemoveElementFromCart} total={item["total"]} id={item["id"]} itemId={item["item_id"]} quantity={item["quantity"]} image={item["item_image"]} name={item["item_name"]} />)
  })

  useEffect(() => {
    function handleClickOutside(event) {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        closeCartDialog()
      }
    }

    if (cartDialog) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    
  }, [cartDialog])

  const handleLogout = () => {
    setToken()
    navigate("/", { replace: true })
  }

  
  // if (error) {
  //   return (
  //     <h1 style={{gridColumn: "2/-1", textAlign: "center" }}>{error} <br/> Please Refresh</h1>
  //   )
  // }


  function placeHolderHandler() {
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/orders/placeorder`, {payment_method_id: 1})
          .then(res => {
            console.log(res)
            closeCartDialog()
            navigate("/cart", {state: {cartOrder: res.data.data}})
          })
          .catch(err => {
            console.log(err)
          })
  }


  return (
    <header>
      <a className="link-img-logo" href="/"><img src={pileUp_logo} alt="PileUp-logo" /></a>

      <LanguageSelector />

      <Link className="home-link" to="/">{t("Home")}</Link>
      <Link to={"/dashboard/folders"} className="dashboard-link">
        {t("Dashboard")} 
        {/* <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.08926 0.304275C1.23024 0.163335 1.42143 0.0841594 1.62077 0.0841593C1.82012 0.0841593 2.01131 0.163335 2.15229 0.304275L5.87368 4.02566L9.59506 0.304275C9.73685 0.167329 9.92676 0.0915523 10.1239 0.0932651C10.321 0.0949779 10.5096 0.174043 10.6489 0.313432C10.7883 0.452821 10.8674 0.641381 10.8691 0.838499C10.8708 1.03562 10.795 1.22552 10.6581 1.36731L6.4052 5.62022C6.26422 5.76116 6.07303 5.84033 5.87368 5.84033C5.67433 5.84033 5.48314 5.76116 5.34216 5.62022L1.08926 1.36731C0.948316 1.22633 0.86914 1.03514 0.86914 0.835793C0.86914 0.636445 0.948316 0.445257 1.08926 0.304275Z" fill="#1A181B"/>
        </svg> */}
      </Link>
      <Link className="vendors-link">{t("Vendors")}</Link>

      {token && <Link className="notification-link"><IoNotificationsOutline /></Link> }
      {/* {token && <Link to="/profile" className="profile-link"><FaUserCircle /></Link> } */}

      {token && 
        <Menu>
          <MenuButton><FaUserCircle /></MenuButton>
          <MenuDropdown>
            <MenuItem>
              <Link className="profile-menu-link" to="/profile">{t("Profile")}</Link>
            </MenuItem>

            <MenuItem>
              <button className="logout-menu-link" onClick={handleLogout}>{t("Logout")}</button>
            </MenuItem>
          </MenuDropdown>
        </Menu>
      }

      
      {!token && <Link className="login-link" to="/login">
        Log in 
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1621 0.33018C11.3028 0.189729 11.4934 0.11084 11.6921 0.11084C11.8909 0.11084 12.0815 0.189729 12.2221 0.33018L18.2221 6.33018C18.3626 6.47081 18.4415 6.66143 18.4415 6.86018C18.4415 7.05893 18.3626 7.24955 18.2221 7.39018L12.2221 13.3902C12.1535 13.4639 12.0707 13.523 11.9787 13.564C11.8867 13.605 11.7874 13.627 11.6867 13.6288C11.586 13.6305 11.4859 13.612 11.3925 13.5743C11.2992 13.5366 11.2143 13.4804 11.1431 13.4092C11.0719 13.338 11.0157 13.2532 10.978 13.1598C10.9403 13.0664 10.9218 12.9664 10.9235 12.8657C10.9253 12.765 10.9474 12.6656 10.9884 12.5736C11.0293 12.4816 11.0885 12.3988 11.1621 12.3302L15.8821 7.61018H1.69214C1.49323 7.61018 1.30246 7.53116 1.16181 7.39051C1.02116 7.24986 0.942139 7.05909 0.942139 6.86018C0.942139 6.66127 1.02116 6.4705 1.16181 6.32985C1.30246 6.1892 1.49323 6.11018 1.69214 6.11018H15.8821L11.1621 1.39018C11.0217 1.24955 10.9428 1.05893 10.9428 0.86018C10.9428 0.661429 11.0217 0.470805 11.1621 0.33018Z" fill="#EF6C4D"/>
        </svg>
      </Link>}
      {!token && <Link className="signup-link" to="/signup">
        Sign up 
        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1621 0.33018C11.3028 0.189729 11.4934 0.11084 11.6921 0.11084C11.8909 0.11084 12.0815 0.189729 12.2221 0.33018L18.2221 6.33018C18.3626 6.47081 18.4415 6.66143 18.4415 6.86018C18.4415 7.05893 18.3626 7.24955 18.2221 7.39018L12.2221 13.3902C12.1535 13.4639 12.0707 13.523 11.9787 13.564C11.8867 13.605 11.7874 13.627 11.6867 13.6288C11.586 13.6305 11.4859 13.612 11.3925 13.5743C11.2992 13.5366 11.2143 13.4804 11.1431 13.4092C11.0719 13.338 11.0157 13.2532 10.978 13.1598C10.9403 13.0664 10.9218 12.9664 10.9235 12.8657C10.9253 12.765 10.9474 12.6656 10.9884 12.5736C11.0293 12.4816 11.0885 12.3988 11.1621 12.3302L15.8821 7.61018H1.69214C1.49323 7.61018 1.30246 7.53116 1.16181 7.39051C1.02116 7.24986 0.942139 7.05909 0.942139 6.86018C0.942139 6.66127 1.02116 6.4705 1.16181 6.32985C1.30246 6.1892 1.49323 6.11018 1.69214 6.11018H15.8821L11.1621 1.39018C11.0217 1.24955 10.9428 1.05893 10.9428 0.86018C10.9428 0.661429 11.0217 0.470805 11.1621 0.33018Z" fill="#EF6C4D"/>
        </svg>
      </Link>}

      {/* {token && <Link className="logout-link" onClick={handleLogout}>Logout</Link>} */}

      {/* Deleted the cart word */}
      {token && <button className="cart-button" onClick={openCartDialog}><AiOutlineShoppingCart/></button>}

      {cartDialog && 
      <div className="model-overlay-cart">
          <div className="model-cart" ref={modelRef}>
            <div className="cart-dialog-container">
              <h1>{t("Cart")}</h1>
              <button type="button" onClick={closeCartDialog}><AiFillCloseCircle /></button>
            </div>

            <div className="cart-dialog-container-items">
              {!loadingStatus ? cartElements :      
              <Box sx={{ display: 'flex', justifyContent:"center", gridColumn: "8", alignSelf: "center", marginTop: "1rem"}}>
                <CircularProgress color="success"  />
              </Box>}
            </div>


            <div className="total-checkout-container">
              <div className="sub-total">
                <span>{t("Sub-total")}</span>
                <span>{total} {t("EGP")}</span>
              </div>

              {/* <div className="tax">
                <span>Tax</span>
                <span>60.0 EGP</span>
              </div> */}

              <div className="total">
                <span>{t("Total")}</span>
                <span>{total} {t("EGP")}</span>
              </div>

              <div className="cart-navigation">
                {cartData.length !== 0 && <button onClick={placeHolderHandler}>{t("Continue to checkout")}</button>}
                <button onClick={closeCartDialog}>{t("Keep shopping")}</button>
              </div>
            </div>
          </div>
      </div>
      }
    </header>
  )
}