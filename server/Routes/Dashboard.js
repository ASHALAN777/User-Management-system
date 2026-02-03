const ensureauth = require('../middleware/Auth');

const router = require('express').Router();

router.get('/' ,ensureauth,(req,res) => {
    return res.status(200).json([{
        name:"alan",
        price:2000
    },
    {
        name:"nigga",
        price:2000
    }


          ])
});


module.exports=router