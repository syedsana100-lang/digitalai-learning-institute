// Shared server-side validation for student document uploads. Never trust
// the client — this runs again on the API route regardless of what the
// upload widget already checked.

export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
] as const;

export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function validateDocumentFile(file: { type: string; size: number }): string | null {
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type as (typeof ALLOWED_DOCUMENT_TYPES)[number])) {
    return 'Only PDF, JPG and PNG files are allowed.';
  }
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return 'File is too large — maximum size is 10 MB.';
  }
  if (file.size === 0) {
    return 'File appears to be empty.';
  }
  return null;
}
