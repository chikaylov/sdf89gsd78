export async function onRequest({ env, params }) {
  const token = params.token;

  if (!token) return new Response("No token provided", { status: 400 });

  // Проверка токена пользователя в KV
  const status = await env.USERS.get(token);
  if (status !== "active") return new Response("Access denied", { status: 403 });

  // Получаем содержимое keys.txt из KV
  const keys = await env.KEYS.get("keys.txt");
  if (!keys) return new Response("Keys not found", { status: 404 });

  return new Response(keys, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
