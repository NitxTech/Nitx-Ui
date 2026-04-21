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
        className="w-full p-6 border-neutral-200 bg-neutral-50 text-neutral-900 rounded-lg shadow-none placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:placeholder:text-neutral-500"
        {...props}
      />
      <SearchIcon className="w-4 h-4 absolute top-1/2 end-4 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
    </div>
  );
};

export default SearchInput;
