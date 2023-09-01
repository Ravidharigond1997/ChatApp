import React, {useState, useEffect} from 'react'
import styled from "styled-components"
import loader from "../assets/loader.gif"
import {Link, useNavigate}  from "react-router-dom"
import {ToastContainer,toast} from "react-toastify";
import axios from "axios"
import setAvatarRoute from "../utils/APIRoutes"
import "react-toastify/dist/ReactToastify.css"

function SetAvatar() {
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();

    const toastOptions ={
        position: "bottom-right",
        autoClose:true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

  return (
    <>
    <container>
       
    </container>
    <ToastContainer/>
    </>
  )
}

export default SetAvatar

const container = styled.div``