import { PDFDocument, rgb, StandardFonts, type PDFFont, type PDFPage } from 'pdf-lib';
import { prisma } from '@/lib/prisma';

/** e.g. DAI-CERT-2026-000123 — unique, used for public verification lookups. */
export async function generateCertificateNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.certificate.count();
  return `DAI-CERT-${year}-${String(count + 1).padStart(6, '0')}`;
}

/** Renders a clean, single-page A4-landscape certificate PDF and returns the raw bytes. */
export async function renderCertificatePdf(params: {
  studentName: string;
  courseTitle: string;
  certificateNumber: string;
  issueDate: Date;
  instituteName: string;
}): Promise<Uint8Array> {
  const { studentName, courseTitle, certificateNumber, issueDate, instituteName } = params;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([842, 595]); // A4 landscape, points
  const { width, height } = page.getSize();

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const navy = rgb(0.04, 0.06, 0.15);
  const accent = rgb(0.24, 0.42, 1);
  const muted = rgb(0.4, 0.44, 0.55);

  // Border
  page.drawRectangle({
    x: 24, y: 24, width: width - 48, height: height - 48,
    borderColor: accent, borderWidth: 2,
  });
  page.drawRectangle({
    x: 34, y: 34, width: width - 68, height: height - 68,
    borderColor: muted, borderWidth: 0.75,
  });

  const centerText = (text: string, y: number, font = regular, size = 14, color = navy) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - textWidth) / 2, y, font, size, color });
  };

  centerText(instituteName.toUpperCase(), height - 90, bold, 16, accent);
  centerText('CERTIFICATE OF COMPLETION', height - 150, bold, 28, navy);
  centerText('This is to certify that', height - 210, italic, 13, muted);
  centerText(studentName, height - 255, bold, 30, navy);
  centerText('has successfully completed the course', height - 300, italic, 13, muted);
  centerText(courseTitle, height - 340, bold, 22, accent);

  centerText(
    `Issued on ${issueDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    height - 400,
    regular,
    11,
    muted
  );

  // Footer: certificate number (left) + signature line (right)
  page.drawText(`Certificate No: ${certificateNumber}`, { x: 60, y: 55, font: regular, size: 10, color: muted });
  page.drawText('Verify at /verify-certificate', { x: 60, y: 40, font: regular, size: 9, color: muted });

  page.drawLine({ start: { x: width - 260, y: 75 }, end: { x: width - 60, y: 75 }, thickness: 0.75, color: muted });
  centerAt(page, 'Authorized Signatory', width - 160, 58, regular, 10, muted);

  return pdfDoc.save();
}

function centerAt(page: PDFPage, text: string, centerX: number, y: number, font: PDFFont, size: number, color: ReturnType<typeof rgb>) {
  const textWidth = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: centerX - textWidth / 2, y, font, size, color });
}
