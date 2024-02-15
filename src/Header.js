import { useLoginUser } from "./useLoginUser";

export default function Header({ onAuthenticate }) {
  const currentUser = useLoginUser();
  return (
    <header>
      {currentUser ? "ログイン済み" : "未ログイン"}
      <button onClick={onAuthenticate} id="login-button">
        {currentUser ? "ログアウト" : "ログイン"}
      </button>
    </header>
  );
}
