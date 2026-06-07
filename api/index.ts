import type { IncomingMessage, ServerResponse } from "http";

const serverModule = await import("../dist/server/server.js");
const server = serverModule.default ?? serverModule;

function nodeReqToWebRequest(req: IncomingMessage): Request {
  const protocol =
    typeof req.headers["x-forwarded-proto"] === "string"
      ? req.headers["x-forwarded-proto"]
      : "https";
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }
    } else {
      headers.append(key, value);
    }
  }

  return new Request(url.toString(), {
    method: req.method,
    headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });
}

async function sendWebResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;

  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === "transfer-encoding") return;
    res.setHeader(name, value);
  });

  if (!response.body) {
    res.end();
    return;
  }

  const reader = response.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        res.write(Buffer.from(value));
      }
    }
  } finally {
    reader.releaseLock();
  }

  res.end();
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const request = nodeReqToWebRequest(req);
  const response = await server.fetch(request, {}, {});
  await sendWebResponse(res, response);
}
