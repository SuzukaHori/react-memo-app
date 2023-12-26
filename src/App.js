import "./App.css";
import { useState, useEffect } from "react";
import Editor from "./Editor.js";
import List from "./List.js";

// localStorage.removeItem("memos");

function App() {
  const [memos, setMemos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("memos");
    if (localData) {
      setMemos(JSON.parse(localData));
    } else {
      localStorage.setItem("memos", []);
      setMemos([]);
    }
  }, []);

  function save(memos) {
    setMemos(memos);
    localStorage.setItem("memos", JSON.stringify(memos));
    setIsAddMode(false);
    setActiveId(null);
  }

  function handleClick() {
    let nextId;
    if (memos.length === 0) {
      nextId = 0;
    } else {
      const maxId = memos
        .map((memo) => memo.id)
        .reduce((a, b) => Math.max(a, b), -Infinity);
      nextId = maxId + 1;
    }
    setActiveId(nextId);
    setIsAddMode(true);
  }

  return (
    <div className="App">
      <header>{activeId === null ? "一覧" : "編集"}</header>
      <div className="container">
        <div className="memos-wrapper">
          <List
            memos={memos}
            onClick={(memo) =>
              activeId === memo.id ? setActiveId(null) : setActiveId(memo.id)
            }
          />
          <button onClick={handleClick} id="change-add-mode-button">
            +
          </button>
        </div>
        {activeId !== null && (
          <Editor
            memos={memos}
            id={activeId}
            key={activeId}
            isAddMode={isAddMode}
            onEdit={(memos) => save(memos)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
