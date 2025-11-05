const PDFDocument = require('pdfkit');
const user1 = require("../data/user.js");
 

exports.buildPDF = (req, res) => {

    try {
        const userId = req.userId;
        const cuenta1 = user1.find(u => u.cuenta === userId);
        const doc = new PDFDocument();
        const fecha = new Date();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader('Content-Disposition', 'inline; filename="Certificado.pdf"');
        doc.on("error", (err) => { 
            console.error("Error generando pdf");
            if(!res.headersSet)
                res.status(500).json({error: "Error con pdf"});
            else
                res.destroy(err);
        });
        doc.pipe(res);

        doc.fillColor("black").fontSize(25).text("Certificado de Competencia");
        doc.fillColor("black").fontSize(25).text("Para " + cuenta1.nombre);
        doc.fillColor("black").fontSize(18).text("Por pasar con exito el examen de Java"); 
        doc.fillColor("black").fontSize(14).text("El dia " + fecha.toDateString);
        doc.fillColor("black").fontSize(14).text("En Aguacalientes");
        doc.fillColor("black").fontSize(14).text("CertiCLAN");
        doc.image('images/logo.jpg', { width: 100, height: 100 });
        doc.image('images/FirmaDiego', { width: 100, height: 100 });
        doc.fillColor("black").fontSize(20).text("Instructor(a)");
        doc.image('images/FirmaFer', { width: 100, height: 100 });
        doc.fillColor("black").fontSize(20).text("CEO");
        doc.end();

    } catch (error) {
        return res.status(500).json({error: "Error al generar el archivo"});
    }
};

exports.msgacceso = (req, res) =>{
    res.status(200).json({
        message: "Acceso permitido, yeiiii"
    });
}