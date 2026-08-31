export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
] as const;

export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const DOCUMENT_TYPE_OPTIONS = [
  { value: 'GOVERNMENT_ID', label: 'Government ID Proof (Aadhaar / PAN / Passport)' },
  { value: 'EDUCATIONAL_CERTIFICATE', label: 'Educational Certificate' },
  { value: 'QUALIFICATION_DOCUMENT', label: 'Qualification Document' },
  { value: 'OTHER', label: 'Other' },
] as const;

export function validateDocumentFile(file: { type: string; size: number }): string | null {
  if (!ALLOWED_DOCUMENT_TYPES.includes(file.type as (typeof ALLOWED_DOCUMENT_TYPES)[number])) {
    return 'Only PDF, JPG and PNG files are allowed.';
  }
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return 'File is too large — the maximum size is 10 MB.';
  }
  return null;
}
