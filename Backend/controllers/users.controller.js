const users = require("../data/user.js");

exports.login = (req, res) => {
    //Extrae 'cuenta' del body de la peticion (proteccion contra body undefined)
    const { cuenta } = req.body || {};
    const contrasena = req.body?.contrasena ?? req.body?.["contraseña"];
    

    if(!cuenta || !contrasena){
        //Responde con error 400 Bad request si faltan datos
        return res.status(400).json({
            error: "Faltan campos obligatorios: 'cuenta' y 'contrasena'.",
            ejemplo: { cuenta: "Fernando", contrasena: "1234"}
        });
    }

    //Busca al usuario que coincida exactamente con cuenta y contraseña
    const match = users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);

    if (!match) {
        return res.status(401).json({error: "Credenciales invalidas"});
    }

    //Login exitoso
    return res.status(200).json({
        mensaje: "Acceso permitido",
        usuario: {cuenta: match.cuenta} //Devuelve la cuenta, NO la contraseña
    });
};