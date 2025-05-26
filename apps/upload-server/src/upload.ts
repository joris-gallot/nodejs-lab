import type { Handler } from './types.js'
import { createHash } from 'node:crypto'
import { createWriteStream, existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'

import { pipeline } from 'node:stream'
import { tempFiles } from './files.ts'
import { __dirname } from './utils.ts'

const uploadsDir = join(__dirname, '..', 'uploads')

export const handleUpload: Handler = async (req, res) => {
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir)
  }

  const tempFilePath = join(uploadsDir, `${Date.now()}.bin`)
  const hash = createHash('sha256')
  const writeStream = createWriteStream(tempFilePath)

  req.on('data', chunk => hash.update(chunk))

  pipeline(req, writeStream, (err) => {
    if (err) {
      console.error(err)
      res.writeHead(500)
      return res.end('Upload failed')
    }

    const fileHash = hash.digest('hex')
    const token = Date.now().toString(36)

    tempFiles[token] = {
      path: tempFilePath,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ token, fileHash }))
  })
}
