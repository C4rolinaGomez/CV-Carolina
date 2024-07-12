import React, { useState } from 'react'
import styles from "./Login.module.css"
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    //se importa para la navegacion entre páginas
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setUserData({
            ...userData,
            //de esta manerta se va a ir llenando el objeto que tenemos en el estado (userData)
            //primero llega la key en el [], y luego el valor que va a tener la misma
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        //primero hace una validacion para que no envie los input vacios
        if (userData.email.trim() === "" || userData.password ===""){
            return;
        }

        localStorage.setItem(
            "userLogin",
            JSON.stringify(userData.email)
        )

        navigate("/dashboard")
    }

    return (
        <div className={styles.containerLogin}>
            {/* email */}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.formControlLogin }>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id='email'
                    name='email' 
                    value={userData.email} 
                    onChange={handleChange} 
                    />
                </div>
                {/* password */}
                <div className={styles.formControlLogin }>
                   <label htmlFor="password">Password</label> 
                   <input 
                   type="password" 
                   name='password' 
                   id='password' 
                   value={userData.password} 
                   onChange={handleChange}
                   />
                </div>
                <div className={styles.formControlLogin}>
                    <button type='submit'>Login</button>
                </div>

            </form>
        </div>

    )
}

export default Login