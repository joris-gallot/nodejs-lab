import { createReadStream, stat } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { __dirname } from './utils.ts'

const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
}

const PUBLIC_DIR = resolve(__dirname, '..', 'public')

const port = 3000
const url = `http://localhost:${port}`

const server = createServer((req, res) => {
  if (!req.url || req.method !== 'GET') {
    res.writeHead(405)
    return res.end('Method Not Allowed')
  }

  const parsedUrl = new URL(`${url}${req.url}`)

  const sanitizePath = parsedUrl.pathname?.replace(/(\.\.[/\\])/g, '') || '/'
  let filePath = join(PUBLIC_DIR, sanitizePath)

  // Default to index.html for directories
  if (filePath.endsWith('/')) {
    filePath = join(filePath, 'index.html')
  }

  stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404)
      return res.end('404 Not Found')
    }

    const ifModifiedSince = req.headers['if-modified-since'] ? new Date(req.headers['if-modified-since']) : null

    if (ifModifiedSince && ifModifiedSince >= stats.mtime) {
      res.writeHead(304)
      return res.end()
    }

    const ext = extname(filePath)
    const mime = mimeTypes[ext] || 'application/octet-stream'

    res.writeHead(200, {
      'Content-Type': mime,
      'Content-Length': stats.size,
      'Last-Modified': stats.mtime.toUTCString(),
    })

    const stream = createReadStream(filePath)
    stream.pipe(res).on('error', () => {
      res.writeHead(500)
      res.end('Internal Server Error')
    })
  })
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`static-server listening on ${url}`)
})
