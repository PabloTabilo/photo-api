import multer from "multer";
import uuid from "uuid/v4";
import path from "path";

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req,file,cb) => {
        cb(null,uuid()+path.extname(file.originalname)) // id unicos + guarda el formato o extension (png o jpeg)
        // ejemplo: akdjsalkdjañlkfjasñlk.png
    }
});

export default multer({storage});