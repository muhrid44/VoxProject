import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

const baseURL = process.env.API_BASE_URL.replace(/\/+$/, '');
const registerURL = baseURL.endsWith('/') ? `${baseURL}api/v1/auth/register` : `${baseURL}/api/v1/auth/register`;


const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")


    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [repeatedPasswordError, setRepeatedPasswordError] = useState("")


    const [isFirstNameValid, setIsFirstNameValid] = useState(false);
    const [isLastNameValid, setIsLastNameValid] = useState(false);
    const [isEmailVaid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState(false);


    const navigate = useNavigate();


    const onButtonClick = () => {
        // You'll update this function later...
        // Check if the user has entered both fields correctly


        if (isEmailVaid && isPasswordValid) {
            const registerModel = {
                firstName,
                lastName,
                email,
                password,
                repeatPassword: repeatedPassword
            }

            //client request
            axios
                .post(
                    registerURL,
                    registerModel
                )
                .then((res) => {
                    var { message } = res.data;
                    let responseData = JSON.parse(message);
                    let errorMessage = '';
                    if (res.data.statusCode == 200) {
                        Swal.fire({
                            title: "Registration Complete!",
                            text: "You will be directed to Login page :)",
                            icon: "success"
                        });
                        navigate('/login');
                    } else {
                        if (responseData.errors['password'] == undefined) {
                            errorMessage = responseData.errors['email'][0];
                        } else if (responseData.errors['email'] == undefined) {
                            errorMessage = responseData.errors['password'][0];
                        } else {
                            errorMessage = responseData.errors['email'][0];
                        }
                        Swal.fire({
                            title: "Validation failed!",
                            text: errorMessage,
                            icon: "warning"
                        });
                    }
                });

            //redirect
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

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
        if (e.target.value.length < 1) {
            setFirstNameError('Please insert your First Name');
            setIsFirstNameValid(false);
            return
        } else {
            setFirstNameError(null);
            setIsFirstNameValid(true);
        }
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value)
        if (e.target.value.length < 1) {
            setLastNameError('Please insert your Last Name');
            setIsLastNameValid(false);
            return
        } else {
            setLastNameError(null);
            setIsLastNameValid(true);
        }
    }

    const onChangeRepeatedPassword = (e) => {
        setRepeatedPassword(e.target.value);
        if (e.target.value != password) {
            setRepeatedPasswordError('Your password is not match');
            setIsRepeatedPasswordValid(false);
            return
        } else {
            setRepeatedPasswordError(null);
            setIsRepeatedPasswordValid(true);
        }
    }

    return (
        <div className="mainContainer-login p-5">
            <div className={'titleContainer'}>
                <div className="font-weight-bold">Register</div>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={firstName}
                    placeholder="First Name"
                    onChange={onChangeFirstName}
                    className="inputBox bg-white text-dark"
                />
                <label className="errorLabel">{firstNameError}</label>
            </div>
            <br />
            <div className="inputContainer">
                <input
                    value={lastName}
                    placeholder="Last Name"
                    onChange={onChangeLastName}
                    className="inputBox bg-white text-dark"
                />
                <label className="errorLabel">{lastNameError}</label>
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
                <input
                    value={repeatedPassword}
                    placeholder="Repeat your password here"
                    onChange={onChangeRepeatedPassword}
                    className="inputBox bg-white text-dark"
                    type="password"
                />
                <label className="errorLabel">{repeatedPasswordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                {isEmailVaid && isPasswordValid && isFirstNameValid && isLastNameValid && isRepeatedPasswordValid ? <button className={'inputButton'} type="button" onClick={onButtonClick}>Register</button>
                    : <button style={{ pointerEvents: 'none' }} className={'inputButton'} type="button" onClick={onButtonClick} disabled>Register</button>}
            </div>
        </div>
    )

}

export default Registration;