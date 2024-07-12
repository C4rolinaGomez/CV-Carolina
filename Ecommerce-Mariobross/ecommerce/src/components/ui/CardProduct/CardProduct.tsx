
import { FC } from "react";
import { CartProduct, Product } from "../../../Interface";
import useCartContext from "../../../hooks/useCartContext";
import styles from "./CardProduct.module.css";
import { toast } from 'sonner';



interface Props {
    product: Product
}



//Quiere decir que esta card será un componente funcional y recibira props por parametro
export const CardProduct: FC<Props> = ({product}) => {

    const {dispatch} = useCartContext()

    //Crea un item para seleccionar las propiedades necesarias para agregarlas al carrito
    const item: CartProduct = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity:1,
    }

    //Crea una función para hacer un dispatch de la accion
    const addToCart = (item: CartProduct) =>{
        dispatch({type: "ADD_TO_CART", payload: item})
        //Utiliza la libreria sonner para que notifique que fué agregado al carrito
        toast.success("Product added to cart")
    }

    return (
        <div className={styles.cardContainer}>
            <img className={styles.cardImage} src={product.image} alt={product.name} />
            <div className={styles.cardDetail}>
                <h3 className={styles.cardTitle}>{product.name}</h3>
                <div className={styles.cardBody}>
                    <p className={styles.cardType}>{product.type}</p>
                    <p className={styles.cardPrice}>price, <small>00</small></p>
                </div>
                <button className={styles.cardButton} onClick={() => addToCart(item)}>Agregar al carrito</button>
            </div>

        </div>
    );
};
