// src/app/api/auth/route.js
export async function POST(request) {
  const { password } = await request.json();

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'ADMIN_PASSWORD not set' }, { status: 500 });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 401 });
}
