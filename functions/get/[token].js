export async function onRequest({ env, params }) {
  const token = params.token;

  // 1️⃣ Проверка наличия токена в URL
  if (!token) {
    return new Response("No token provided", { status: 400 });
  }

  // 2️⃣ Проверяем, есть ли токен пользователя в KV
  const status = await env.USERS.get(token);
  if (status !== "active") {
    return new Response("Access denied", { status: 403 });
  }

  // 3️⃣ Ссылка на файл в приватном репозитории через GitHub API
  const githubUrl = "https://api.github.com/repos/chikaylov/sdf89gsd78/contents/sdfs65fhfg056jf";

  // 4️⃣ Fetch файла с GitHub, используя PAT
  const resp = await fetch(githubUrl, {
    headers: {
      "Accept": "application/vnd.github.v3.raw",
      "Authorization": `token ${env.GITHUB_PAT}`
    }
  });

  if (!resp.ok) {
    return new Response("Failed to fetch keys from GitHub", { status: 502 });
  }

  // 5️⃣ Получаем текст файла
  const text = await resp.text();

  // 6️⃣ Возвращаем Happ чистый текст
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
