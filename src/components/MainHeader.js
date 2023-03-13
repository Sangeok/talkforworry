import styles from "../styles/MainHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import styled from 'styled-components';


function MainHeader({isLoggedIn}) {
    // link를 styled-components로 꾸밈
    const StyledLink = styled(Link)`
        color : black;
        text-decoration: none;
    `
    return (
        <div className={styles.main__header}>
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
                    // login이 됐다면 Profile을
                    <li className="logYesli">
                        <StyledLink to ="/profile">Profile</StyledLink>
                    </li>
                ) : (
                    // login이 안 됐다면 login을 하게
                    <li className="logNoli">
                        <StyledLink to ="/auth">LogIn/SignUp</StyledLink>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default MainHeader;