import { CartProduct } from "../Interface"

//esatdo inicial, se hace esto para poder tiparlo
export interface CartState{
    cartItems: CartProduct[]
}

export const initialState: CartState = {
    cartItems:[]
}

//Acciones, se define de esta forma para parlas
export interface CartAction{
    type: "ADD_TO_CART" | "REMOVE_FROM_CART" | "CLEAR_CART";
    payload: CartProduct
}

export const cartReducer = (state: CartState, action: CartAction): CartState =>{

    switch (action.type) {
        case "ADD_TO_CART":{
            const {id} = action.payload

            //Validar si el item ya existe en el carrito, true or false
            const existingItem = state.cartItems.find((item)=>item.id===id)

            if (existingItem){
                // si existe un producto así en el carito, lo que hace es sumarle a lo que tiene 
                return{
                    ...state, 
                    cartItems: state.cartItems.map((item)=>item.id===id ? {...existingItem, quantity:existingItem.quantity+1 } : item )
                }
            }else{
                return{
                    //si no está, basicamente es agregarlo
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }
        }
        case "REMOVE_FROM_CART":{
            //Hay que buscar primero el id del item que se desea eliminar
            //le cambia un poco el nombre al id 
            const {id: removeItemId} = action.payload

            //validar si el item ya existe en el carrito
            const itemToRemove = state.cartItems.find((item) => item.id===removeItemId)
            
            //si solo existe ese item en el carrito
            if (itemToRemove){
                if (itemToRemove.quantity===1){
                    return{
                        //lo elimina completamente
                        ...state,
                        cartItems: state.cartItems.filter((item)=>item.id !==removeItemId)
                    }
                }else{
                    //Si existe más de un item en el carrito
                    return{
                        //elimina solo 1
                        ...state,
                        cartItems: state.cartItems.map((item)=>item.id===removeItemId ?                {...itemToRemove, quantity: itemToRemove.quantity-1 } : item )
                    }
                }
            }

            //en caso de que no exista devuelve el state, lo que ya tiene
            return state;
            
        }
        case "CLEAR_CART": {
            return {
                ...state,
                cartItems:[]
            }
        }
        default:
            return state;
    }
}