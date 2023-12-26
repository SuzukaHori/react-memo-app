import { useState } from "react";

export default function Editor({ memos, id, isAddMode, onEdit }) {
  let memo;
  if (isAddMode) {
    memo = { id: id, title: `新規メモ${id + 1}`, content: "" };
  } else {
    memo = memos.find((memo) => memo.id === id);
  }

  const [text, setText] = useState(memo.title + "\n" + memo.content);
  const filteredMemos = memos.filter((m) => m.id !== memo.id);

  function handleSubmit(event) {
    event.preventDefault();
    const title = text.split(/\n/)[0];
    const content = text.split(/\n/).slice(1).join("\n");
    const editedMemo = { id: memo.id, title: title, content: content };
    onEdit([...filteredMemos, editedMemo]);
  }

  return (
    <div className="editor-wrapper">
      <form onSubmit={(event) => handleSubmit(event)}>
        <textarea
          id="edit-form"
          value={text}
          onChange={(event) => setText(event.target.value)}
        ></textarea>
        <div className="editor-button-wrapper">
          <button type="submit" id="edit-button">
            編集
          </button>
          <button
            type="button"
            id="delete-button"
            onClick={() => onEdit(filteredMemos)}
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
}
