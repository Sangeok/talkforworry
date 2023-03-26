import React, { useEffect, useState } from 'react';
import { authService } from '../mybase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from "../styles/SignUpModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontawesome을 사용할 땐 solid인지, regular인지 등을 잘 확인해야함.
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import {createUserWithEmailAndPassword, getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function SignUpModal({showSignUp,getShowSignUpForm}) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [OTP, setOTP] = useState("");
    // 휴대폰 인증을 수행했는지 여부를 확인
    const [checkPhone, setCheckPhone] = useState(false);
    const [password, setPassword] = useState("");

    const auth = getAuth();
    // 인증 메세지를 kor로 설정
    auth.languageCode = 'ko';

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
            }
          }, auth);
    }

    // Modal 창의 닫기 버튼 누를 시, 부모의 showLoginForm을 false로, show state를 false로 바꿈
    const setShowLoginForm = () => {
        getShowSignUpForm(false);
        setShow(false);
    }

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        }
        else if(name === "password") {
            setPassword(value);
        }
        else if(name == "phoneNumber") {
            setPhoneNumber(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault(); 
        let data;
        try{
            // Create new Account
            data = await createUserWithEmailAndPassword(auth, email, password);
            console.log(data);
        }
        catch(error) {
            alert(error.message);
        }
    }

    const onSubmitPhoneNumber = async (event) => {
        event.preventDefault();
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, "+82"+phoneNumber, appVerifier)
            .then((confirmationResult) => {
        //     // SMS sent. Prompt user to type the code from the message, then sign the
        //     // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
        //     // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
        });
    }

    const verifyOTP = (e) => {
        let otp = e.target.value;
        setOTP(otp);
        console.log(otp);
        if(otp.length === 6) {
            console.log(otp);
            // verify otp
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                console.log(user);
                // ...
              }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                // ...
              });
        }
    }

    useEffect(()=> {
        if(showSignUp) {
            setShow(true);
        }
        else setShow(false);
    },[]);


    return (
        <>  
            <Modal className={styles.showModal} show={show} onHide={setShowLoginForm}>
                <Modal.Header>
                    <Modal.Title>SignUp</Modal.Title>
                </Modal.Header>
                    <div className={styles.loginForm}>
                        <Modal.Body>
                                <div className={styles.email__form}>
                                    <span className={styles.search__icons}><FontAwesomeIcon icon={faUser} /></span>
                                    <input 
                                        type="email" 
                                        onChange={onChange} 
                                        value = {email} 
                                        placeholder='email'
                                        name="email"
                                    />
                                </div>
                                <div className={styles.password__form}> 
                                    <span className={styles.password__icons}><FontAwesomeIcon icon={faLock} /></span>
                                    <input 
                                        type="password" 
                                        onChange={onChange} 
                                        value = {password} 
                                        placeholder='password' 
                                        name="password"
                                    />
                                </div>
                                <form onSubmit={onSubmitPhoneNumber}>
                                    <div className={styles.phoneNumber__form}>
                                        <span>icon</span>
                                        <input
                                            type="text"
                                            onChange={onChange}
                                            value={phoneNumber}
                                            placeholder='phoneNumber'
                                            name="phoneNumber"
                                        />
                                    </div>
                                    <input type="submit" value="Sending Certification Number"/>
                                    <div className={styles.certification__form}>
                                        <span>icon</span>
                                        <input 
                                            type="text"
                                            onChange={verifyOTP}
                                            value={OTP}
                                            placeholder='OTP Number'
                                            name="OTP"
                                        />
                                        </div>
                                </form>
                        </Modal.Body>
                        <form onSubmit={onSubmit}>
                            <Modal.Footer>
                                <div className={styles.loginButton}>
                                    {/* 만약 checkPhone이 false면 Create Account 클릭 안되게. */}
                                    <input disabled={checkPhone} type="submit" value="Create Account"/>
                                </div>
                            </Modal.Footer>
                        </form>
                        {/* 보이지 않는 reCAPTCHA 사용 */}
                        <div id='recaptcha-container'></div>
                    </div>
            </Modal>
        </>
    );
}

export default SignUpModal;