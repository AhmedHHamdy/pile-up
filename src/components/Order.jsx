import { useTranslation } from "react-i18next"
import "../App.css"
import ItemCart from "./ItemCart"

export default function Order(props) {

  const { t } = useTranslation()

  const itemsElements = props.items.map(item => {
    return (<ItemCart key={item.id} name={item.name} total={item.price} image={item.image} orderNumber={props.orderNumber} />)
  })

  return(
    <section className="order-container">
      <h1>{t("Order Total")} <span> {props["total"]} {t("EGP")}</span></h1>
      <div>
        {itemsElements}
      </div>
    </section>
  )
}