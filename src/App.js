import "./App.css";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import List from "./List";
import Header from "./Header";
import { LoginUserProvider } from "./useLoginUser";

function App() {
  const [memos, setMemos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const memosData = localStorage.getItem("memos");
    if (memosData) {
      setMemos(JSON.parse(memosData));
    } else {
      localStorage.setItem("memos", JSON.stringify([]));
      setMemos([]);
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
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

  function handleAuthenticate() {
    const nextUser = currentUser ? null : "user1";
    setCurrentUser(nextUser);
    localStorage.setItem("user", JSON.stringify(nextUser));
  }

  return (
    <div className="App">
      <LoginUserProvider value={currentUser}>
        <Header onAuthenticate={handleAuthenticate} />
        <div className="container">
          <div className="memos-wrapper">
            <List
              memos={memos}
              onClick={(memo) =>
                setActiveId(activeId === memo.id ? null : memo.id)
              }
            />
            {currentUser && (
              <button onClick={handleClick} id="change-add-mode-button">
                +
              </button>
            )}
          </div>
          {activeId !== null && (
            <Editor
              originalMemo={
                isAddMode ? null : memos.find((memo) => memo.id === activeId)
              }
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
        </div>
      </LoginUserProvider>
    </div>
  );
}

export default App;
