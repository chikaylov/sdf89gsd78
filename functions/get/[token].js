export async function onRequest({ env, params }) {
  const token = params.token;

  if (!token) {
    return new Response("No token provided", { status: 400 });
  }

  // 1. Проверяем пользовательский токен
  const status = await env.USERS.get(token);
  if (status !== "active") {
    return new Response("Access denied", { status: 403 });
  }

  // 2. Забираем файл с GitHub через API (RAW)
  const githubUrl =
    "https://api.github.com/repos/chikaylov/sdf89gsd78/contents/sdfs65fhfg056jf";

  const resp = await fetch(githubUrl, {
    headers: {
      "Accept": "application/vnd.github.v3.raw",
      "Authorization": `token ${env.GITHUB_PAT}`
    }
  });

  if (!resp.ok) {
    return new Response("Failed to fetch keys from GitHub", { status: 502 });
  }

  const text = await resp.text();

  // 3. Отдаём Happ как обычный raw-файл
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
