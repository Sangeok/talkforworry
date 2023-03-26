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

    // 로그인 여부에 따라 들어갈 수 있는 경로를 다르게 함.
    return (
        <div className={styles.RouterWeb}>
            <MainHeader isLoggedIn={isLoggedIn}/>
            <Routes>
                <>
                    <Route path="/" element={<Home />}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/review" element={<Review/>}/>
                    {
                        isLoggedIn ? (
                            <Route path="/profile" element={<Profile/>}/>
                        ) : (
                            <>
                                <Route path="/auth" element={<Auth/>}/>
                            </>
                        )
                    }
                </>
            </Routes>
        </div>
    );  
}

export default RouterWeb;