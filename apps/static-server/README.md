# static-server

> 🌐 A barebones static file server built with raw Node.js

This project serves static files from a local `public/` folder using only native Node.js modules.

---

## Features

- Serves static files via `GET /<path>`
- Auto-detects content type (MIME) based on file extension
- Handles 404 for missing files
- Prevents path traversal (`../` etc.)
- Adds basic caching headers (`Last-Modified`, `If-Modified-Since`)
