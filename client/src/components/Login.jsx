import {Link} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
    const [ email, setEmail ] = useState();
    const [ password, setPassword] = useState();
    const [ isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) =>{
      e.preventDefault();
      const data = {
        email,
        password
      }
      const response  = await axios.post('http://localhost:4000/login',data);
      //save the cookie
      if(response.status === 200){
        console.log(response.status)
        setIsRedirecting(true);
      }
    }

    if(isRedirecting){
      navigate("/");
    }
  return (
    <div className='container-center' style={{background:'#B0DAFF'}}>
    <div className='box-container'>
      <h3 style={{fontSize:'1.7rem' , textAlign:'center'}}>Login</h3>

      <form className='box' onSubmit={submitHandler}>
        <input placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
      </form>

      <div>
        <p>Don't have an account. Click <Link to="/register">here</Link> to Register</p>
      </div>
    </div>
    </div>
   
  );
};

export default Login;
