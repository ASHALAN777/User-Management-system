const express =require('express')
const create =require("../controllers/usercontroller")

const route = express.Router();

route.post("/user",create)



module.exports = route