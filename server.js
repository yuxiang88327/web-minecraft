import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const ROOT = process.cwd();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const clients = new Map();
let blockSeq = 0;
const blockEvents = [];

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function now() {
  return Date.now();
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error('payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('invalid json'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function snapshotFor(sinceSeq = 0) {
  const players = [...clients.entries()].map(([id, c]) => ({ id, name: c.name, ...c.state }));
  const updates = blockEvents.filter((e) => e.seq > sinceSeq);
  return { players, updates, onlineCount: clients.size, seq: blockSeq };
}

function prune() {
  const cutoff = now() - 20_000;
  for (const [id, c] of clients.entries()) {
    if (c.lastSeen < cutoff) clients.delete(id);
  }
  const minSeq = Math.max(0, blockSeq - 4000);
  while (blockEvents.length && blockEvents[0].seq < minSeq) blockEvents.shift();
}

const server = http.createServer(async (req, res) => {
  const reqPath = (req.url || '/').split('?')[0];

  try {
    if (req.method === 'POST' && reqPath === '/api/join') {
      const body = await readJson(req);
      const id = makeId();
      clients.set(id, {
        name: String(body.name || '玩家').slice(0, 16),
        state: { x: 0, y: 0, z: 0, yaw: 0 },
        lastSeen: now(),
      });
      sendJson(res, 200, { ok: true, id, ...snapshotFor(0) });
      return;
    }

    if (req.method === 'POST' && reqPath === '/api/state') {
      const body = await readJson(req);
      const c = clients.get(String(body.id || ''));
      if (!c) return sendJson(res, 404, { ok: false, message: 'player not found' });
      c.lastSeen = now();
      c.state = {
        x: Number(body.x) || 0,
        y: Number(body.y) || 0,
        z: Number(body.z) || 0,
        yaw: Number(body.yaw) || 0,
      };
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === 'POST' && reqPath === '/api/block-update') {
      const body = await readJson(req);
      const c = clients.get(String(body.id || ''));
      if (!c) return sendJson(res, 404, { ok: false, message: 'player not found' });
      c.lastSeen = now();
      blockSeq += 1;
      blockEvents.push({
        seq: blockSeq,
        playerId: String(body.id),
        x: Number(body.x),
        y: Number(body.y),
        z: Number(body.z),
        block: Number(body.block),
      });
      sendJson(res, 200, { ok: true, seq: blockSeq });
      return;
    }

    if (req.method === 'GET' && reqPath === '/api/snapshot') {
      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      const since = Number(url.searchParams.get('since') || '0') || 0;
      sendJson(res, 200, { ok: true, ...snapshotFor(since) });
      return;
    }
  } catch (err) {
    sendJson(res, 400, { ok: false, message: err.message });
    return;
  }

  const safePath = reqPath === '/' ? '/index.html' : reqPath;
  const filePath = path.join(ROOT, path.normalize(safePath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    res.end(data);
  });
});

setInterval(prune, 5000);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web Minecraft multiplayer server running at http://localhost:${PORT}`);
});
