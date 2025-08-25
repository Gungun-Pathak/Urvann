import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CategoryFilter({ categories = [], selectedCategory, setSelectedCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full md:w-60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between border rounded-xl px-4 py-2 shadow-sm 
                   bg-white hover:shadow-md transition-all focus:ring-2 focus:ring-green-400"
      >
        <span className="text-gray-700">
          {selectedCategory || "Select a Category"}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {isOpen && (
        <ul className="absolute mt-2 w-full bg-white border rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
          <li
            className="px-4 py-2 hover:bg-green-100 cursor-pointer rounded-t-xl"
            onClick={() => {
              setSelectedCategory("");
              setIsOpen(false);
            }}
          >
            All Categories
          </li>
          {categories.map((cat) => (
            <li
              key={cat}
              className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                selectedCategory === cat ? "bg-green-200 font-medium" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setIsOpen(false);
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

