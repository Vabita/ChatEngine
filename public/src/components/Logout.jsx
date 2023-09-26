import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa'

function Logout() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <Button onClick={handleClick} >
                <FaPowerOff />
            </Button>
        </>
    )
}
const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 0.5rem;
    background-color: #9a9a9a;
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

export default Logout;