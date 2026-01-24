export async function onRequest({ env, params }) {
  const token = params.token;

  if (!token) return new Response("No token provided", { status: 400 });

  // проверяем токен в KV
  const status = await env.USERS.get(token);
  if (status !== "active") return new Response("Access denied", { status: 403 });

  // достаём файл с GitHub
  const githubUrl = "https://raw.githubusercontent.com/chikaylov/sdf89gsd78/refs/heads/main/sdfs65fhfg056jfv";
  const resp = await fetch(githubUrl);
  if (!resp.ok) return new Response("Failed to fetch keys", { status: 502 });

  const text = await resp.text();

  return new Response(text, { headers: { "Content-Type": "text/plain" } });
}
