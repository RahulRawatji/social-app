import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    const response = await axios.post("http://localhost:4000/register",data);
  };

  return (
    <div className="container-center" style={{ background: "#B0DAFF" }}>
      <div className="box-container">
        <h3 style={{ fontSize: "1.7rem", textAlign: "center" }}>Register</h3>
        <form className="box" onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <div>
          <p>
            Already have an account. Click <Link to="/login">here</Link> to
            Login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
