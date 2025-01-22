const Navigation = () => {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/products" className="hover:underline">
            Products
          </a>
        </li>
        {/* Removed the Cart link */}
      </ul>
    </nav>
  );
};

export default Navigation;


