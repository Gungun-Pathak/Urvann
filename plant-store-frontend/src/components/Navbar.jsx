export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
          🌱 <span className="hover:text-green-200 transition-colors">Mini Plant Store</span>
        </h1>

        {/* Links */}
        <div className="flex space-x-6 text-lg font-medium">
          <a
            href="/"
            className="relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </a>
          <a
            href="/admin"
            className="relative after:block after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
}
