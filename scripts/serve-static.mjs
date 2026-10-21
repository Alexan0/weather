import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, isAbsolute, join, relative, resolve } from 'node:path';

const OUTPUT_DIRECTORY = resolve(process.cwd(), 'out');
const PORT = Number(process.env.PORT ?? 3000);
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';
const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};

if (!existsSync(OUTPUT_DIRECTORY)) {
  throw new Error('The out directory is missing. Run npm run build first.');
}

function isInsideOutput(filePath) {
  const relativePath = relative(OUTPUT_DIRECTORY, filePath);
  return (
    relativePath !== '..' &&
    !relativePath.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) &&
    !isAbsolute(relativePath)
  );
}

createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405).end();
    return;
  }

  let requestPath;

  try {
    requestPath = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);

    if (BASE_PATH && (requestPath === BASE_PATH || requestPath.startsWith(`${BASE_PATH}/`))) {
      requestPath = requestPath.slice(BASE_PATH.length) || '/';
    }
  } catch {
    response.writeHead(400).end();
    return;
  }

  let filePath = resolve(OUTPUT_DIRECTORY, `.${requestPath}`);

  if (!isInsideOutput(filePath)) {
    response.writeHead(403).end();
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');

  if (!existsSync(filePath)) {
    filePath = join(OUTPUT_DIRECTORY, '404.html');
    response.statusCode = 404;
  }

  response.setHeader('Content-Type', MIME_TYPES[extname(filePath)] ?? 'application/octet-stream');

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}).listen(PORT, () => {
  console.log(`Static export available at http://localhost:${PORT}`);
});
