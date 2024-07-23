import multer from 'multer';
import path from 'path';

// Definir la ruta absoluta para la carpeta de subidas
const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Destino de almacenamiento:', path.join(__dirname, 'uploads'));
    cb(null, path.join(__dirname, 'uploads')); // Guardar los archivos en la carpeta uploads
  },

  filename: function (req, file, cb) {
    console.log('Nombre del archivo:', `${Date.now()}-${file.originalname}`);

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
