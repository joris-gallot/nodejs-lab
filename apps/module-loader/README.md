# module-loader

> 📦 Dynamic module loader using native Node.js ESM and VM features

This project explores how to load modules dynamically at runtime using `import()`, `vm`, and core URL/path utilities — without bundlers or transpilers.

---

## Features

- Dynamically load ESM or CommonJS modules at runtime
- Uses `import()` with file URL resolution
- Basic sandboxing using `vm`
- Example: run untrusted code in a limited context
