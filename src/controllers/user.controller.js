import UserModel from "../models/users.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
// update user

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, admin } = req.body;
    const updateUsuario = await UserModel.findByIdAndUpdate(
      id,
      { nombre, apellido, admin },
      { new: true }
    );
    res.json(updateUsuario);
  } catch (error) {
    console.log(error);
  }
};

// delete user

const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.log(error);
  }
};

// get user by id

// registro

const registroUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, admin } = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      nombre,
      apellido,
      email,
      password: passwordHash,
      admin,
    });
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// login

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body; // capturamos el email y el password del body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor rellene todos los campos" });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Usuario o Contraseña incorrecta" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Usuario o Contraseña incorrecta" });
    }
    // res.json({ message: "Bienvenido" });

    const token = jwt.sign(
      {
        // creando el payload del token
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        admin: user.admin,
      },
      process.env.SECRET, // pasamos la clave secreta

      { expiresIn: 15000 } // tiempo de expiración del token
    );

    res
      .header("Authorization", `Bearer ${token}`)
      .json({ error: null, data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default {
  getAllUsers,
  registroUsuario,
  deleteUsuario,
  updateUser,
  loginUsuario,
};
