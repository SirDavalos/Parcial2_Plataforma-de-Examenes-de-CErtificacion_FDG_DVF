
console.log("Ferrnando Davalos Gutierrez")
const API = "http://localhost:3000/api";
const btnCargar = document.getElementById("btnCargar");
const quizForm = document.getElementById("quizForm");
const listaPreguntas = document.getElementById("listaPreguntas");
const resultado = document.getElementById("resultado");
let preguntas = [];

btnCargar.addEventListener("click", async () => {
    const res = await fetch('http://localhost:3000/api/StartExam', {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    preguntas = data.questions;
    console.log(preguntas);

    listaPreguntas.innerHTML = "";
    let count = 0;
    preguntas.forEach(q => {
        count++;
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <p><strong>${count}.</strong> ${q.text}</p>
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

quizForm.addEventListener("submit", async e => {
    e.preventDefault();
    const answers = preguntas.map(q => {
    const selected = document.querySelector(`input[name="q_${q.id}"]:checked`);
    return { id: q.id, answer: selected ? selected.value : "" };
});

const res = await fetch(`http://localhost:3000/api/SubmitAnswers`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
});
const data = await res.json();
console.log(data);

resultado.innerHTML = `
    <h2>Resultado: ${data.score}/${data.total}</h2>
    ${data.details.map(d => `
            <div class="card">
            <p>${d.text}</p>
            <p>Tu respuesta: ${d.yourAnswer ?? "(sin responder)"}</p>
            <p>Correcta: ${d.correctAnswer}</p>
            <p class="${d.correct ? "ok" : "bad"}">
            ${d.correct ? " Correcto" : " Incorrecto"}
        </p>
    </div>
    `).join("")}
    `;

    if(data.score >= 6){
        const botonCertificado = document.createElement("button");
        botonCertificado.textContent = "Certificado";
        botonCertificado.addEventListener("click", async () => {
            try {
            console.log(data)
            const res = await fetch("http://localhost:3000/api/pdf", {
                method: "POST",
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" },
            });
            if(res.ok){
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener el pdf',
                    text: data?.error ?? `Error ${res.status}`,
                    confirmButtonColor: 'darkcyan'
                });
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", err);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.',
                confirmButtonColor: 'darkcyan'
            });
        }
        });
        resultado.appendChild(botonCertificado);
    }
});