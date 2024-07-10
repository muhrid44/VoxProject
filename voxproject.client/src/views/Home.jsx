import { React, useEffect, useState } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const { loggedIn, email } = props;
    const navigate = useNavigate();

    useEffect(() => {
        var resultToken = JSON.parse(sessionStorage.getItem('credential'));
        if (resultToken != undefined) {
            navigate('/users');
        }
    });

    const onButtonClickLogin = () => {
        // You'll update this function later
        navigate('/login');
    }

    const onButtonClickRegistration = () => {
        // You'll update this function later
        navigate('/registration');
    }

    return (
        <div className="mainContainer d-flex flex-column align-items-center justify-content-center min-vh-100 p-5">
            <div className="text-center">
                <div className="titleContainer mb-4">
                    <div>Welcome!</div>
                </div>
                <div className="mb-4">This is the home page.</div>
                <div className="buttonContainer">
                    <button className="btn btn-primary mb-3" onClick={onButtonClickLogin}>Login</button>
                </div>
                <div className="buttonContainer">
                    <button className="btn btn-primary mb-3" onClick={onButtonClickRegistration}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default Home;