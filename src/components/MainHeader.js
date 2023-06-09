import {useState, useEffect} from "react";
import styles from "../styles/MainHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import { authService } from "../mybase";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal.js";
// import Auth from "../routes/Auth.js";


function MainHeader({isLoggedIn, getSignUp, signUp}) {
    const navigate = useNavigate()

    // link를 styled-components로 꾸밈
    const StyledLink = styled(Link)`
        color : black;
        text-decoration: none;
        // link에 마우스 올릴 시 색깔 변경
        &:hover {
            color : 0d6efd;
        }
    `       
    
    const onLogOutClick = () => {
        authService.signOut();
        // logout시 home으로 돌아감.
        navigate("/");
    }

    return (
        <div className={`${styles.logOutButton} ${styles.main__header} ${styles.logNoli} `}>
            <ul>
                <li>
                <StyledLink to ="/"><FontAwesomeIcon icon={faFaceSmile} /></StyledLink>
                </li>
            </ul>
            <ul>
                <li>
                    <StyledLink to ="/review">Review</StyledLink>
                </li>
                <li>
                    <StyledLink to ="/about">About Us</StyledLink>
                </li>
                { isLoggedIn ? (
                    <>
                    {/* // login이 됐다면 Profile을 */}
                    <li className="logYesli">
                        <StyledLink to ="/profile">Profile</StyledLink>
                    </li>
                    <li>
                        <button onClick={onLogOutClick} style={{border:'none', backgroundColor:'white'}}>LogOut</button>
                    </li>
                    </>
                ) : (
                    // login이 안 됐다면 login을 하게
                    <li>
                       <StyledLink to ="/auth">LogIn/SignUp</StyledLink>
                    </li>
                )}

            </ul> 
        </div>
    )
}

export default MainHeader;