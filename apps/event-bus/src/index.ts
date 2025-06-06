import { EventEmitter } from 'node:events'

type EventsMap = Record<string, any>

export class TypedEventBus<T extends EventsMap> {
  private emitter = new EventEmitter()

  on<K extends keyof T>(event: K, handler: (payload: T[K]) => void) {
    this.emitter.on(event as string, handler)
  }

  emit<K extends keyof T>(event: K, payload: T[K]) {
    this.emitter.emit(event as string, payload)
  }

  off<K extends keyof T>(event: K, handler: (payload: T[K]) => void) {
    this.emitter.off(event as string, handler)
  }
}
