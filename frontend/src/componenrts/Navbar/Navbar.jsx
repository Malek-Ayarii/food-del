import "./Navbar.css"
import { assets } from "../../assets/assets"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { StoreContext } from "../../context/StroreContext"

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home")
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                <li onClick={() => { setMenu("home"); setIsMobileMenuOpen(false); }} className={menu === "home" ? "active" : ""}><Link to='/'>home</Link></li>
                <li onClick={() => { setMenu("menu"); setIsMobileMenuOpen(false); }} className={menu === "menu" ? "active" : ""}><a href='#explore-menu'>menu</a></li>
                <li onClick={() => { setMenu("mobile-app"); setIsMobileMenuOpen(false); }} className={menu === "mobile-app" ? "active" : ""}><a href='#app-download'>mobile-app</a></li>
                <li onClick={() => { setMenu("contact-us"); setIsMobileMenuOpen(false); }} className={menu === "contact-us" ? "active" : ""}><a href='#footer'>contact us</a></li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Navbar