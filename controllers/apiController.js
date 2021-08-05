const {user_game, Biodata} = require('../models');

function format(user) {
    const {id, username, email} = user;
    return {
        id,
        username,
        email,
        token: user.generateToken()
    }
}


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
        

    },
    show: (req, res) => {
        user_game.findAll({include: Biodata})
            .then(data => res.status(200).json(data))
            .catch(err => {
                res.json(err)
            })
    },
    login: (req, res) => {
        user_game.authenticate(req.body)
            .then((user)=> {
                res.status(200).json(
                    format(user)
                )
            })
    },
    whoami: (req, res) => {
        const currentUser = req.user
        res.staus(200).json(currentUser)
    }
       
}