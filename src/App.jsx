import React, { useEffect } from 'react';
import ReactDOM from "react-dom/client";
import Helmet from "react-helmet";
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Link
} from "react-router-dom";

import "./App.css";

import Home from "./index";
import Login from "./components/Login";
import Register from "./components/Register";
import FileUploader from "./components/Upload";
import NotFound from "./components/ErrorPage";

export default function App() {
    useEffect(() => {
        const img = document.querySelectorAll("img");
        for (let i = 0; i < img.length; i++) {
            img[i].oncontextmenu = function(e) {
                e.preventDefault()
            }
        }
    })
    
    const console = () => {
        return (
            <>
                <h3>Welcome to Dev Mode</h3>
                <br />
                <Link to='start'>
                    <button>Get Started</button>
                </Link>
            </>
        )
    }
    
    return (
        <>
        <Helmet>
            <title>Beautify, Responsive web Land Page | By Dave Conco | ReactJS</title>
        </Helmet>
        
        <Router>
            <Routes>
                <Route path="/">
                    <Route path="index?/" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="upload" element={<FileUploader />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                
                <Route path="/console" element={<><h1>Developer Console Mode</h1><Outlet /></>}>
                    <Route path="index?/" element={console()} />
                    <Route path="start" element={<h3>Start Dev Mode</h3>} />
                </Route>
            </Routes>
        </Router>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);