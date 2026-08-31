// Pure, dependency-free helpers — safe to import from both server code and
// client components. Anything that touches prisma/auth stays in
// lib/lms/auth-helpers.ts, which must never be imported from a client
// component (it would try to bundle the Prisma client into the browser).

export function calculatePending(finalPrice: number, amountPaid: number) {
  return Math.max(0, finalPrice - amountPaid);
}

export function paymentStatusLabel(finalPrice: number, amountPaid: number): 'Paid' | 'Partially Paid' | 'Pending' {
  if (amountPaid <= 0) return 'Pending';
  if (amountPaid >= finalPrice) return 'Paid';
  return 'Partially Paid';
}
