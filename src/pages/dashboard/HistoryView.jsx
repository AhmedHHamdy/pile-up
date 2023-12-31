import { useEffect, useMemo, useState } from "react";
import "../../App.css"
import axios from "axios";
import Pagination from "../../components/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import { Link } from "react-router-dom";
import { TbShoppingCartDollar } from "react-icons/tb"
import { useAuth } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";

let PageSize  = 10

export default function HistoryView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderData, setOrderData] = useState([])
  const [paginationData, setPaginationData] = useState([])
  console.log(paginationData)
  console.log(orderData)

  const { t } = useTranslation()

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const { token } = useAuth()

  function handleLinkClick(event) {
    event.preventDefault()
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/orders?page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setLoadingStatus(false)
      console.log(res)
      setOrderData(res.data.data)
      setPaginationData(res.data.paginator)
    })
    .catch(err => {
      setLoadingStatus(false)
      setError(err.message)
      console.log(err)
    })
  }, [currentPage])


  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    // return orderData.slice(firstPageIndex, lastPageIndex);
    return orderData

  }, [currentPage, orderData]); // Make sure to include 'orderData' as a dependency
  
  console.log(currentTableData);


  if (loadingStatus) {
    return (
      <Box sx={{ display: 'flex', justifyContent:"center", gridColumn: "8", alignSelf: "center" }}>
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
    <section className="table-container">
    <table className="table-orders">
      <thead>
        <tr>
          <th>ID</th>
          <th>{t("Order Number")}</th>
          <th>{t("Date")}</th>
          <th>{t("Total")}</th>
          <th>{t("Status")}</th>
          <th rowSpan={3}>{t("Items")}</th>
          <th>{t("Order Summary")}</th>
        </tr>
      </thead>
      <tbody>
        {currentTableData.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td><Link className="order-number-link" onContextMenu={handleLinkClick} to="../../cart" state={{ cartOrder: item }}>{item.order_number}</Link></td>
              <td>{item.date.split('T')[0]}</td>
              <td>EGP {item.total}</td>
              <td>{item.status}</td>
              <td>
                <ul>
                  {item.items.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              </td>
              <td className="order-history">
                 <Link onContextMenu={handleLinkClick} to="../../cart" state={{ cartOrder: item }}><TbShoppingCartDollar /></Link>
              </td>
            </tr>
          );
        })}
      </tbody>
 
    </table>
    <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={paginationData.total_count}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />  
    </section>
  )
}