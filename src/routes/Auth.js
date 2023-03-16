import {useState} from "react";
import styles from "../styles/Auth.module.css";
import { authService } from "../mybase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontawesome을 사용할 땐 solid인지, regular인지 등을 잘 확인해야함.
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {
    // 모달창을 여기다가 옮기고..
    // 사이트 회원가입이 필요한 경우에는 모달창을
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState("");

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        else if(name === "password") {
            setPassword(value);
        }
    }

    // 수정필요(현재 Auth component는 login만 가능)
    const onSubmit = async (event) => {
        event.preventDefault(); 
        let data;
        try{
            if(newAccount) {
                // Create new Account
                data = await createUserWithEmailAndPassword(authService, email, password);
            }
            else {
                // LogIn for existing user
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        }
        catch(error) {
            alert(error.message);
        }

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
                        <input type="submit" value="logIn"/>
                        </div>
                    </form>
                    <div className={styles.loginContinue}>
                        <div>
                            <button name="google" style={{backgroundColor:'white'}}>
                                <span className={styles.googleIcon}>
                                    <FontAwesomeIcon icon={faGoogle}/>
                                </span>
                                Continue with Google
                            </button>
                        </div>
                        <div>
                            <button name="github" style={{backgroundColor:'black', color:'white'}}>
                                <span className={styles.githubIcon}>
                                    <FontAwesomeIcon icon={faGithub}/>
                                </span>
                                Continue with Github
                            </button>
                        </div>
                    </div>
                    {/* 수정요망 */}
                    <div style={{paddingTop : '15px', paddingLeft : '22px'}}>
                        <Link to='/auth'>If you are not a user...</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;