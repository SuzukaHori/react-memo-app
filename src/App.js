import "./App.css";
import { useState, useEffect } from "react";
import Editor from "./Editor";
import List from "./List";

function App() {
  const [memos, setMemos] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("memos");
    if (localData) {
      setMemos(JSON.parse(localData));
    } else {
      localStorage.setItem("memos", JSON.stringify([]));
      setMemos([]);
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
      <header>{activeId === null ? "一覧" : "編集"}</header>
      <div className="container">
        <div className="memos-wrapper">
          <List
            memos={memos}
            onClick={(memo) =>
              setActiveId(activeId === memo.id ? null : memo.id)
            }
          />
          <button onClick={handleClick} id="change-add-mode-button">
            +
          </button>
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
    </div>
  );
}

export default App;
