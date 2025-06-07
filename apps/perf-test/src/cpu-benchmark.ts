import { pbkdf2Sync } from 'node:crypto'
import { performance } from 'node:perf_hooks'

const start = performance.now()

for (let i = 0; i < 100; i++) {
  pbkdf2Sync('password', 'salt', 100_000, 64, 'sha512')
}

const end = performance.now()

console.log(`🔒 CPU hash loop took ${(end - start).toFixed(2)}ms`)
