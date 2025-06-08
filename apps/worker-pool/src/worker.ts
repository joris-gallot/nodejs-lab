import { parentPort } from 'node:worker_threads'

function fib(n: number): number {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2)
}

parentPort!.on('message', (n: number) => {
  const result = fib(n)
  parentPort!.postMessage(result)
})
