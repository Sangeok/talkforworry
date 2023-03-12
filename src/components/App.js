import {useEffect, useState} from "react";
import RouterWeb from "./RouterWeb";
import styles from "../styles/App.module.css";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <div className={styles.App}>
      <RouterWeb isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
