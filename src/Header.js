import { useLoginUser } from "./useLoginUser";

export default function Header({ onLogin }) {
  const currentUser = useLoginUser();
  return (
    <header>
      {currentUser ? "ログイン済み" : "未ログイン"}
      <button onClick={onLogin} id="login-button">
        {currentUser ? "ログアウト" : "ログイン"}
      </button>
    </header>
  );
}
