
// Capturamos el formulario
const form1 = document.getElementById("contact-form");

// Escuchamos el evento "submit"
form1.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que la página se recargue

  const nombreU = document.getElementById("nom").value ;
  const correoU = document.getElementById("e-mail").value;
  const asuntoU = document.getElementById("asunto").value;
  const mensajeU = document.getElementById("mensaje").value;

  try {
    const res = await fetch("http://localhost:3000/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nombreU, correo: correoU, asunto: asuntoU, mensaje: mensajeU})
    });

    let data;
    try {
      data = await res.json();
    } catch (parseErr) {
      console.warn("Respuesta no JSON del servidor", parseErr);
      data = {};
    }

    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado',
        text: 'El mensaje se envio correctamente',
        confirmButtonColor: 'darkcyan'
      });
    } else {
      const data = await res.json();
      Swal.fire({
        icon: 'error',
        title: 'Error al mandar mensaje',
        text: data?.error ?? 'No se pudo mandar el mensaje',
        confirmButtonColor: 'darkcyan'
      });
    }

  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor.',
      confirmButtonColor: 'darkcyan'
    });
  }
});