import { useState } from "react";

export default function Editor({ originalMemo, id, onEdit, onDelete }) {
  if (originalMemo === null) {
    originalMemo = { id: id, title: `新規メモ${id + 1}`, content: "" };
  }

  const [text, setText] = useState(
    originalMemo.title + "\n" + originalMemo.content
  );

  function handleSubmit(event) {
    event.preventDefault();
    const title = text.split(/\n/)[0];
    const content = text.split(/\n/).slice(1).join("\n");
    const editedMemo = { ...originalMemo, title, content };
    onEdit(editedMemo);
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
            onClick={() => onDelete(originalMemo.id)}
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
}
