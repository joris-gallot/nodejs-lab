# nodejs-lab

> 🧪 A minimal monorepo of native Node.js experiments — no frameworks, no dependencies.

This lab is a collection of small, focused projects built with **raw Node.js APIs**,
each project explores a specific feature of the platform using modern TypeScript and zero external dependencies.

---

## Projects

### `upload-server`

A minimal HTTP file upload server using:

- `http` for raw routing
- `fs` and `stream` to write files to disk
- `crypto` to hash file content
- TTL token system for download links

> 📄 [README](./apps/upload-server/README.md) for details
