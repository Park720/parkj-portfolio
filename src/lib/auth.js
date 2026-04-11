// src/lib/auth.js

export function isAuthorized(request) {
  const key = request.headers.get('x-admin-key');
  return key === process.env.ADMIN_PASSWORD;
}

export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}
