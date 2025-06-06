import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { __dirname } from './utils.ts'

const filePath = join(__dirname, 'examples/math.js')
const moduleUrl = pathToFileURL(filePath).href

async function run() {
  const mod = await import(moduleUrl)
  // eslint-disable-next-line no-console
  console.log('Result:', mod.add(2, 3))
}

run().catch(console.error)
