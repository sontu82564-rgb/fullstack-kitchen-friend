export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="site">
      <div className="nav-wrap">
        <div className="logo"><span className="dot"></span>CRATE</div>
        <nav className="links">
          <a href="#shop">Shop</a>
          <a href="#categories">Categories</a>
          <a href="#how">How it works</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <div className="nav-right">
          <button className="cart-btn" onClick={onCartClick}>
            Cart <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
