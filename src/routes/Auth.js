import {useState} from "react";
import SignUpModal from "../components/SignUpModal";
import styles from "../styles/Auth.module.css";
import { authService } from "../mybase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontawesome을 사용할 땐 solid인지, regular인지 등을 잘 확인해야함.
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

function Auth() {
    // 모달창을 여기다가 옮기고..
    // 사이트 회원가입이 필요한 경우에는 모달창을
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        else if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault(); 
        try{
           // LogIn for existing user
           await signInWithEmailAndPassword(authService, email, password);
        }
        catch(error) {
            alert(error.message);
        }
    }

    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name==="google") {
            provider = new GoogleAuthProvider();
        }
        else if(name==="github") {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
    }

    const onClickSingUp = () => {
        setShowSignUp(true);
    }

    // 하위 component에서 반영된 영향이 부모 component에도 영향을 미침
    const getShowSignUpForm = (item) => {
        setShowSignUp(item);
    }

    return (
        <div className={styles.loginClass}>
            <div className={styles.loginBody}>
                <div className={styles.headerText}>
                    <h4>LogIn</h4>
                </div>
                <div className={styles.loginForm}>
                    <form onSubmit={onSubmit}>
                        <div className={styles.loginFormInput}>
                            <div>
                                <span className={styles.search__icons}><FontAwesomeIcon icon={faUser} /></span>
                                <input 
                                    type="email" 
                                    onChange={onChange} 
                                    value = {email} 
                                    placeholder='email'
                                    name="email"
                                />
                            </div>
                            <div>
                                <span className={styles.password__icons}><FontAwesomeIcon icon={faLock} /></span>
                                <input 
                                    type="password" 
                                    onChange={onChange} 
                                    value = {password} 
                                    placeholder='password' 
                                    name="password"
                                />
                            </div>
                        </div>
                        <div className={styles.loginButton}>
                        {/* 로그인 버튼 누를 시 signIn */}
                        <input type="submit" value="logIn"/>
                        </div>
                    </form>
                    <div className={styles.loginContinue}>
                        <div>
                            <button name="google" onClick={onSocialClick} style={{backgroundColor:'white'}}>
                                <span className={styles.googleIcon}>
                                    <FontAwesomeIcon icon={faGoogle}/>
                                </span>
                                Continue with Google
                            </button>
                        </div>
                        <div>
                            <button name="github" onClick={onSocialClick} style={{backgroundColor:'black', color:'white'}}>
                                <span className={styles.githubIcon}>
                                    <FontAwesomeIcon icon={faGithub}/>
                                </span>
                                Continue with Github
                            </button>
                        </div>
                    </div>
                    {/* 수정요망 */}
                    <div style={{paddingTop : '15px', paddingLeft : '22px'}}>
                        {/* 회원가입을 위한 모달창을 띄울까? => 모달창이 괜찮을듯 */}
                        <span className={styles.signUpText} onClick={onClickSingUp}>If you are not a user...</span>
                    </div>
                </div>
            </div>
            {
                (showSignUp && <SignUpModal showSignUp={showSignUp} getShowSignUpForm={getShowSignUpForm}/>)
            }
        </div>
    );
}

export default Auth;