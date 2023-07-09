//Configuration de l'upload de fichiers avec Multer.
const path=require('path');
const multer=require('multer');
const fs=require('fs');
const storage=multer.diskStorage({
  destination(req, file, cb) {
    const assetsPath = path.join(__dirname, '..', 'assets');
    cb(null,assetsPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadFile=multer({storage:storage});
module.exports=uploadFile;