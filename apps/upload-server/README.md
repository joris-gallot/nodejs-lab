# upload-server

> ⚙️ Minimal file upload server using raw Node.js

**upload-server** is a small project to explore Node.js core APIs without any frameworks.

---

## Features

- `PUT /upload` — stream file to disk & compute SHA-256 hash
- `GET /download/:token` — download with temporary token
- In-memory TTL: files auto-expire after a set time
