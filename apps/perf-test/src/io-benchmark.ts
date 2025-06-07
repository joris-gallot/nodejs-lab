import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { __dirname } from './utils.ts'

const file = join(__dirname, '..', 'tmp.log')
const data = 'a'.repeat(10_000_000)

const writeStart = performance.now()
writeFileSync(file, data)
const writeEnd = performance.now()

const readStart = performance.now()
readFileSync(file)
const readEnd = performance.now()

// eslint-disable-next-line no-console
console.log(`💾 Write: ${(writeEnd - writeStart).toFixed(2)}ms`)
// eslint-disable-next-line no-console
console.log(`📖 Read: ${(readEnd - readStart).toFixed(2)}ms`)
