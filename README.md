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

> 📄 See its [README](./apps/upload-server)

### `static-server`

A lightweight static file server using:

- `http` to serve content
- `fs`, `path`, and `url` to locate and read files
- MIME detection and basic error handling

> 📄 See its [README](./apps/static-server)

### `event-bus`

A minimal typed event emitter built with Node.js core APIs:

- Type-safe `emit` / `on` logic with generics
- Built on top of Node.js `EventEmitter`
- Includes minimal test file using `assert`

> 📄 See its [README](./apps/event-bus)

### `module-loader`

Dynamic module loader using native Node.js ESM and VM features:

- Dynamically load ESM or CommonJS modules at runtime
- Uses `import()` with file URL resolution
- Basic sandboxing using `vm`
- Example: run untrusted code in a limited context

> 📄 See its [README](./apps/module-loader)
