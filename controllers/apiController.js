const {user_game} = require('../models');

module.exports = {
    registerApi: async (req, res) => {
        try {
            const user = await user_game.findAll();
            if(user.length === 0) {
                user_game.register({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    isAdmin: true
                })
                .then((user)=>{
                    res.status(200).json(user)
                })
            } else {
                user_game.register({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    isAdmin: false
                })
                .then((user)=>{
                    res.status(200).json(user)
                })
            }
        } catch (error) {
            console.log(error);
        }
        

    }
}