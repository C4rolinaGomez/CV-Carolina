import { CartProduct } from "../../../Interface"
import useCartContext from "../../../hooks/useCartContext"
import styles from "./Table.module.css"

export default function Table() {

  
  const { state: { cartItems }, dispatch } = useCartContext()

  //Para que en la pestaña que aparece, remueva el producto del carrito con el boton
  const removeCart =(item: CartProduct) =>{
      dispatch({type:"REMOVE_FROM_CART", payload: item})
  }

  //Para que en la pestaña que aparece, agregue el producto al carrito con el boton
  const addToCart = (item: CartProduct) => {
      dispatch({type: "ADD_TO_CART", payload:item})
  }

  //Muestre el total de los productos agregados en el carrito
  const totalPay =  () =>{
      const total = cartItems.reduce((acc, item) =>{
          //va sumando al acumulador lo que retorma el precio del producto por la cantidad de productos
          return acc+ item.price * item.quantity
      }, 0)
      
      return total
  }


  return (
    <>
     <table className={styles.modalTable}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Delete</th>
                        <th>Quantity</th>
                        <th>Add</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (

                        <tr key={item.id}>
                            <td>
                                <p>{item.name}</p>
                            </td>
                            <td>
                                {/* //coresponde al delete */}
                                <button className={styles.modalButtonRemove}
                                    onClick={() => removeCart(item)}>-1</button>
                            </td>
                            {/* //corresponde a la cantidad */}
                            <td>
                                <p>{item.quantity}</p>
                            </td>
                            <td>
                                {/* //corresponde al encabezado de add */}
                                <button className={styles.modalButtonAdd}
                                onClick={()=> addToCart(item)}>+1</button>
                            </td>
                        </tr>

                    ))}

                </tbody>
            </table>

            <div className={styles.modalTotalContainer}>
                <h3> Total: ${totalPay()}</h3>
            </div></>
  )
}


