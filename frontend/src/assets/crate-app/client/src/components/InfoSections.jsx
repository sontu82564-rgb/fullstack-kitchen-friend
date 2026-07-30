export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Order by 11am', text: "Pick what you need from today's board — stock reflects what actually came in this morning." },
    { num: '02', title: 'We pack from the crate', text: "Your order is pulled straight from the day's harvest crates, not a back-room shelf." },
    { num: '03', title: 'On your step by 6pm', text: 'A driver from your neighborhood delivers it the same day, cold-chain kept the whole way.' },
  ];

  return (
    <section className="how" id="how">
      <div className="how-inner">
        <div className="eyebrow">The process</div>
        <h2 style={{ fontSize: 34 }}>Three steps, same-day fresh</h2>
        <div className="how-grid">
          {steps.map((s) => (
            <div className="how-card" key={s.num}>
              <span className="how-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  const quotes = [
    { text: 'The tomatoes actually taste like tomatoes. I stopped going to the supermarket for produce entirely.', name: 'Riya M.', loc: 'Salt Lake, Kolkata', initial: 'R' },
    { text: 'Delivery has never once missed the evening window. My kids ask for the strawberries by name now.', name: 'Arun D.', loc: 'Ballygunge, Kolkata', initial: 'A' },
    { text: "The daily board is such a small thing but it changed how I cook — I plan meals around what's fresh.", name: 'Priya S.', loc: 'New Town, Kolkata', initial: 'P' },
  ];

  return (
    <section className="quotes" id="reviews">
      <div className="eyebrow">From the neighborhood</div>
      <h2 style={{ fontSize: 34 }}>What people are saying</h2>
      <div className="quote-grid">
        {quotes.map((q) => (
          <div className="quote-card" key={q.name}>
            <p className="text">"{q.text}"</p>
            <div className="quote-who">
              <div className="avatar">{q.initial}</div>
              <div><div className="name">{q.name}</div><div className="loc">{q.loc}</div></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="logo">CRATE</div>
            <p>Direct from local growers to your door, packed the same morning it's picked.</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email" />
              <button>Join</button>
            </div>
          </div>
          <div className="footer-col">
            <h5>Shop</h5>
            <a href="#shop">Produce</a>
            <a href="#shop">Dairy &amp; Eggs</a>
            <a href="#shop">Bakery</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Our growers</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h5>Support</h5>
            <a href="#">Delivery areas</a>
            <a href="#">Track an order</a>
            <a href="#">Contact us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Crate Market. All rights reserved.</span>
          <span>Kolkata · Howrah · New Town</span>
        </div>
      </div>
    </footer>
  );
}
