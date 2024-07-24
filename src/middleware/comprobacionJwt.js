import jwt from "jsonwebtoken";

const comprobacionJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No hay token" });
  }
  
  try {
    const verificacionToken = jwt.verify(token, process.env.SECRET);
    req.usuario = verificacionToken;

    if (verificacionToken.admin) {
      next();
    } else {
      return res.status(401).json({ message: "No tienes permisos" });
    }
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(401).send("Acceso denegado, token no válido");
  }
};

export default comprobacionJwt;
