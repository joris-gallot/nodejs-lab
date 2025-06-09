import { EventEmitter } from 'node:events'
import { cpus } from 'node:os'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'
import { __dirname } from './utils.ts'

interface Task {
  data: any
  resolve: (result: any) => void
  reject: (err: any) => void
}

class CustomWorker extends Worker {
  public __task__: Task | undefined
}

export class WorkerPool extends EventEmitter {
  private poolSize = cpus().length
  private workers: CustomWorker[] = []
  private idle: CustomWorker[] = []
  private queue: Task[] = []

  constructor() {
    super()
    for (let i = 0; i < this.poolSize; i++) {
      this.spawn()
    }
  }

  private spawn() {
    const worker = new CustomWorker(join(__dirname, 'worker.ts'))
    worker.on('message', (result) => {
      const task = worker.__task__
      delete worker.__task__
      this.idle.push(worker)
      task?.resolve(result)
      this.dequeue()
    })
    worker.on('error', err => this.emit('error', err))
    this.workers.push(worker)
    this.idle.push(worker)
  }

  private dequeue() {
    if (this.queue.length === 0 || this.idle.length === 0)
      return
    const task = this.queue.shift()!
    const worker = this.idle.shift()!
    worker.__task__ = task
    worker.postMessage(task.data)
  }

  run(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ data, resolve, reject })
      this.dequeue()
    })
  }

  destroy() {
    for (const w of this.workers) w.terminate()
  }
}
