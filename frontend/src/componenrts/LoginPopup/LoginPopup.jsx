import "./LoginPopup.css"
import { assets } from "../../assets/assets"
import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../../context/StroreContext'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await fetch(newUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            setToken(responseData.token);
            localStorage.setItem("token", responseData.token);
            setShowLogin(false);
        } else {
            alert(responseData.message);
        }
    }


    return (
        <div className="login-popup">
            <form action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Your name' onChange={onChangeHandler} name="name" value={data.name} required />}
                    <input type="email" placeholder='Your email' onChange={onChangeHandler} name="email" value={data.email} required />
                    <input type="password" placeholder='Your password' onChange={onChangeHandler} name="password" value={data.password} required />
                </div>
                <button onClick={onLogin} type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" ? <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Sign Up</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup