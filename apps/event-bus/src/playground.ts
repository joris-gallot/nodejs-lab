import { strict as assert } from 'node:assert'
import { TypedEventBus } from './index.ts'

interface TestEvents {
  ping: string
  sum: number
}

const bus = new TypedEventBus<TestEvents>()

let called = false
bus.on('ping', (msg) => {
  called = true
  assert.equal(msg, 'hello')
})

// @ts-expect-error - should be a string
bus.on('ping', (_: number) => {})

bus.emit('ping', 'hello')
assert.ok(called)

// @ts-expect-error - should be a string
bus.emit('ping', 2)

let result = 0
bus.on('sum', (n) => {
  result += n
})

bus.emit('sum', 5)
bus.emit('sum', 3)
assert.equal(result, 8)

console.log('All tests passed ✅')
