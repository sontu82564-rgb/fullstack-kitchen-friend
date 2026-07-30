export default function CartDrawer({ open, onClose, cart, onChangeQty, onCheckout, checkingOut, confirmation }) {
  const items = Object.values(cart);
  const total = items.reduce((sum, i) => sum + i.qty * i.product.price, 0);

  return (
    <>
      <div className={`overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head">
          <h3>Your cart</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <div className="drawer-body">
          {confirmation ? (
            <div className="drawer-empty">
              <strong style={{ display: 'block', marginBottom: 8, color: '#0E3B39' }}>
                Order #{confirmation.id} confirmed
              </strong>
              Estimated delivery: {confirmation.estimatedDelivery}
            </div>
          ) : items.length === 0 ? (
            <div className="drawer-empty">Your cart is empty.<br />Add something fresh from today's picks.</div>
          ) : (
            items.map((i) => (
              <div className="drawer-item" key={i.product.id}>
                <div>
                  <div className="di-name">{i.product.emoji} {i.product.name}</div>
                  <div className="di-meta">{i.qty} × ₹{i.product.price}</div>
                </div>
                <div className="mono">₹{i.qty * i.product.price}</div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-foot">
          <div className="drawer-total"><span>Total</span><span>₹{total}</span></div>
          <button
            className="checkout-btn"
            disabled={items.length === 0 || checkingOut}
            onClick={onCheckout}
          >
            {checkingOut ? 'Placing order…' : 'Checkout'}
          </button>
        </div>
      </div>
    </>
  );
}
