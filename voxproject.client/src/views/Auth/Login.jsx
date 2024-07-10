import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import Swal from 'sweetalert2'

const baseURL = process.env.API_BASE_URL.replace(/\/+$/, '');
const loginURL = `${baseURL}/api/v1/auth/login`;

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isEmailVaid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const navigate = useNavigate();

    const onButtonClick = () => {
        // You'll update this function later...
        // Check if the user has entered both fields correctly


        if (isEmailVaid && isPasswordValid) {

            const loginModel = {
                email,
                password
            }

            //client request
            axios
                .post(
                    loginURL,
                    loginModel
                )
                .then((res) => {

                    if (res.data.token != null) {
                        Swal.fire({
                            title: "Login Success!",
                            icon: "success"
                        });
                        sessionStorage.setItem('credential', JSON.stringify(res.data));
                        navigate('/users');
                    } else {
                        Swal.fire({
                            title: "Validation failed!",
                            text: res.data.error,
                            icon: "warning"
                        });
                    }
                });

        }
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
            setEmailError('Please enter a valid email');
            setIsEmailValid(false);
            return
        } else {
            setEmailError(null);
            setIsEmailValid(true);
        }
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        if ('' === e.target.value) {
            setPasswordError('Please enter a password');
            setIsPasswordValid(false);
            return
        } else {
            setPasswordError(null);
            setIsPasswordValid(true);
        }

        if (e.target.value.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            setIsPasswordValid(false);
            return
        } else {
            setPasswordError(null);
            setIsPasswordValid(true);
        }
    }


    return (
        <div className="mainContainer-login p-5">
            <div className={'titleContainer'}>
                <div className="font-weight-bold">Login</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={onChangeEmail}
                    className="inputBox bg-white text-dark"
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={onChangePassword}
                    className="inputBox bg-white text-dark"
                    type="password"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                {isEmailVaid && isPasswordValid ? <button className={'inputButton'} type="button" onClick={onButtonClick}>Login</button>
                    : <button style={{ pointerEvents: 'none' }} className={'inputButton'} type="button" onClick={onButtonClick} disabled>Login</button>}
            </div>
            <span>Don't have an account?
                <a style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/registration')}> Register Here</a>
            </span>
        </div>
    )
}

export default Login