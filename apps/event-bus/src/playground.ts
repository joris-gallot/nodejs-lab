import { TypedEventBus } from './index.ts'

interface AppEvents {
  'user:login': { id: string, name: string }
  'log:error': { message: string, code?: number }
}

const bus = new TypedEventBus<AppEvents>()

bus.on('user:login', (user) => {
  // eslint-disable-next-line no-console
  console.log(`User logged in: ${user.name}`)
})

bus.emit('user:login', { id: 'abc123', name: 'Alice' })

bus.emit('log:error', { message: 'Oops', code: 500 })
