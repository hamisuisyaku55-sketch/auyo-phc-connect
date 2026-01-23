// Button.js
export function Button({ children, className, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-500 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


