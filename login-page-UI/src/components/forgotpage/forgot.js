import axios from "axios";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

const Forgot = () => {
  const history = useHistory();
  const emailRef = useRef();

  const sendOtp = async () => {
    const email = emailRef.current.value;
    console.log(email);
    axios
      .post("http://localhost:7000/api/email-send", { email })
      .then((res) => {
        //   console.log(res);
        alert(res.data.message);
        history.push("/Varify");
      });
  };

  return (
    <>
      <div className="register">
        <h1>Reset Password</h1>
        <input
          placeholder="Please Enter your email"
          name="email"
          ref={emailRef}
        />
        <button className="btn" onClick={sendOtp}>
          Send OTP
        </button>
        <button className="btn">Back</button>
      </div>
    </>
  );
};

export default Forgot;
