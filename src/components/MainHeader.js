import {useState, useEffect} from "react";
import styles from "../styles/MainHeader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import LoginModal from "../components/LoginModal.js";


function MainHeader({isLoggedIn, getSignUp, signUp}) {
    const [showLoginForm, setShowLoginForm] = useState(false);

    // link를 styled-components로 꾸밈
    const StyledLink = styled(Link)`
        color : black;
        text-decoration: none;
        // link에 마우스 올릴 시 색깔 변경
        &:hover {
            color : 0d6efd;
        }
    `        
    // LogIn/SignUp 누를 시 부모의 state인 signUp이 true로 바뀜.
    const setSignUp = () => {
        getSignUp(true);
        // loginForm을 보여줌(문제 : LoginModal에 전송되는 showLoginForm은 계속 true.)
        setShowLoginForm(true);
    }

    // 하위 component에서 반영된 영향이 부모 component에도 영향을 미침
    const getshowLoginForm = (item) => {
        setShowLoginForm(item);
        // console.log(signUp);
    }

    return (
        <div className={`${styles.main__header} ${styles.logNoli} `}>
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
                    // login이 안 됐다면 login을 하게                         style={{cursor: 'pointer'}}
                    <li 
                        onClick={setSignUp}
                        
                        >
                       <span className="logNoli">LogIn/SignUp</span>
                    </li>
                )}

                {
                    (showLoginForm && <LoginModal showLoginForm={showLoginForm} getshowLoginForm={getshowLoginForm}/>)
                }
            </ul> 
        </div>
    )
}

export default MainHeader;