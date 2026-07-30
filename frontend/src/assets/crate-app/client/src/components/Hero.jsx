export default function Hero({ onShopClick, onHowClick }) {
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'short', day: '2-digit', month: 'short',
  }).toUpperCase();

  const boardItems = [
    { name: '🍅 Heirloom tomatoes', price: '₹89/kg' },
    { name: '🥬 Baby spinach', price: '₹45/bunch', isNew: true },
    { name: '🥑 Hass avocado', price: '₹55/pc' },
    { name: '🍓 Strawberries', price: '₹120/box' },
    { name: '🥚 Farm eggs (12)', price: '₹96/dz' },
  ];

  return (
    <section className="hero">
      <div>
        <div className="eyebrow">Doorstep by 6pm today</div>
        <h1>
          Groceries picked this<br />morning, <em>on your step</em><br />by evening.
        </h1>
        <p className="sub">
          We buy direct from 40 local growers every dawn and pack your order the same day —
          no warehouses, no weeks-old stock.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={onShopClick}>Start your order</button>
          <button className="btn-ghost" onClick={onHowClick}>How it works</button>
        </div>
      </div>

      <div className="board">
        <div className="board-head">
          <h3>Today's Board</h3>
          <span>{today}</span>
        </div>
        {boardItems.map((item) => (
          <div className="board-row" key={item.name}>
            <span className="name">
              {item.name} {item.isNew && <span className="badge-new">NEW</span>}
            </span>
            <span className="price">{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
