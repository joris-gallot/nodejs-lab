import { createServer } from 'node:http'
import { URL } from 'node:url'
import { handleDownload } from './download.ts'
import { handleUpload } from './upload.ts'

const port = 3000
const url = `http://localhost:${port}`

const server = createServer((req, res) => {
  const { pathname } = new URL(`${url}${req.url}`)

  if (req.method === 'PUT' && pathname === '/upload') {
    return handleUpload(req, res)
  }

  if (req.method === 'GET' && pathname?.startsWith('/download/')) {
    const token = pathname.split('/').pop()

    if (!token) {
      res.writeHead(400)
      return res.end('Token is required')
    }

    return handleDownload(req, res, token)
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`upload-server listening on ${url}`)
})
