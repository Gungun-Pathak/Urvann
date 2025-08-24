export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search plants..."
      className="border p-2 rounded-md w-full md:w-72"
    />
  );
}
