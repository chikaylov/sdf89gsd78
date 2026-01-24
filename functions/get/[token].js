export async function onRequest({ env, params }) {
  const token = params.token;

  if (!token) {
    return new Response("No token provided", { status: 400 });
  }

  // на этом этапе просто возвращаем токен для теста
  return new Response(`Token received: ${token}`);
}
