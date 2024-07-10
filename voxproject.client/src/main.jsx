import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './views/Home.jsx'
import Layout from './views/Layout.jsx'
import './index.css'
import Login from './views/Auth/Login.jsx';
import Registration from './views/Auth/Registration.jsx';
import Organizers from './views/Organizers.jsx';
import Users from './views/Users.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route path="/" element={<Layout />}>
                    <Route path="organizers" element={<Organizers />} />
                    <Route path="users" element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>  </React.StrictMode>,
)
