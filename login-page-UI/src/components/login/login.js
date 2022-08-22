import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './login.css';

const Login = ({ setLoginUser }) => {
    let history = useHistory();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value)
        setUser({
            ...user,
            [name]: value
        })
    }

    // console.log(user)

    const login = () => {
        axios.post("http://localhost:7000/api/login", user)
            .then(res => {
                // console.log(res),
                alert(res.data.message)
                setLoginUser(res.data.user)
                history.push('/')
            }
            );
    }
    return (
        <>

            <div className='login' >
                <h1>Login Page</h1>
                <input className='input' type='email' placeholder='Enter Your Email'
                    name="email" value={user.email}
                    onChange={handleChange}
                />
                <input type='password' placeholder="Enter your Password"
                    name="password" value={user.password}
                    onChange={handleChange}
                />
                <button className='btn'  onClick={login}>Login</button>
                <button className='btn' onClick={() => history.push("/register")}>Register</button>
                <button className='btn' onClick={()=> history.push("/forgot")}>Forgot Password</button>
            </div>
        </>
    )
}
export default Login
