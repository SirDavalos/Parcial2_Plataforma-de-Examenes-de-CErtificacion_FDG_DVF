const botonR = document.getElementById("realizar");
const botonP = document.getElementById("pagar");

botonP.addEventListener("click", async() => {
    try {
    const res = await fetch("http://localhost:3000/api/payment", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (res.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Sesion cerrasa',
            text: 'Ha cerrado la sesion correctamente',
            confirmButtonColor: 'darkcyan'
        });
    } else {
      const data = await res.json();
        Swal.fire({
            icon: 'error',
            title: 'Error al cerrar sesion',
            text: data?.error ?? `Error ${res.status}`,
            confirmButtonColor: 'darkcyan'
        });
    }
    }catch (err) {
        console.error("Error al conectar con el servidor:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor.',
            confirmButtonColor: 'darkcyan'
        });
  }
});

botonR.addEventListener("click", async() => {
   try {
    const res = await fetch("http://localhost:3000/api/examen", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (res.ok) {
      Swal.fire({
            icon: 'success',
            title: 'Sesion cerrasa',
            text: 'Ha cerrado la sesion correctamente',
            confirmButtonColor: 'darkcyan'
        });
    } else {
      const data = await res.json();
        Swal.fire({
            icon: 'error',
            title: 'Error al cerrar sesion',
            text: data?.error ?? `Error ${res.status}`,
            confirmButtonColor: 'darkcyan'
        });
    }
    }catch (err) {
        console.error("Error al conectar con el servidor:", err);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor.',
            confirmButtonColor: 'darkcyan'
        });
  } 
});