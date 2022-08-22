import axios from "axios";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "../register/register";

const Varify = () => {
  const history = useHistory();
  const otpRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  //   console.log("otpRef", otpRef);

  const otpVarify = () => {
    const otp = otpRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    let user = {
      otp,
      email,
      password,
    };
    // console.log('otp',otp)
    axios
      .post("http://localhost:7000/api/forget-password", user)
      .then((res) => {
        // console.log(res.data.done);

        alert(res.data.message);
        let done = res.data.done;
        if (!done) {
          history.push("/forgot");
        } else {
          history.push("/login");
        }
      });
  };

  return (
    <>
      <div className="register">
        <h1>Enter OTP</h1>
        <input placeholder="Email" name="email" ref={emailRef} />
        <input placeholder="Enter-Otp" name="otp" ref={otpRef} />
        <input placeholder="Enter-new-Password" name="new-pass" ref={passRef} />
        <button className="btn" onClick={otpVarify}>
          Varify
        </button>
      </div>
    </>
  );
};

export default Varify;
