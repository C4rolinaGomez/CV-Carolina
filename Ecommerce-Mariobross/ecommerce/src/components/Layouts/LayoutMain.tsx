//Este es el componente para ir colocando los children
import {Outlet} from "react-router-dom"
import { NavBar } from "../ui/NavBar/NavBar"

export const LayoutMain = () => {
  return (
    <div>
        <NavBar/>
        {/* //Puede definirce como un placeHolder donde se iran colocando cada uno de los children */}
        <Outlet/>
    </div>
  )
}
