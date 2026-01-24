export async function onRequest({ env, params }) {
  const token = params.token;

  // 1️⃣ Проверка наличия токена
  if (!token) {
    return new Response("No token provided", { status: 400 });
  }

  // 2️⃣ Проверка токена пользователя в KV USERS
  const status = await env.USERS.get(token);
  if (status !== "active") {
    return new Response("Access denied", { status: 403 });
  }

  // 3️⃣ Получение ключей VLESS из KV KEYS
  const keys = await env.KEYS.get("keys.txt"); // "keys.txt" — ключ, в котором хранится весь текст
  if (!keys) {
    return new Response("Keys not found", { status: 404 });
  }

  // 4️⃣ Отдаём Happ чистый текст
  return new Response(keys, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
