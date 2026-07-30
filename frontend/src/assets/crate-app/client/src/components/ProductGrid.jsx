const THUMB_COLORS = {
  produce: '#EAF2DD',
  dairy: '#FCF3DC',
  bakery: '#F3E4CE',
};

export default function ProductGrid({ products, loading, filter, onFilterChange, cart, onAdd, onChangeQty }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'produce', label: 'Produce' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'bakery', label: 'Bakery' },
  ];

  return (
    <section className="products" id="shop">
      <div className="section-head">
        <div>
          <div className="eyebrow">This week's picks</div>
          <h2>Fresh off the truck</h2>
        </div>
        <div className="filter-row">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? 'active' : ''}`}
              onClick={() => onFilterChange(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mono" style={{ opacity: 0.6 }}>Loading today's stock…</p>
      ) : (
        <div className="grid">
          {products.map((p) => {
            const qty = cart[p.id]?.qty || 0;
            return (
              <div className="card" key={p.id}>
                <div className={`stamp ${p.sale ? 'sale' : ''}`}>
                  {p.stamp.split(' ').map((w, i) => <span key={i}>{w}<br /></span>)}
                </div>
                <div className="thumb" style={{ background: THUMB_COLORS[p.category] || '#eee' }}>
                  {p.emoji}
                </div>
                <h4>{p.name}</h4>
                <div className="unit">{p.unit}</div>
                <div className="card-foot">
                  <div className="price-tag">
                    {p.oldPrice && <span className="old">₹{p.oldPrice}</span>}
                    ₹{p.price}
                  </div>
                  {qty === 0 ? (
                    <button className="add-btn" onClick={() => onAdd(p)}>+ Add</button>
                  ) : (
                    <div className="stepper">
                      <button onClick={() => onChangeQty(p.id, -1)}>−</button>
                      <span className="qty">{qty}</span>
                      <button onClick={() => onChangeQty(p.id, 1)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
