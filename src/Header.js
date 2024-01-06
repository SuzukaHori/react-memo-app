import { useContext } from "react";
import { LoginUserContext } from "./LoginUserContext";

export default function Header({ onLogin }) {
  const currentUser = useContext(LoginUserContext);
  return (
    <header>
      {currentUser ? "ログイン済み" : "未ログイン"}
      <button onClick={onLogin} id="login-button">
        {currentUser ? "ログアウト" : "ログイン"}
      </button>
    </header>
  );
}
