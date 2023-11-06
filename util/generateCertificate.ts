import fs from 'fs';
import PDFDocument from 'pdfkit';

function generateCertificate(recipientName: string, courseName: string, outputPath: string,hash:string): void {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(outputPath);

  doc.pipe(stream);

  // Load custom fonts
  doc.registerFont('YourCustomFont-Regular', 'util/Pacifico.ttf');
  doc.registerFont('YourCustomFont-Bold', 'util/Pacifico.ttf');

  // Background image
  doc.image('util/tp244-bg1-07.jpg', 0, 0, { width: 612 });

  // Customize the certificate design
  doc.fontSize(36).font('YourCustomFont-Bold').text('Certificate of Completion', 100, 50);
  doc.fontSize(24).font('YourCustomFont-Regular').text('This is to certify that', 100, 130);
  doc.fontSize(36).font('YourCustomFont-Bold').text(recipientName, 120, 180);
  doc.fontSize(24).font('YourCustomFont-Regular').text('has successfully completed the', 100, 250);
  doc.fontSize(36).font('YourCustomFont-Bold').text(courseName, 100, 300);
  doc.fontSize(8).font('YourCustomFont-Bold').text(hash, 500, 250);
//   doc.image("100x.png", 400, 50, { width: 100 });

  // Finalize the document and save it
  doc.end();
  stream.on('finish', () => {
    console.log(`Certificate saved to ${outputPath}`);
  });
}

// Usage


export default generateCertificate