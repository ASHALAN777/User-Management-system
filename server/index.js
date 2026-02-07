const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./Models/db");
require("./middleware/Cronjob");


const AuthRouter = require("./Routes/Router");
const frontend_url = process.env.FRONTEND_URL;

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS FIRST
app.use(
  cors({
    origin: `${frontend_url}`, // EXACT frontend URL
    credentials: true,               // allow cookies
  })
);

// ✅ THEN parsers
app.use(cookieParser());
app.use(express.json());
require("./middleware/Cronjob");

// ✅ THEN routes
app.use("/api/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


