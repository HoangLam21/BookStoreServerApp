import React from 'react';
import jsPDF from 'jspdf';

const GeneratePDF = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Hello world!", 10, 10);
    doc.save("document.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default GeneratePDF;