import {useState} from "react";
import LoginModal from "../components/LoginModal.js";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <LoginModal/>
            <form onSubmit={onSubmit}>
                <input 
                    name="email" 
                    type="email"
                    placeholder="Email"

                    required
                />
                <input 
                    name="password"
                    type="password"
                    placeholder="Password"

                    required
                />
                <input type="submit" value="logIn"/>
            </form>
        </>
    );
}

export default Auth;