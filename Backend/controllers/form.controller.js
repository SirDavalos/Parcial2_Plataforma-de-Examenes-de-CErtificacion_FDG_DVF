const mensajes = [];

exports.submit_form = (req, res) => {
  const { nombre, correo, asunto, mensaje} = req.body || {};

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({
      error: "Faltan campos obligatorios: 'nombre', 'correo' y 'mensaje'."
    });
  }

  const form = {
    nombre,
    correo,
    asunto,
    mensaje
  };

  mensajes.push(form);

  console.log(`Mensaje recibido \n ${mensajes}`);


  return res.status(200).json({
    mensaje: "Mensaje recibido"
  });
};
