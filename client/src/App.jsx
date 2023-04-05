import { Link, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
/// Setting gobal credentials to true to accept and send cookies
axios.defaults.withCredentials = true;

function App() {
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();

  const checkIfLoggedIn = async() =>{
    const response = await axios.get("http://localhost:4000/userProfile");
    if(!response.data.email){
      return navigate("/login");
    }
    setUserEmail(response.data.email);
  };

  useEffect(()=>{
    checkIfLoggedIn();
  },[]);

  const logOutHandler = async() =>{
    const response = await axios.post("http://localhost:4000/logout");
    setUserEmail();
  }

  if(!userEmail){
    return navigate("/login");
  }

  return (
    <div className="App">
      <header>
        <h3><Link to={"/"}>My Blog</Link></h3>
        <ul className="nav-list">
          {userEmail && (<>
            <Link to={"/createPost"}>Create Post</Link>
            <li>{userEmail}</li>
            <li onClick={logOutHandler}>LogOut</li>
          </>)}
          {
            !userEmail && (<>
             <Link to="/login" className="nav-item">Login</Link>
          <Link to="/register" className="nav-item">Register</Link>
            </>)
          }
         
        </ul>
      </header>
      <Outlet/>
      
    </div>
  );
}

export default App;
