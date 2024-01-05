import "./App.css";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import List from "./List";
import { LoginContext } from "./LoginContext";

function App() {
  const [memos, setMemos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("memos");
    if (localData) {
      setMemos(JSON.parse(localData));
    } else {
      localStorage.setItem("memos", JSON.stringify([]));
      setMemos([]);
    }
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("login");
    console.log(localStorage);
    if (localData) {
      const state = localStorage.getItem("login");
      setLogin(JSON.parse(state));
    } else {
      localStorage.setItem("login", JSON.stringify(false));
    }
  }, []);

  function save(memos) {
    setMemos(memos.sort((a, b) => a.id - b.id));
    localStorage.setItem("memos", JSON.stringify(memos));
    setIsAddMode(false);
    setActiveId(null);
  }

  function handleClick() {
    let nextId;
    if (memos.length === 0) {
      nextId = 0;
    } else {
      const ids = memos.map((memo) => memo.id);
      const maxId = Math.max(...ids);
      nextId = maxId + 1;
    }
    setActiveId(nextId);
    setIsAddMode(true);
  }

  return (
    <div className="App">
      {login ? "ログイン済み" : "未ログイン"}
      <header>{activeId === null ? "一覧" : "編集"}</header>
      <button
        onClick={() => {
          setLogin(!login);
          localStorage.setItem("login", JSON.stringify(!login));
        }}
      >
        {login ? "ログアウト" : "ログイン"}
      </button>
      <div className="container">
        <LoginContext.Provider value={login}>
          <div className="memos-wrapper">
            <List memos={memos} onClick={(memo) => setActiveId(activeId === memo.id ? null : memo.id)} />
            {login && (
              <button onClick={handleClick} id="change-add-mode-button">
                +
              </button>
            )}
          </div>
          {activeId !== null && (
            <Editor
              originalMemo={isAddMode ? null : memos.find((memo) => memo.id === activeId)}
              id={activeId}
              key={activeId}
              isAddMode={isAddMode}
              onEdit={(memo) => {
                const filteredMemos = memos.filter((m) => m.id !== memo.id);
                save([...filteredMemos, memo]);
              }}
              onDelete={(id) => save(memos.filter((m) => m.id !== id))}
            />
          )}
        </LoginContext.Provider>
      </div>
    </div>
  );
}

export default App;
