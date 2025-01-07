// // import multer from "multer"

// // //creating multer middleware for parsing formdata

// // const storage = multer.diskStorage({
// //   filename:function(req,file,callback){
// //     callback(null,`${Date.now()}_${file.originalname}`)
// //   }
// // })

// // const upload = multer({storage})

// // export default upload;

// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(__dirname, "../uploads")); // Specify the upload folder
//   },
//   filename: function (req, file, callback) {
//     callback(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// export default upload;

///////////////////////////////////

// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;


import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;

