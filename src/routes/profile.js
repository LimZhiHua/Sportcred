const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post("/update-acs", async (req, res) => {
    const userID = req.body.userID
    const updateVal = req.body.change
    const query = {_id: userID}
    const user = await User.findOne(query).catch((err)=>{return res.status(400).send(err)})
    console.log("user acs is", user.acs)
    const newACS = user.acs + updateVal
    console.log("updateVal is", updateVal)
    const update = { acs: newACS}
    try{
        await User.updateOne(query, update, {})   
        return res.status(200).send({msg: "User's acs changed"})
    }catch(err){
        console.log(err)
        return res.status(400).send("user's acs could not be updated")
    }


})

module.exports = router;
