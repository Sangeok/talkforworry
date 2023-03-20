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
import {createUserWithEmailAndPassword} from "firebase/auth";

function SignUpModal({showSignUp,getShowSignUpForm}) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    }

    const onSubmit = async (event) => {
        event.preventDefault(); 
        let data;
        try{
            // Create new Account
            data = await createUserWithEmailAndPassword(authService, email, password);
        }
        catch(error) {
            alert(error.message);
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

            <Modal show={show} onHide={setShowLoginForm}>
                <Modal.Header closeButton>
                    <Modal.Title>SignUp</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.loginForm}>
                        <form onSubmit={onSubmit}>
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
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.loginButton}>
                        <Button className="btn_close" onClick={setShowLoginForm}>
                            SignUp
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SignUpModal;