/**
 * Creates (or promotes) an Admin account for the student portal.
 *
 * Usage:
 *   npm run make-admin -- admin@digitalai.in "A Strong Password123"
 *
 * If a user with that email already exists, it's promoted to ADMIN
 * (password left unchanged unless you pass one). Otherwise a new ADMIN
 * account is created with the given email + password.
 */
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  const [, , email, password] = process.argv;
  if (!email) {
    console.error('Usage: npm run make-admin -- <email> [password]');
    process.exit(1);
  }
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        role: 'ADMIN',
        ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
      },
    });
    console.log(`✔ ${normalizedEmail} promoted to ADMIN.`);
    return;
  }

  if (!password) {
    console.error('No existing user with that email — pass a password to create a new admin account.');
    console.error('Usage: npm run make-admin -- <email> "<password>"');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email: normalizedEmail, name: 'Admin', role: 'ADMIN', passwordHash },
  });
  console.log(`✔ New ADMIN account created for ${normalizedEmail}.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
