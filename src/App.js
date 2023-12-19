import "./App.css";
import { useState } from "react";
import Editor from "./Editor.js";
import List from "./List.js";

localStorage.removeItem("memos");

function App() {
  const localData = localStorage.getItem("memos");
  let memoData;
  if (localData) {
    memoData = JSON.parse(localData);
  } else {
    memoData = [];
    localStorage.setItem("memos", memoData);
  }

  const [memos, setMemos] = useState(memoData);
  const [activeId, setActiveId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  const save = (memos) => {
    setMemos(memos);
    localStorage.setItem("memos", JSON.stringify(memos));
    setIsAddMode(false);
  };

  function handleClick() {
    let nextId;
    if (memos.length === 0) {
      nextId = 0;
    } else {
      const maxId = memos.map((memo) => memo.id).reduce((a, b) => Math.max(a, b), -Infinity);
      nextId = maxId + 1;
    }
    setActiveId(nextId);
    setIsAddMode(true);
  }

  return (
    <div className="App">
      <header>一覧</header>
      <div className="container">
        <List
          memos={memos}
          onClick={(memo) => {
            if (activeId === memo.id) {
              setActiveId(null);
            } else {
              setActiveId(memo.id);
              setIsAddMode(false);
            }
          }}
        />
        {activeId === null ? (
          <button onClick={handleClick} id="change-add-mode-button">
            +
          </button>
        ) : (
          <Editor
            memos={memos}
            id={activeId}
            key={activeId}
            addMode={isAddMode}
            onDelete={(deleteMemos) => {
              save(deleteMemos);
              setActiveId(null);
            }}
            onEdit={(editedMemos) => {
              save(editedMemos);
              setActiveId(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
