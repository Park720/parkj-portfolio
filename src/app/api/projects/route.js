// src/app/api/projects/route.js
import prisma from '@/lib/prisma';
import { isAuthorized, unauthorized } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    return Response.json(projects);
  } catch (err) {
    console.error('GET /api/projects:', err.message);
    return Response.json({ error: 'DB not available. Check DATABASE_URL.' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: {
        title:    body.title,
        type:     body.type,
        engine:   body.engine,
        mode:     body.mode,
        year:     body.year,
        desc:     body.desc,
        longDesc: body.longDesc,
        role:     body.role,
        duration: body.duration,
        youtube:  body.youtube  || null,
        images:   body.images   || null,
        github:   body.github   || null,
        live:     body.live     || null,
        order:    body.order    ?? 0,
      },
    });
    return Response.json(project, { status: 201 });
  } catch (err) {
    console.error('POST /api/projects:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
