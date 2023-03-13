import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

function LoginModal({showLoginForm, getshowLoginForm}) {

    const [show, setShow] = useState(false);
    const [observerShow, setObserverShow] = useState(false);

    // Modal 창의 닫기 버튼 누를 시, 부모의 showLoginForm을 false로, show state를 false로 바꿈
    const setShowLoginForm = () => {
        getshowLoginForm(false);
        setShow(false);
    }
    
    // const handleClose = () => {
    //     setShow(false);
    //     console.log("show : " + show);
    // }
    // const handleShow = () => setShow(true);

    // showLoginForm이 true라면 Modal창 띄워주고 아니면 말아(첫 렌더링만 시행)
    useEffect(()=>{
        if(showLoginForm) {
            setShow(true)
        }
        else setShow(false);
    },[showLoginForm])

    return(
        <div>
            {/* <Button className="btn" variant="outline-primary" onClick={handleShow}>outline-primary</Button> */}

            <Modal show={show} onClick={setShowLoginForm}>
                <Modal.Header>
                    <Modal.Title>버튼</Modal.Title>
                </Modal.Header>
                <Modal.Body>데이터</Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={setShowLoginForm}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default LoginModal;