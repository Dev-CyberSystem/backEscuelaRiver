import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Estas dos líneas permiten obtener el valor de __dirname en un entorno ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la ruta absoluta para la carpeta de subidas
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    console.log(`Destination path: ${uploadPath}`);
    cb(null, uploadPath); // Guardar los archivos en la carpeta uploads
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
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
});

export default upload;
