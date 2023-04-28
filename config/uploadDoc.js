const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "public/uploads/doc");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname + Date.now() + path.extname(file.originalname));

   }

})
const upload = multer({ storage });
module.exports = upload;