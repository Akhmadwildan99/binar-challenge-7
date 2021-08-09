const {user_game, Biodata, room } = require('../models');
const {v4: uuidv4} = require('uuid');

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
        res.json(currentUser)
    },
    generateRoom:  (req, res) => {
            room.create({
                userId: req.user.id,
                playerOneId: uuidv4(),
                playerTwoId: uuidv4(),
            })
            .then((data)=>{
                res.status(200).json({message: `berhasil mengenarate room denagn id: ${data.userId}`});  

            })
            .catch((error)=> {
                res.status(401).json({message: "belum terautentikasi", error}) 
            });    
    },
    joinRoom: (req, res) => {
        room.findOne({where:
            {
                playerOneId: req.params.id
            }
            })
            .then((data)=> {
            res.status(200).json({
                message: 'Berhasil join ke room'
            })
            })
            .catch(err => {
            res.status(400).json({message: 'Gagal menemukan room!'})
            })   
    },
    fight: (req, res) => {
        const {playerOne, playerTwo} = req.body;
        room.findOne({where:
            {
                playerOneId: req.params.id
            }
            })
            .then((data)=>{
                room.update({
                    playerOne: playerOne,
                    playerTwo: playerTwo
                },
                {
                    where: {
                        playerOneId: req.params.id
                    }
                })
                .then(()=> {
                    res.status(200).json({message: 'Berhasil menambah data pilihan pemain!'})
                })
                res.status(200).json({message: 'Berhasil menambah data pilihan pemain!'})
            })

    },
    result: async (req, res) => {
        const { playerOne, playerTwo } = req.body
        // const getHasil = (playerOne, playerTwo) => {
        //     if( playerOneId == playerTwo) return 'Draw';  
        //     if( playerOne == 'rock')return( playerTwo == 'scissors') ? 'Player One' : 'Player Two';
        //     if( playerOne == 'scissors')return( playerTwo == 'rock') ? 'player Two' : 'Player One';
        //     if( player == 'paper')return( comp == 'scissors') ? 'player Two' : 'player One';  
        //  }
        // const hasil =  getHasil(playerOne, playerTwo)
        room.findOne({where:
            {
                playerOneId: req.params.id
            }
            })
            .then((data)=>{
                room.update({
                    playerOne: playerOne,
                    playerTwo: playerTwo,
                    matchInfo: [playerOne, playerTwo, req.body.matchInfo]
                },
                {
                    where: {
                        playerOneId: req.params.id
                    }
                })
                .then(()=> {
                    res.status(200).json({message: 'Berhasil menambah data pilihan pemain!'})
                })
                res.status(200).json({message: 'Berhasil menambah data pilihan pemain!'})
            })
            .catch(err => {
                res.status(401).json({message: 'gagal menambahakan data!'})
            })
    }
       
}