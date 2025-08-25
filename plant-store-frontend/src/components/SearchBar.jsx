import { Search } from "lucide-react"; // or replace with a Unicode icon if you don't want extra dependency

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full md:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search plants..."
        className="pl-10 pr-4 py-2 w-full border rounded-xl shadow-sm 
                   focus:ring-2 focus:ring-green-400 focus:border-green-400
                   transition-all outline-none text-gray-700"
      />
    </div>
  );
}
