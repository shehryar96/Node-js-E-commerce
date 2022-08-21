const multer = require("multer");
var fs = require("fs");
var dir = "./public/uploads";   // PATH TO UPLOAD FILE
if (!fs.existsSync(dir)) {  // CREATE DIRECTORY IF NOT FOUND
  fs.mkdirSync(dir, { recursive: true });
}


function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
  
    // To reject this file pass `false`, like so:

    console.log(file.mimetype); 

    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' )
    {
        return  cb(null, true)
    }
    else{
        // To reject the file pass `true`, like so:
        return cb('Only png & jpg formats are allowed!', false)
    }
    // You can always pass an error if something goes wrong:
        return cb(new Error('I don\'t have a clue!'))
  
  }



const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine , fileFilter:fileFilter});
module.exports = upload;