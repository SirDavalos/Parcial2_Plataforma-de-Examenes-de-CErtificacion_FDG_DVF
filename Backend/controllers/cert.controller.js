const PDFDocument = require('pdfkit');
const user = require("../data/user.js");
 

exports.buildPDF = (req, res) => {

    const userId = req.userId;
    const cuenta = user.find(u => u.cuenta === userId);
    try {
        const doc = new PDFDocument();
        const fecha = new Date();
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename='Certificado.pdf'");
        doc.pipe(res);

        doc.fillColor("black").fontSize(25).text("Certificado de Competencia");
        doc.fillColor("black").fontSize(25).text("Para " + cuenta.nombre);
        doc.fillColor("black").fontSize(18).text("Por pasar con exito el examen de Java"); 
        doc.fillColor("black").fontSize(14).text("El dia " + fecha.toDateString);
        doc.fillColor("black").fontSize(14).text("En Aguacalientes");
        doc.fillColor("black").fontSize(14).text("CertiCLAN");
        doc.image('images/logo.jpg', { width: 100, height: 100 });
        doc.image('images/FirmaDiego', { width: 100, height: 100 });
        doc.fillColor("black").fontSize(20).text("Instructor(a)");
        doc.image('images/FirmaFer', { width: 100, height: 100 });
        doc.fillColor("black").fontSize(20).text("CEO");
        
    } catch (error) {
        
    }
}