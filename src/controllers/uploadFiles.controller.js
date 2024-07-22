import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import foto from '../models/foto'; // Asegúrate de que esta importación sea correcta y necesaria

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtro de archivos para permitir solo imágenes
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: El archivo debe ser una imagen válida'));
};

// Middleware de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Límite de tamaño de archivo: 5MB
}).single('file');

// Configuración de cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFiles = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Errores específicos de multer
            return res.status(400).json({ msg: `Multer error: ${err.message}` });
        } else if (err) {
            // Errores generales
            return res.status(400).json({ msg: `Error: ${err.message}` });
        }
        if (!req.file) {
            return res.status(400).json({ msg: 'No se ha subido ningún archivo' });
        }

        cloudinary.uploader.upload(req.file.path, { folder: 'uploads' }, (error, result) => {
            if (error) {
                return res.status(500).json({ msg: `Error: ${error.message}` });
            }
            if (result) {
                res.json({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            } else {
                return res.status(500).json({ msg: 'Error: Result is undefined' });
            }
        });
    });
};
