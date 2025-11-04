const { verifyPaymentTrue, verifyPaymentFalse } = require("../../Backend/middleware/middleware");

const btnExamen = document.getElementById("boton-examen");
const btnPago = document.getElementById("boton-pago");

btnPago.addEventListener("submit", async () =>{
    
    try {
        
    } catch (err) {
        console.error("Error al conectar con el servidor:", err);
        Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor.',
        confirmButtonColor: 'darkcyan'
    });
  }

    console.log("Acceso a controller/questions.controller.js")
    const data = await res.json();
    console.log("Acceso al data/questions");
    console.log(data);
    preguntas = data.questions;

    listaPreguntas.innerHTML = "";
    preguntas.forEach(q => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
        <p><strong>${q.id}.</strong> ${q.text}</p>
        ${q.options.map(opt => `
        <label>
            <input type="radio" name="q_${q.id}" value="${opt}"> ${opt}
        </label><br>
        `).join("")}
    `;
    listaPreguntas.appendChild(div);
    });
    quizForm.style.display = "block";
    resultado.innerHTML = "";    
    
    
});