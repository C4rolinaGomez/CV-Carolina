import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LayoutMain } from './components/Layouts/LayoutMain.tsx'
import './index.css'
import Home from "./pages/Home/Home.tsx"
import { CartProvider } from './context/CartProvider.tsx'
import Checkout from './pages/Home/Checkout/Checkout.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import Login from './pages/Home/Login/Login.tsx'
import Dashboard from './pages/Home/Dashboard/Dashboard.tsx'

//Crea una instancia de lo que es queryClient por medio del new
const queryClient = new QueryClient()

const router = createBrowserRouter([
  //objeto para acceder a varios metodos
  {
    path: "/",
    //Importamos el Layout que es el que se va a utilizar
    //El layout va a tener dentro unos hijos (NavBar y footer)
    //Es el que envuelve la pagina del home y del carrito por medio de un children
    element: <LayoutMain />,
    children: [
      //En este array de objetos se declaran todos esos children a utilizar

      //Se habilita el index:true para que el primer elemento que se muestre sea el LayoutHome
      { index: true, element: <Home /> },

      //Renderiza el elemento cart
      { path: "/checkout", element: <Checkout /> },


    ],
  },
  //crea unas nuevas rutas
  {
    path: "/login", element: <Login/>
  },
  {
    path: "/dashboard", element: <Dashboard/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  
    {/* LLama al query client provideruna vez creado el metodo */}
    <QueryClientProvider client={queryClient}>
      {/* //Query client es el proveedor que va a englobar a todos los componentes hijos que se quiere que accedan al provider */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>

    </QueryClientProvider>


  </React.StrictMode>,
)
