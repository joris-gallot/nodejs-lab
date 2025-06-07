import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Script } from 'node:vm'
import { __dirname } from './utils.ts'

const file = join(__dirname, 'examples/sandbox.js')
const code = readFileSync(file, 'utf8')

const context = {
  console,
  result: 0,
}

const script = new Script(code)
script.runInNewContext(context)

console.log('Sandbox result:', context.result)
