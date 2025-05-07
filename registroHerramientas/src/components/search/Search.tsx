import React from "react";

type SearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Search: React.FC<SearchProps> = ({ value, onChange, placeholder = "Buscar..." }) => (
  <div className="w-auto text-center">
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded px-2 py-1 w-dvh text-2xl"
    />
  </div>
);

export default Search;