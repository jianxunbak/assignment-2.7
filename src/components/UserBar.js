import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./UserBar.module.css";

function UserBar() {
  const userCtx = useContext(UserContext);
  const {
    credentials,
    handleCredentialsChange,
    handleLogin,
    handleUserLogin,
    isLogin,
  } = userCtx;

  const login = (
    <>
      <label htmlFor="username">username</label>
      <input
        name="username"
        value={credentials.username}
        onChange={handleCredentialsChange}
      />
      <label>password</label>
      <input
        name="password"
        value={credentials.password}
        onChange={handleCredentialsChange}
        type="password"
      />
    </>
  );

  return (
    <div className={styles.userBarContainer}>
      <form className={styles.userBarForm} onSubmit={handleLogin}>
        {isLogin ? "welcome" : login}
        <button onClick={handleUserLogin}>
          {isLogin ? "logout" : "login"}
        </button>
      </form>
    </div>
  );
}

export default UserBar;
