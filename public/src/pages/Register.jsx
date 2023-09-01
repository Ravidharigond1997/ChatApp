import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import logo from "../assets/logo.svg"
import {Link}  from "react-router-dom"
import {ToastContainer,toast} from "react-toastify";
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"

import { registerRoute } from '../utils/APIRoutes';

function Register() {
    const [value, setValue] = useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
 
    const handleSubmit= async(e) => {
        e.preventDefault();
       if(handleValidation()){
        const {password, confirmPassword, username,email} = value; 
        const {data} = await axios.post(registerRoute,{
            username,
            email,
           password
        }) 
       }
    }

    const toastOptions ={
        position: "bottom-right",
        autoClose:true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

    const handleValidation = () => {
           const {password, confirmPassword, username,email} = value; 
           if(password !== confirmPassword ) {
                 toast.error("password and confirm password should be same.", toastOptions);
                 return false;
           }else if(username.length < 3){
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
           }else if(password.length <=  8){
            toast.error("Password should be greater than or equal to 8 characters", toastOptions);
            return false;
           }else if(email === ''){
            toast.error("Email is required", toastOptions);
            return false;
           }
           return true;
    } 

    const handleChange = (event) => {
         setValue({...value, [event.target.name]: event.target.value})
    }
  return (
    <>
    <FormContainer>
   <form onSubmit={handleSubmit}>
      <div className="brand">
        <img src={logo} alt="logoImage"/>
        <h1>snyppy</h1>
      </div>
      <input type="text" placeholder='Username' name="username" onChange ={e => handleChange(e)} />
      <input type="email" placeholder='Email' name="email" onChange ={e => handleChange(e)} />
      <input type="password" placeholder='Password' name="password" onChange ={e => handleChange(e)} />
      <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange ={e => handleChange(e)} />
      <button type="submit">Create User</button>
      <span>already have an account ? <Link to="/login">Login</Link></span>
    </form>
    </FormContainer>
    <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
width: 100vw;
height:100vh;
display: flex;
flex-direction:column;
align-items:center;
gap:1rem;
justify-content:center;
background-color: #131324;
form{
   margin:12px;
}
.brand{
   display:flex;
   align-items:center;
   justify-content:center;
   gap:1rem; 
   img{
    height:5rem;
    width:5rem;
   }
   h1{
    color:white;
    text-transform:uppercase;
   }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius: 0.4rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding:1rem;
        barder: 0.1rem solid #4e0eff; 
        border-radius: 0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
    button{
        padding: 1rem 2rem;
        text-transform:uppercase;
        border: none;
        border-radius: 0.4rem;
        background-color: #997af0;
        font-weight:bold;
        cursor:pointer;
        color:white;
        font-size:1rem;
        transistion:0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-transform:none;
            font-weight:bold;
            text-decoration:none;
        }
    }
}
`;
export default Register