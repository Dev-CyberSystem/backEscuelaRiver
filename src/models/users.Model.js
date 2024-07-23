import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
