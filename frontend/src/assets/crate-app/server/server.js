import express from 'express';
import cors from 'cors';
import { products, categories } from './data/products.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory order store (swap for a real DB in production)
const orders = [];
let nextOrderId = 1001;

// --- Products ---
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const list = category && category !== 'all'
    ? products.filter(p => p.category === category)
    : products;
  res.json(list);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// --- Categories ---
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// --- Orders ---
app.post('/api/orders', (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item' });
  }

  let total = 0;
  const lineItems = items.map(({ productId, qty }) => {
    const product = products.find(p => p.id === productId);
    if (!product) throw new Error(`Unknown product id ${productId}`);
    const lineTotal = product.price * qty;
    total += lineTotal;
    return { productId, name: product.name, qty, price: product.price, lineTotal };
  });

  const order = {
    id: nextOrderId++,
    items: lineItems,
    total,
    status: 'confirmed',
    placedAt: new Date().toISOString(),
    estimatedDelivery: 'Today, by 6pm',
  };

  orders.push(order);
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`CRATE API running at http://localhost:${PORT}`);
});
