# upload-server

> ⚙️ Minimal file upload server using raw Node.js

This project handles file uploads and temporary downloads using only native Node.js modules.

---

## Features

- Upload files via `PUT /upload`
- Save streamed file to disk and compute its SHA-256 hash
- Generate temporary token for file download
- Serve file via `GET /download/:token`
- Auto-expire files after a short TTL (in-memory)
