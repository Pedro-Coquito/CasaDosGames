import { NavLink } from "react-router-dom"
import icon from "../../assets/icon.png"

function Menu(){
    return(
        <> 
        <header className="navbar">
      
            <img src={icon} className="icon-menu" />

                <nav className="nav-buttons">
                    <NavLink
                    to="/chamados"
                    className={({isActive}) => isActive? 'nav-link active' : 'nav-link'}>
                        Chamados
                    </NavLink>
                
                <NavLink 
                to = "/inventario"
                className={({isActive}) => isActive? 'nav-link active': 'nav-link'}>
                    Inventario
                </NavLink>


                <NavLink 
                to ="/home"
                className={({isActive}) => isActive? 'nav-link active': 'nav-link'}>
                    Home
                </NavLink>

        </nav>
        </header>
        </>
    )
}

export default Menu