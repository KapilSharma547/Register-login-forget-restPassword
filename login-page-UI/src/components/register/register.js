import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./register.css";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value)
    setUser({
      ...user,
      [name]: value,
    });
  };
  // console.log(user)

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password === reEnterPassword) {
      // alert("Posted")
      axios
        .post("http://localhost:7000/api/register", user)

        .then((res) => {
          // console.log(res)
          // if (res.data.message === "User already registered") {
          //     history.push('/register')
          // } else {
          //     alert(res.data.message);
          //     history.push('/login')
          // }
          console.log(res.data);
          alert(res.data.message);
          history.push("/login");
        });
    } else {
      alert("Invalid Value");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        name="name"
        value={user.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Enter Your Email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Enter your Password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Re-enter your Password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        onChange={handleChange}
      />
      <button className="btn" onClick={register}>
        Register
      </button>
      <button className="btn" onClick={() => history.push("/login")}>
        Login
      </button>
    </div>
  );
};

export default Register;
