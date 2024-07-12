import { createContext, Dispatch } from "react";
import { CartAction, CartState } from "./CartReducer";

 interface CartContextType{
    state: CartState;
    //u dispatch con el tipo de accion definida anteriormente
    dispatch: Dispatch<CartAction>
 }

 //Crea el context que será de tipo cartContextType, si no es así es undefined y su estado inicial que se pasa en los () será undefined
//  (una forma de tiparlo)
// export const CartContext = createContext<CartContextType|undefined>(undefined)

//Ota forma de tiparlo por medio de un casteo
export const CartContext = createContext({} as CartContextType)