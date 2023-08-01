import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import "../index.css";

/* *** ===[ IMPORT IMAGES ]=== *** */
import Logo from "../assets/icon.jpg";
import Auth from "../assets/auth.png";

export default function Signup() {
    const [input, setInputs] = useState({});
    
    const inputChange = (event) => {
        const name = event.name;
        const value = event.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const submit = (event) => {
        event.preventDefault();
        
        if (input.email === undefined || input.password === undefined) {
            alert("Fields must not be Empty!")
            return;
        }
        if (input.password !== input.password2) {
            alert("Password are not Matched!")
            return;
        }
        
        const res = JSON.stringify(input);
        alert(res)
    }
    
    return (
        <>
            <Helmet>
                <title>Register Page</title>
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
                                <h3>Register</h3>
                            </div>
                        </div>
                        <hr />
                        
                        {/* *** ===[ MAIN FORM ]=== *** */}
                        <form onSubmit={(event) => submit(event)}>
                            <div className='split1 split'>
                                {/* *** ===[ FULLNAME ]=== *** */}
                                <div className='row fullname'>
                                    <label for='fullname'>Fullname:</label>
                                    <br />
                                    <div className='input'>
                                        <Icon icon='mdi:user-outline' className='iconify' />
                                        <input id='fullname' name='fullname' type='text' onChange={(e) => inputChange(e.target)}
                                        value={input.fullname} placeholder='Enter Fullname' />
                                    </div>
                                </div>
                                
                                {/* *** ===[ EMAIL ]=== *** */}
                                <div className='row email'>
                                    <label for='email'>Email:</label>
                                    <br />
                                    <div className='input'>
                                        <Icon icon='mdi:user-outline' className='iconify' />
                                        <input id='email' name='email' type='email' onChange={(e) => inputChange(e.target)}
                                        value={input.email} placeholder='Enter Email' />
                                    </div>
                                </div>
                            </div>
                            
                            <div className='split2 split'>
                                {/* *** ===[ PASSWORD ]=== *** */}
                                <div className='row pwd'>
                                    <label for='pwd'>Password:</label>
                                    <br />
                                    <div className='input'>
                                        <Icon icon='bx:lock' className='iconify' />
                                        <input id='pwd' name='password' type='password' onChange={(e) => inputChange(e.target)} 
                                        value={input.password} placeholder='Enter Password' />
                                    </div>
                                </div>
                                
                                {/* *** ===[ CONFIRM PASSWORD ]=== *** */}
                                <div className='row pwd2'>
                                    <label for='pwd2'>Confirm Pwd:</label>
                                    <br />
                                    <div className='input'>
                                        <Icon icon='bx:lock' className='iconify' />
                                        <input id='pwd2' name='password2' type='password' onChange={(e) => inputChange(e.target)} 
                                        value={input.password2} placeholder='Retype Password' />
                                    </div>
                                </div>
                            </div>
                            
                            {/* *** ===[ BUTTON ]=== *** */}
                            <div className='btn-cont'>
                                <button type='submit' name='btn'>Register</button>
                            </div>
                            
                            <div className='other'>
                                <span>Don't have an Account?</span>
                                <Link to={`/login`} className='reg'> Login</Link>
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