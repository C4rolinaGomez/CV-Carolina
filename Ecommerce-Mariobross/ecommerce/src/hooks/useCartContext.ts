import { useContext } from "react"
import { CartContext } from "../context/CartContext"

//HOOK CREADO PARA EVITAR ESTAR IMPORTANTO EL CONTEXTO EN TODO EL COMPONENTE 

//Será ua función encargada de llamar al cotexto por medio de useContext y asar al carrito
const useCartContext= () =>{
    return useContext(CartContext)
}

export default useCartContext;