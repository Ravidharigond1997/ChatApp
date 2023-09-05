import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const [value, setValue] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        const { password, username } = value;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        if (data && data.success === true) {
          toast.success(data.message, toastOptions);
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        } else {
          toast.error(data.message, toastOptions);
        }
      }
    } catch (error) {
      toast.error("Something went wrong", toastOptions);
    }
  };

  const handleValidation = () => {
    const { password, username } = value;
    if (password === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="logoImage" />
            <h1>snyppy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min=""
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">LogIn</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  background-color: #131324;
  form {
    margin: 12px;
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 5rem;
      width: 5rem;
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
    background-color: #00000076;
    border-radius: 0.4rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      barder: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      padding: 1rem 2rem;
      text-transform: uppercase;
      border: none;
      border-radius: 0.4rem;
      background-color: #997af0;
      font-weight: bold;
      cursor: pointer;
      color: white;
      font-size: 1rem;
      transistion: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-transform: none;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;
export default Login;
