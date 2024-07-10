// Layout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        var resultToken = JSON.parse(sessionStorage.getItem('credential'));
        if (resultToken != undefined) {
            setIsLogin(true);
            navigate('/users');
        } else {
            navigate('/home');
        }
        console.log(isLogin);
    }, [isLogin]);

    const onClickLogout = () => {
        sessionStorage.removeItem('credential');
        setIsLogin(false);
    }

    return (
        <div className="layout">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-around collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/users">Users <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/organizers">Organizers</Link>
                            </li>
                            {isLogin ? <li className="nav-item">
                                <Link className="nav-link" to="/home" onClick={onClickLogout}>Logout</Link>
                            </li> : ''}

                        </ul>
                    </div>
                </div>
            </nav>
            <main className="main-content" style={{ paddingTop: '70px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
