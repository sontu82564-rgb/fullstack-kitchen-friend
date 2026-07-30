import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { HowItWorks, Reviews, Footer } from './components/InfoSections.jsx';
import { fetchProducts, fetchCategories, placeOrder } from './api.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({}); // { [productId]: { product, qty } }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts(filter)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [filter]);

  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);

  function addItem(product) {
    setCart((prev) => ({ ...prev, [product.id]: { product, qty: 1 } }));
  }

  function changeQty(id, delta) {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return prev;
      const newQty = next[id].qty + delta;
      if (newQty <= 0) {
        delete next[id];
      } else {
        next[id] = { ...next[id], qty: newQty };
      }
      return next;
    });
  }

  async function handleCheckout() {
    setCheckingOut(true);
    try {
      const items = Object.values(cart).map((i) => ({ productId: i.product.id, qty: i.qty }));
      const order = await placeOrder(items);
      setConfirmation(order);
      setCart({});
    } catch (err) {
      alert('Something went wrong placing your order. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  }

  function openCart() {
    setConfirmation(null);
    setDrawerOpen(true);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Header cartCount={cartCount} onCartClick={openCart} />
      <Hero onShopClick={() => scrollTo('shop')} onHowClick={() => scrollTo('how')} />

      <div className="tear"></div>

      <Categories categories={categories} onSelect={setFilter} />

      <div className="tear flip dark"></div>

      <ProductGrid
        products={products}
        loading={loading}
        filter={filter}
        onFilterChange={setFilter}
        cart={cart}
        onAdd={addItem}
        onChangeQty={changeQty}
      />

      <HowItWorks />
      <Reviews />
      <Footer />

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={cart}
        onChangeQty={changeQty}
        onCheckout={handleCheckout}
        checkingOut={checkingOut}
        confirmation={confirmation}
      />
    </>
  );
}
