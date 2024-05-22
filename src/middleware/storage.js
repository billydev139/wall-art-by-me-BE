import multer, { diskStorage } from "multer";
import { config } from "dotenv";
import randomstring from "randomstring";
import path from "path";

config();

const fileType = (file, cb) => {
  let allow = /jpeg|jpg|png|svg|gif/;
  const isMatch = allow.test(path.extname(file.originalname).toLowerCase());
  const isMIME = allow.test(file.mimetype);

  if (isMIME && isMatch) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const profileImg = multer({
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/artCollection");
    },
    filename: (req, file, cb) => {
      let p1 = randomstring.generate(6);
      let p2 = randomstring.generate(6);
      let ext = path.extname(file.originalname).toLowerCase();

      cb(null, file.fieldname + "_" + p1 + p2 + ext);
    },
  }),

  fileFilter: (req, file, cb) => {
    fileType(file, cb);
  },
}).array("image", 10);
