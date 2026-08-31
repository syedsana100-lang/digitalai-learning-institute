import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requireStudentProfile } from '@/lib/lms/auth-helpers';

const profileSchema = z.object({
  fullName: z.string().min(2).max(120),
  fatherName: z.string().max(120).optional().or(z.literal('')),
  gender: z.string().max(30).optional().or(z.literal('')),
  qualification: z.string().max(120).optional().or(z.literal('')),
  institution: z.string().max(160).optional().or(z.literal('')),
  yearOfPassing: z.coerce.number().int().min(1980).max(2100).optional().or(z.literal('')),
  mobile: z.string().max(20).optional().or(z.literal('')),
  whatsapp: z.string().max(20).optional().or(z.literal('')),
  address: z.string().max(300).optional().or(z.literal('')),
  city: z.string().max(80).optional().or(z.literal('')),
  state: z.string().max(80).optional().or(z.literal('')),
  postalCode: z.string().max(12).optional().or(z.literal('')),
});

export async function PATCH(req: Request) {
  const profile = await requireStudentProfile();
  if (!profile) return NextResponse.json({ error: 'Not signed in.' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || 'Invalid input.' }, { status: 400 });
  }

  const data = parsed.data;
  const updated = await prisma.studentProfile.update({
    where: { id: profile.id },
    data: {
      fullName: data.fullName,
      fatherName: data.fatherName || null,
      gender: data.gender || null,
      qualification: data.qualification || null,
      institution: data.institution || null,
      yearOfPassing: data.yearOfPassing ? Number(data.yearOfPassing) : null,
      mobile: data.mobile || null,
      whatsapp: data.whatsapp || null,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      postalCode: data.postalCode || null,
    },
  });

  return NextResponse.json({ profile: updated });
}
