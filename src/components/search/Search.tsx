import React from "react";

type SearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder = "Buscar..." }) => (
  <div className="text-center mt-5">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded px-2 py-1 w-full max-w-xs text-base sm:text-lg"
    />
  </div>
);

export default Search;