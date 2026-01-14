import React, { InputHTMLAttributes } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "./input"; // Local import expectation

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className="relative flex-grow">
      <Input
        type="search"
        placeholder="Search..."
        className="w-full p-6 border-gray-300 rounded-lg shadow-none"
        {...props}
      />
      <SearchIcon className="w-4 h-4 absolute top-1/2 end-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchInput;
