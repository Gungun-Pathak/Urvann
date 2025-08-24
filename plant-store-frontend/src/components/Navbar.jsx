export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">🌱 Mini Plant Store</h1>
      <div>
        <a href="/" className="mr-4 hover:underline">Home</a>
        <a href="/admin" className="hover:underline">Admin</a>
      </div>
    </nav>
  );
}
