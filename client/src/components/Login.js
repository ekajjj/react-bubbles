import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const handleChange = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('login', login)
            .then(res => {
                console.log('POST response', res);
                localStorage.setItem('token', res.data.payload);
                props.history.push('/Bubbles');
            })
            .catch(err => {
                console.log(`Login error: ${err}`);
            });
    };
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='username'
                    name='username'
                    value={login.username}
                    label='Username'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='password'
                    name='password'
                    value={login.password}
                    label='Password'
                    onChange={handleChange}
                />
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;