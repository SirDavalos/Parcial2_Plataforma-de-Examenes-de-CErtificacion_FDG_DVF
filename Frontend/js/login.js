// --- Manejo del modal de login y logout ---
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si hay sesión activa al cargar la página
  checkSession();

  // Abrir/cerrar modal de login
  document.getElementById('loginBtn').onclick = () => {
    document.getElementById('loginModal').style.display = 'block';
  };
  
  document.getElementById('closeModal').onclick = () => {
    document.getElementById('loginModal').style.display = 'none';
  };
  
  window.onclick = (e) => {
    if (e.target === document.getElementById('loginModal')) {
      document.getElementById('loginModal').style.display = 'none';
    }
  };

  // Manejar logout
  document.getElementById('logoutBtn').onclick = logout;
});

// Capturamos el formulario
const form = document.getElementById("formLogin");

// Escuchamos el evento "submit"
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // evita que la página se recargue

  const login = document.getElementById("login").value;
  const contrasena = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cuenta: login, contrasena: contrasena })
    });

    let data;
    try {
      data = await res.json();
    } catch (parseErr) {
      console.warn("Respuesta no JSON del servidor", parseErr);
      data = {};
    }

    if (res.ok) {
      const cuenta = data.usuario?.cuenta;
      const token = data.token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('userName', cuenta);

      Swal.fire({
        icon: 'success',
        title: 'Acceso permitido',
        text: `Bienvenido, ${cuenta}`,
        confirmButtonColor: 'darkcyan'
      });

      updateUILoggedIn(cuenta);
      document.getElementById('loginModal').style.display = 'none';
      document.getElementById("login").value = "";
      document.getElementById("password").value = "";

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: data?.error ?? `Error ${res.status}`,
        confirmButtonColor: 'darkcyan'
      });
      document.getElementById("login").value = "";
      document.getElementById("password").value = "";
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

// --- Función para verificar si hay sesión activa ---
function checkSession() {
  const userName = localStorage.getItem('userName');
  if (userName) {
    updateUILoggedIn(userName);
  } else {
    updateUILoggedOut();
  }
}

// --- Actualizar UI cuando hay sesión ---
function updateUILoggedIn(userName) {
  document.getElementById('userName').textContent = userName;
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'inline-block';
}

// --- Actualizar UI cuando NO hay sesión ---
function updateUILoggedOut() {
  document.getElementById('userName').textContent = '';
  document.getElementById('loginBtn').style.display = 'inline-block';
  document.getElementById('logoutBtn').style.display = 'none';
}

// --- Función para hacer logout ---
async function logout() {
  try {
    const res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
    });
    
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente.',
        confirmButtonColor: 'darkcyan'
      });
    } else {
      const data = await res.json();
      Swal.fire({
        icon: 'error',
        title: 'Error al cerrar sesión',
        text: data?.error ?? 'No se pudo cerrar sesión.',
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
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    updateUILoggedOut();
  }
}
