
import { useState } from "react"
import Logo from "../../../assets//logo.svg"
import Cart from "../../../assets/cart.svg"
import styles from "./NavBar.module.css"
import { CartModal } from "../CartModal/CartModal"
import useCartContext from "../../../hooks/useCartContext"
import { useLocation, useNavigate } from "react-router-dom"

export const NavBar = () => {

  const [showCartModal, setShowCartModal] = useState(false)

  const { state: { cartItems } } = useCartContext()

  const navigate = useNavigate()
  const location = useLocation()

  const handleShowCartModal = () => {
    //esto lo que hace es esatr modificando el estado en el que se encuentra esa cary, cuando estrá en true, pasa a false y viceversa
    setShowCartModal(!showCartModal)
  }

  const handleNavigateToHome = () => {
    navigate("/")
  }

  return (
    <div className={styles.navbarContainer}>
      {/* //Con este evento onclick lo que hace es navegar directamente la home al hacer click */}
      <div className={styles.navbarDetail} onClick={handleNavigateToHome}>
        <img src={Logo} alt="logo de ecommerce" />
        <div>
          <span>DH Ecommerce</span>
        </div>
      </div>

      {/* //Esto es para que la pagina se muestre solamente cuando la pagina sea diferente a checkout */}
      {location.pathname !== "/checkout" && (
        <>
          <div className={styles.navbaCartContainer}>
            <p className={styles.navbarTextAmount}>{cartItems.length}</p>
            {/* //En la imagen del carrito rea el evento oncliclk para ejecutar la funcion creada */}
            <img src={Cart} alt="Carrito" width={50} height={50} onClick={handleShowCartModal} />
          </div>
          {/* //pasa la funcion handle creada anteriormente  */}
          {showCartModal && (<CartModal handleShowCartModal={handleShowCartModal} />)}
        </>
      )}

    </div>
  )
}
