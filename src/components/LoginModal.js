import React, { useEffect, useState } from 'react';
import { authService } from '../mybase';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/LoginModal.module.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// fontawesome을 사용할 땐 solid인지, regular인지 등을 잘 확인해야함.
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { async } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function LoginModal({showLoginForm, getshowLoginForm}) {

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState("");
    // const auth = getAuth();

    // styled-components로 react-bootstrap의 modal창 꾸미기
    const ModalHeaderStyle = styled(Modal.Header)`
        // login 메세지 중앙 정렬
        margin : auto;
    `
    const ModalBodyStyle = styled(Modal.Body)`
        display : flex;
        margin : auto;
    `

    const ModalFooterStyle = styled(Modal.Footer)`
    `

    // Modal 창의 닫기 버튼 누를 시, 부모의 showLoginForm을 false로, show state를 false로 바꿈
    const setShowLoginForm = () => {
        getshowLoginForm(false);
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

    // showLoginForm이 true라면 Modal창 띄워주고 아니면 말아(첫 렌더링만 시행)
    useEffect(()=>{
        if(showLoginForm) {
            setShow(true)
        }
        else setShow(false);
    },[showLoginForm])

    return(
        <div>
            <Modal show={show} className={styles.loginMd}>
                <ModalHeaderStyle>
                    <Modal.Title>LogIn</Modal.Title>
                </ModalHeaderStyle>
                
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
                <Modal.Footer>
                    <div className={styles.loginButton}>
                        <Button className="btn_close" onClick={setShowLoginForm}>
                            login
                        </Button>
                        <Link to='/auth'><h6>If you are not a user...</h6></Link>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default LoginModal;