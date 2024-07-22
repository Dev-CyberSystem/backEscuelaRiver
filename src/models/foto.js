import { DataTypes } from "sequelize";
import  db  from "../db/connection";
import Usuario from "./usuario";

const Foto = db.define('Foto', {
    idfoto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        url: {
        type: DataTypes.STRING
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Usuario',
            key: 'idusuario'
        }
    }
}, {
    modelName: 'Foto',
    tableName: 'fotos',
});

export default Foto;
