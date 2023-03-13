import styles from "../styles/RouterWeb.module.css";
import { useEffect,useState } from "react";
import MainHeader from "./MainHeader.js";
import {Routes, Route} from "react-router-dom";
import Home from "../routes/Home.js";
import Review from "../routes/Review.js";
import About from "../routes/About.js";
import Profile from "../routes/Profile.js";
import Auth from "../routes/Auth.js";

function RouterWeb({isLoggedIn}) {
    // login/signUp을 하려고 사용자가 시도했는지 여부를 state에 저장
    const [signUp, setSignUp] = useState(false);
    const [checkSignUp, setCheckSignUp] = useState(false);

    // 하위 component에서 변경한 signUp state를 useEffect를 통해 즉시 반영
    useEffect(()=>{
        setSignUp(true);
    },[signUp])

    const getSignUp = (item) => {
        setSignUp(item);
        // console.log(signUp);
    }

    // 로그인 여부에 따라 들어갈 수 있는 경로를 다르게 함.
    return (
        <div className={styles.RouterWeb}>
            <MainHeader isLoggedIn={isLoggedIn} getSignUp={getSignUp} signUp={signUp}/>
            <Routes>
                <>
                    <Route path="/" element={<Home />}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/review" element={<Review/>}/>
                    {
                        isLoggedIn ? (
                            <Route path="/profile" element={<Profile/>}/>
                        ) : (
                            <Route path="/auth" element={<Auth/>}/>
                        )
                    }
                </>
            </Routes>
        </div>
    );  
}

export default RouterWeb;