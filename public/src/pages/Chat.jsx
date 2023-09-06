import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../utils/APIRoutes";
import Contacts from "../components/Contacts.js";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("chat-app-user"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    async function findCurrentUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
    }
    findCurrentUser();
  }, []);

  async function getAllUsersData() {
    console.log(currentUser);
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${getAllUsers}/${currentUser._id}`);
        setContacts(data.users);
      } else {
        navigate("/setAvatar");
      }
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (max-width: 720px) and (min-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
