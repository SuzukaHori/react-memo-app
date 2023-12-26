export default function List({ memos, onClick }) {
  return (
    <ul>
      {memos
        .sort((a, b) => a.id - b.id)
        .map((memo) => (
          <li key={memo.id}>
            <button
              type="button"
              onClick={() => onClick(memo)}
              id="show-button"
            >
              {memo.title}
            </button>
          </li>
        ))}
    </ul>
  );
}
