# worker-pool

> 🧵 A minimal worker thread pool for CPU-bound tasks in Node.js

This project demonstrates how to use `worker_threads` to run heavy tasks in parallel, managing a pool of workers manually.

---

## Features

- Simple task queue with worker reuse
- Limits concurrency to number of logical CPUs
- Example with heavy `Fibonacci` computation
