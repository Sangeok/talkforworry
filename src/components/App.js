import {useEffect, useState} from "react";
import RouterWeb from "./RouterWeb";
import styles from "../styles/App.module.css";
import { authService } from "../mybase";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  // 사용자의 로그인 상태 변경을 감시
  useEffect(()=> {
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setisLoggedIn(true);
      }
      else {
        setisLoggedIn(false);
      }
    })
  })
  return (
    <div className={styles.App}>
      <RouterWeb isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
