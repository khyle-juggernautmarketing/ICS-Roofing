# ICS Roofing & Construction

Sacramento roofing, solar, and construction landing page (Next.js 15).

## Development

```bash
npm install
cp .env.local.example .env.local   # add N8N_WEBHOOK_URL + N8N_AUTH_BEARER
npm run dev
```

Open **http://127.0.0.1:3102**

## Environment variables (Vercel)

| Variable | Required | Description |
|----------|----------|-------------|
| `N8N_WEBHOOK_URL` | Yes | HTTPS n8n webhook URL (server-only) |
| `N8N_AUTH_BEARER` | Yes | Bearer token for n8n (server-only, never expose to client) |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical site URL, e.g. `https://your-domain.vercel.app` |
| `ALLOWED_ORIGIN_HOSTS` | Optional | Extra hosts allowed to POST `/api/lead` |

Lead submissions go through **`POST /api/lead`** with rate limiting, origin checks, and validation — credentials never ship to the browser.

## Deploy (Vercel)

1. Import this repo in [Vercel](https://vercel.com).
2. Set the environment variables above.
3. Deploy — framework is detected as Next.js automatically.
