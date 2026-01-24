export async function onRequest({ env, params }) {
  const token = params.token;

  if (!token) return new Response("No token provided", { status: 400 });

  // проверяем токен в KV
  const status = await env.USERS.get(token);
  if (status !== "active") return new Response("Access denied", { status: 403 });

  return new Response("Access granted");
}
