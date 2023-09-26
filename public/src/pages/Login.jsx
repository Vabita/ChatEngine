import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo1.svg';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("Inside validation");
      const { password, username } = values;
      //sending post request to the register route URL with these paramenter to the backend server
      const { data } = await axios.post(loginRoute, {
        username,
        password
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        //if everything is ok then navigate to the login page
        navigate('/')
      }
    }
  };
  const handleChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "dark"
  }

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate('/');
    }
  })

  const handleValidation = (event) => {
    const { password, username } = values;
    console.log(password);
    if (username.length === "") {
      toast.error("Username and password is required",
        toastOption);
    } else if (password.length === "") {
      toast.error("Username and password is required",
        toastOption);
      return false;
    } return true;
  }



  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => { handleSubmit(event) }}>
          <div className="brand">
            <img src={Logo} alt="Logo" style={{ height: "5rem" }} />
            <h1>Let's Talk</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={e => { handleChange(e) }} min="3"/>
          <input type="password" placeholder='Password' name='password' onChange={e => { handleChange(e) }} />
          <button type='submit'>Login</button>
          <span>Don't have an account? <Link to="/register"> Register</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #2c812c;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #105810;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #014101;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    ::placeholder {
      color: #ccc8c8;
      opacity: 1; 
    }
    &:focus {
      border: 0.1rem solid #0d7e0d;
      outline: none;
    }
  }
  button {
    background-color: #5e0f0f;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #782222;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #0762ff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;

