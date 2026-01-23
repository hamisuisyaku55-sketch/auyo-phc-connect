// Input.js
export function Input({ value, onChange, placeholder, onKeyDown }) {
  return (
    <input
      className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring focus:border-blue-400"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
}

