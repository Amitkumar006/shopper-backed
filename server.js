require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")

const app = express()
const PORT = process.env.PORT || 4000

//connecting to the database
dbConnect()

// 👇️ configure CORS
app.use(cors());

app.use(morgan("dev"))

//parser requests of content-type --application/json
app.use(bodyParser.json())

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())

//define a route
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

// Image Storage Engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    console.log(file);
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`
  })
})

app.use('/images', express.static('upload/images'));

app.listen(PORT, (error) => {
  if (!error) {
    return console.log(`Server Running on port ${PORT}`);
  }
  console.log("Error : ", error)
});