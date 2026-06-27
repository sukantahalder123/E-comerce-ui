import "./Banner.css";

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-left">
        <span className="offer">🔥 Flat 30% OFF</span>

        <h1>
          Fresh Grocery
          <br />
          Delivered in
          <span> 10 Minutes</span>
        </h1>

        <p>
          Buy fresh fruits, vegetables, dairy products and daily essentials
          at the best price.
        </p>

        <button>Shop Now</button>
      </div>

      <div className="banner-right">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900"
          alt="Banner"
        />
      </div>
    </section>
  );
}