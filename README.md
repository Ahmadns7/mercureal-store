# MercuReal Store

A naira e-commerce demo web app by MercuReal Tech Solutions. Mobile-first, built with Vite + React + TypeScript + Tailwind.

Live demo: import this repo on [Vercel](https://vercel.com) (framework preset: Vite, build `npm run build`, output `dist`).

## Features

- Product catalog with naira pricing (₦12,500 style formatting)
- Search and category filter
- Product detail pages
- Cart with quantity edit, saved to localStorage
- Checkout flow with shipping form and a simulated Paystack-style payment step (demo only, no real money, no payment keys)
- Order confirmation with order number
- Order history from localStorage

## Stack

- Vite, React 18, TypeScript, Tailwind CSS
- Vitest unit tests for cart logic
- GitHub Actions CI (test + build on push)

## Setup

```bash
npm install
npm run dev      # local dev
npm run test     # unit tests
npm run build    # production build to dist/
```

## License

MIT
