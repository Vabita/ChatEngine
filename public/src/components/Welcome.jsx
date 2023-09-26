import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa'

function Welcome() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate('/');
}

  useEffect(() => {
    const checkLocalStorage = () => {
      try {
        const user = localStorage.getItem('chat-app-user');
        if (!user) {
          navigate('/login');
        } else {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error('Error accessing local storage:', error);
      }
    };

    checkLocalStorage();
  }, [navigate]);

  return (
    <Container>
        <Button onClick={handleClick} >
                <FaPowerOff />
        </Button>
      <img src={Robot} alt="Welcome" />
      <h1>
        Welcome, <span>{currentUser ? currentUser.username : ''}</span>
      </h1>
      <h3>Let's select the chat to whom you want to chat!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

const Button = styled.button`
    display: flex;
    justify-content: space-between;
    margin-left: 780px;
    align-items: center;
    margin-top: 8px;
    padding: 0.3rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    :hover{
        background-color: #8d77f2;
    }
    svg{
        font-size:1.3rem;
        color: #ebe7ff;
    }
`;

export default Welcome;
