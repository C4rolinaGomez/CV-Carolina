import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css"
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Product } from '../../../Interface'
import { createProduct } from '../../../service'

const Dashboard = () => {

    //estado local para poder setear los productos y despues mandarlos al servicio
    const [product, setProduct] = useState({
        amiiboSeries: "",
        character: "",
        gameSeries: "",
        head: "",
        image: "",
        name: "",
        releaseDate: "",
        tail: "",
        type: "",
        price: 0
    })

    const navigate = useNavigate()

     //mutacion para comprobar que tenga previamente los datos en el local storage cuando se cargue la página
     useEffect(()=>{
        const userLogin = localStorage.getItem("userLogin")
        //en caso de que no exista ese user en el local storage
        if (!userLogin){
            //lo envia al login
            navigate("/login")
        }
     },[])

     //Funcion para el logout (si alguien quiere salir de la pagina)
     const handleLogout = ()=>{
        localStorage.removeItem("userLogin")
        navigate("/login")
     }

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
     }

     //crea una mutacion para agregar el propducto y que aparezca en la api
     const mutation = useMutation((newProduct:Product)=>{
        console.log(newProduct);
        
        //llama al servicio
        return createProduct(newProduct)
     })

     //validar que si se estan recibiendo los datos
     const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(product)
     }

  return (
    <div className={styles.container}> 
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        {/* //formulario de los regiistros necesarios para tener un nuevo producto */}
        <form onSubmit={handleSubmit}>
            <div className={styles.formControlLogin}>
                <label htmlFor="amiiboSeries">Amiibo Series</label>
                <input 
                type="text" 
                id='amiiboSeries'
                name="amiiboSeries"
                value={product.amiiboSeries}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="character">character</label>
                <input 
                type="text" 
                id='character'
                name="character"
                value={product.character}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="gameSeries">game Series</label>
                <input 
                type="text" 
                id='gameSeries'
                name="gameSeries"
                value={product.gameSeries}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="head">head</label>
                <input 
                type="text" 
                id='head'
                name="head"
                value={product.head}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="image">Image</label>
                <input 
                type="url" 
                id='image'
                name="image"
                value={product.image}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                id='name'
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="releaseDate">Release Date</label>
                <input 
                type="date" 
                id='releaseDate'
                name="releaseDate"
                value={product.releaseDate}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="tail">Tail</label>
                <input 
                type="text" 
                id='tail'
                name="tail"
                value={product.tail}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="type">Type</label>
                <input 
                type="text" 
                id='type'
                name="type"
                value={product.type}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <label htmlFor="price">Price</label>
                <input 
                type="number" 
                id='price'
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                />
            </div>
            <div className={styles.formControlLogin}>
                <button type='submit'>Add product</button>
            </div>
        </form>
    </div>
  )
}

export default Dashboard