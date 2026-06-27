import { useParams, useNavigate } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-10 flex gap-10">
      <img src="https://via.placeholder.com/300" className="w-1/3" />

      <div>
        <h1 className="text-2xl font-bold">Product {id}</h1>
        <p className="text-gray-600">Best quality product description here.</p>

        <h2 className="text-xl mt-3">₹79999</h2>

        <button
          onClick={() => navigate("/cart")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}