const BASE = '/api';

export async function fetchProducts(category = 'all') {
  const res = await fetch(`${BASE}/products?category=${category}`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) throw new Error('Failed to load categories');
  return res.json();
}

export async function placeOrder(items) {
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error('Failed to place order');
  return res.json();
}
