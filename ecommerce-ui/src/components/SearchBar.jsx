import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-box">
      <FaSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}