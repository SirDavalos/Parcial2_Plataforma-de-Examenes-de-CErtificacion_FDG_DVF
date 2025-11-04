const botonR = document.getElementById("realizar");
const botonP = document.getElementById("pagar");

botonR.addEventListener("click", async() => {
    try {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (res.ok) {
      alert('Sesión cerrada correctamente');
    } else {
      const data = await res.json();
      alert(data?.error ?? `Error al cerrar sesión`);
    }
    }catch (err) {
        console.error("Error al conectar con el servidor:", err);
        alert("Error de conexión");
  }
});