const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./Models/db");
require("./middleware/Cronjob");


const AuthRouter = require("./Routes/Router");

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS FIRST
app.use(
  cors({
    origin: `${front_url}`, // EXACT frontend URL
    credentials: true,               // allow cookies
  })
);

// ✅ THEN parsers
app.use(cookieParser());
app.use(express.json());
require("./middleware/Cronjob");

// ✅ THEN routes
app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
