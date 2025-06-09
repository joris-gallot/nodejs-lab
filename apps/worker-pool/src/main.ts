import { WorkerPool } from './pool.ts'

const pool = new WorkerPool()

const tasks = [30, 32, 34, 36] // heavy CPU-bound work

async function run() {
  const results = await Promise.all(tasks.map(n => pool.run(n)))
  console.log('Results:', results)
  pool.destroy()
}

run().catch(console.error)
