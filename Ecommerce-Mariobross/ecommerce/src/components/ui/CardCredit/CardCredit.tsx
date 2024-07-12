import Cards from "react-credit-cards-2"
import styles from "./CardCredit.module.css"
import "react-credit-cards-2/dist/es/styles-compiled.css"
import React, { useState } from "react"
import { toast } from 'sonner';
import useCartContext from "../../../hooks/useCartContext";
import { CartProduct } from "../../../Interface";


export const CardCredit = () => {

    //Etado para los componentes de la tarjeta de crédito
     const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: ""
     })

     const {dispatch} = useCartContext()

     const {number, name, expiry, cvc} = cardData

     //para tener un formulario controlado
     //Cada vez que se escriba sobre unop de los input, va guardando en el estado
     const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        })
     }

     const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setCardData({
            ...cardData,
            focus: e.target.name
        })
     }

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //Validar que los campos no esten vacíos
        //se puede ghcer desestructurando el estado
        
        if ([number, name, expiry, cvc].includes("")){
            //En caso de que alguno de los espacios tenga un string vacío

            //Mostrar mensaje error
            toast.error("All fields are required")
            return
        }
        //En caso de que si esten los inputs bien, limpia el estado, al inicial

        setCardData({
            number: "",
            name: "",
            expiry: "",
            cvc: "",
            focus: ""
        })

        //Para que se limpien los datos del carrito al enviar el formulario
        dispatch({type: "CLEAR_CART", payload: {} as CartProduct})
     }


    return (
        <div className={styles.container}>
            <div>
                {/* //libreria de credit cards para implementar en el formulario una tarjetab de credito */}
                <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={cardData.focus as any}
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.formControl}>
                    <label htmlFor="number"> Card Number</label>
                    <input 
                    type="text" 
                    name='number' 
                    id='number'
                    value={number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                     />
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="name"> Card Name</label>
                    <input 
                    type="text" 
                    name='name' 
                    id='name'
                    value={name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                     />
                </div>

                {/* grupo */}
                <div className={styles.formInputGrup}>
                    <div className={styles.formControl}>
                        <label htmlFor="expiry"> Card Expiry</label>
                        <input 
                        type="text" 
                        name='expiry' 
                        id='expiry' 
                        value={expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <label htmlFor="cvc"> Card CVC</label>
                        <input 
                        type="text" 
                        name='cvc' 
                        id='cvc'
                        value={cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                         />
                    </div>
                </div>

                <button type="submit" className={styles.buyButton}> Buy Now</button>

            </form>
        </div>
    )
}
