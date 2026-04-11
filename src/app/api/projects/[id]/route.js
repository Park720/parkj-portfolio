// src/app/api/projects/[id]/route.js
import prisma from '@/lib/prisma';
import { isAuthorized, unauthorized } from '@/lib/auth';

export async function PUT(request, { params }) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const { id } = await params;
    const body = await request.json();
    const project = await prisma.project.update({
      where: { id },
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
    return Response.json(project);
  } catch (err) {
    console.error('PUT /api/projects/[id]:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) return unauthorized();

  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/projects/[id]:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
