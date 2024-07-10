import { React, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const baseURL = process.env.API_BASE_URL.replace(/\/+$/, '');
const getUserById = `${baseURL}/api/v1/user/get-user-by-id`;
const deleteUserById = `${baseURL}/api/v1/user/delete-user-by-id`;


const Users = () => {

    const [userInformation, setUserInformation] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const [userCredential, setUserCredential] = useState({});




    useEffect(() => {
        initialGetUserById();
    }, []);

    const initialGetUserById = () => {
        var dataInitial = JSON.parse(sessionStorage.getItem('credential'));
        var getUserByIdURL = `${getUserById}?id=${dataInitial.id}`;
        setUserCredential(dataInitial);

        axios
            .get(
                getUserByIdURL, {
                    headers: {
                        'Authorization': `${dataInitial.token}`
                    }
                }           
            )
            .then((res) => {
                setUserInformation(res.data);
            });
    }

    const onClickEdit = () => {
        setIsEditMode(!isEditMode);
        alert("edit API not yet implemented");
    }

    const onClickSaveEdit = () => {
        setIsEditMode(!isEditMode);
    }

    const onChangeEditFirstName = (e) => {
        console.log(e.target.value)
    }

    const onChangeEditlastName = (e) => {
        console.log(e.target.value)
    }

    const onChangeEditEmail = (e) => {
        console.log(e.target.value)
    }

    const onClickDeleteById = () => {
        console.log(userInformation.id);
        Swal.fire({
            title: `Are you sure want to delete this user ${ userInformation.email }?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                var deleteUserByIdURL = `${deleteUserById}?id=${userInformation.id}`;

                axios
                    .delete(
                        deleteUserByIdURL, {
                            headers: {
                                'Authorization': `${userCredential.token}`
                        }
                    }
                    )
                    .then((res) => {
                        console.log(res);

                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success"
                        });
                        sessionStorage.removeItem('credential');
                        navigate('/home');
                    });

            }
        });
    }

    return (
        <div className="mainContainer-login p-5">
            <div className={'titleContainer'}>
                <div className="font-weight-bold">Hello {userInformation.firstName}</div>
            </div>
            <br />
            <div className="inputContainer">
                {isEditMode ? 
                    <input
                        onChange={onChangeEditFirstName}
                        className="inputBox bg-white text-dark"
                    />
                    : 
                    <input
                        value={userInformation.firstName}
                        className="inputBox"
                        disabled
                        style={{ backgroundColor: 'white' }}
                    />                
                }
            </div>
            <br />
            <div className={'inputContainer'}>
                {isEditMode ?
                    <input
                        onChange={onChangeEditlastName}
                        className="inputBox bg-white text-dark"
                    />
                    :
                    <input
                        value={userInformation.lastName}
                        className="inputBox"
                        disabled
                        style={{ backgroundColor: 'white' }}
                    />
                }
            </div>
            <br />
            <div className={'inputContainer'}>
                {isEditMode ?
                    <input
                        onChange={onChangeEditEmail}
                        className="inputBox bg-white text-dark"
                    />
                    :
                    <input
                        value={userInformation.email}
                        className="inputBox"
                        disabled
                        style={{ backgroundColor: 'white' }}
                    />
                }

            </div>
            <br />
            <div className={'inputContainer'} className="d-flex justify-content-between">
                {isEditMode ? <button className={'inputButton'} type="button" disabled>Edit</button> : <button className={'inputButton'} onClick={onClickEdit} type="button">Edit</button>}
                {isEditMode ? <button className={'inputButton'} type="button" onClick={onClickSaveEdit}>Save</button> : ''}
                <button className={'inputButton'} type="button" onClick={onClickDeleteById}>Delete</button>
            </div>
        </div>
    );
}

export default Users;