export default function List({ memos, onClick }) {
  return (
    <div className="memos-wrapper">
      <ul>
        {memos
          .sort((a, b) => a.id - b.id)
          .map((memo) => (
            <li className="memo">
              <button
                type="button"
                onClick={() => onClick(memo)}
                key={memo.id}
                id="show-button"
              >
                {memo.title}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
