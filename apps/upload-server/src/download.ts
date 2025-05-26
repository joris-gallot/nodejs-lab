import type { Handler } from './types.js'
import { createReadStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { tempFiles } from './files.ts'

export const handleDownload: Handler<[token: string]> = async (_req, res, token) => {
  const fileEntry = tempFiles[token]

  if (!fileEntry) {
    res.writeHead(404)
    return res.end('Not found')
  }

  if (Date.now() > fileEntry.expiresAt) {
    await unlink(fileEntry.path)
    delete tempFiles[token]
    res.writeHead(410)
    return res.end('Link expired')
  }

  const readStream = createReadStream(fileEntry.path)
  res.writeHead(200, { 'Content-Type': 'application/octet-stream' })
  readStream.pipe(res)
}
