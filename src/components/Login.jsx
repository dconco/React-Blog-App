import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import "../index.css";

/* *** ===[ IMPORT IMAGES ]=== *** */
import Logo from "../assets/icon.jpg";
import Auth from "../assets/auth.png";

export default function Login() {
    const [input, setInput] = useState({});
    
    const inputChange = (event) => {
        const name = event.name;
        const value = event.value;
        setInput(values => ({...values, [name]: value}))
    }
    
    const submit = (event) => {
        event.preventDefault();
        
        if (input.email === undefined || input.password === undefined) {
            alert("Fields must not be Empty!")
            return;
        }
        const res = JSON.stringify(input);
        alert(res)
    }
    
    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            
            <main className='main'>
                <div className='container'>
                    <div className='wrapper'>
                        {/* *** ===[ LOGO CONTAINER ]=== *** */}
                        <div className='logo-cont'>
                            <div className='logo-img'>
                                <Link to='/'>
                                    <img src={Logo} alt={`Dave Conco Logo`} />
                                </Link>
                            </div>
                            
                            <div className='logo-text'>
                                <h3>Login</h3>
                            </div>
                        </div>
                        <hr />
                        
                        {/* *** ===[ MAIN FORM ]=== *** */}
                        <form onSubmit={(event) => submit(event)}>
                            {/* *** ===[ EMAIL ]=== *** */}
                            <div className='row email'>
                                <label for='email'>Email:</label>
                                <br />
                                <div className='input'>
                                    <Icon icon='mdi:user-outline' className='iconify' />
                                    <input id='email' name='email' type='email' onChange={(e) => inputChange(e.target)}
                                    value={input.email} placeholder='Enter user Email' />
                                </div>
                            </div>
                            
                            {/* *** ===[ PASSWORD ]=== *** */}
                            <div className='row pwd'>
                                <label for='pwd'>Password:</label>
                                <br />
                                <div className='input'>
                                    <Icon icon='bx:lock' className='iconify' />
                                    <input id='pwd' name='password' type='password' onChange={(e) => inputChange(e.target)} 
                                    value={input.password} placeholder='Enter user Password' />
                                </div>
                            </div>
                            
                            {/* *** ===[ BUTTON ]=== *** */}
                            <div className='btn-cont'>
                                <button type='submit' name='btn'>Login</button>
                            </div>
                            
                            <div className='other'>
                                <span>Don't have an Account?</span>
                                <Link to={`/register`} className='reg'> Register</Link>
                            </div>
                        </form>
                    </div>
                    
                    {/* *** ===[ AUTH BACKGROUND GRID ]=== *** */}
                    <div className='wrapper2'>
                        <div className='img-bg-cont'>
                            <img className='img-bg' src={Auth} alt='Authentication Bg' />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}