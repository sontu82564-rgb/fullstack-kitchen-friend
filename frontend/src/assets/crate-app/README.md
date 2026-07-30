# CRATE — Grocery Delivery App

A full-stack grocery storefront: **Express** API on the backend, **React (Vite)** on the frontend.

## Structure

```
crate-app/
  server/     Express API (products, categories, orders)
  client/     React storefront (Vite)
```

## Run it

Open two terminals.

**1. Start the API**
```bash
cd server
npm install
npm start
```
Runs at http://localhost:4000. Try http://localhost:4000/api/products in a browser to confirm it's up.

**2. Start the React app**
```bash
cd client
npm install
npm run dev
```
Runs at http://localhost:5173 and proxies `/api/*` requests to the Express server automatically (see `vite.config.js`).

Open http://localhost:5173 in your browser.

## What's wired up

- `GET /api/products?category=produce` — product list, optionally filtered
- `GET /api/categories` — category list for the browse strip
- `POST /api/orders` — place an order `{ items: [{ productId, qty }] }`, returns a confirmation with an order id and total
- `GET /api/orders/:id` — look up a placed order

The cart lives in React state on the frontend; checkout sends the cart to the API, which computes the total server-side (never trusts client-sent prices) and returns a confirmation shown in the cart drawer.

## Next steps if you want to extend this

- Swap the in-memory `orders` array in `server/server.js` for a real database (Postgres, MongoDB, etc.)
- Add user accounts / auth for saved addresses and order history
- Add product images instead of emoji placeholders
- Deploy: host the API (Render, Railway, Fly.io) and the client as a static build (`npm run build` in `client/`) on Vercel/Netlify, pointing the client at your live API URL instead of the dev proxy
