import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-box">
          <h2>Easymart</h2>
          <p>
            Fresh Grocery & Daily Essentials at the best price.
          </p>
        </div>

        <div className="footer-box">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/">Products</a>
          <a href="/">Categories</a>
          <a href="/">Offers</a>
        </div>

        <div className="footer-box">
          <h3>Customer</h3>

          <a href="/">My Orders</a>
          <a href="/">Wishlist</a>
          <a href="/">Support</a>
          <a href="/">Privacy</a>
        </div>

        <div className="footer-box">
          <h3>Contact</h3>

          <p>📍 Kolkata, India</p>
          <p>📞 +91 9876543210</p>
          <p>✉ support@shopzone.com</p>
        </div>

      </div>

      <hr />

      <div className="copyright">
        © 2026 ShopZone. All Rights Reserved.
      </div>
    </footer>
  );
}