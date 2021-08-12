const {user_game, Biodata, Room_game } = require('../models');
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
    history: (req, res) => {
        Room_game.findAll()
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
    generateRoom: (req, res) => {
            Room_game.create({
                RoomId: uuidv4(),
                playerOneId: req.user.id,
                playerOne: req.user.username

            })
            .then((room) => {
                res.status(200).json({
                    message: `sukses mengenerate room dengan id: ${room.roomId}`
                })  
            })
            .catch(err=> {
                res.status(401).json({
                    message: `Gagal mengenerate room!`
                }) 
            })   
    },
    joinRoom: async (req, res) => {
        const room = await Room_game.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if(room.playerOne == null) {
            res.send(400).json({
                message: 'Player One belum masuk room'
            })
        } else {
            Room_game.update({
                playerTwo: req.user.username,
                playerTwoId: req.user.id
            },
            {
                where:{
                    id: req.params.id
                }
            })
            .then(() => {
                res.status(200).json({
                    message: "player 2 berhasil masuk room"
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: "player 2 tidak berhasil masuk room"
                })
            })
        }
    },
    fight: async (req, res) => {
        const room =  await Room_game.findOne({
            where: {id: req.params.id}
        });
        const matchInfo = room.matchInfo
        const player = req.body.player
        const pilihan = req.body.pilihan

        if(room == null) {
            res.status(401).json({
                message: "Tidak ada room!"
            })
        }

        function whoPlay(player) {
            if(player == room.playerOne) {
                return "player 1"
            } else if(player == room.playerTwo) {
                return "Player 2"
            } else {
                return "not found"
            }
        };
        

        // if(matchInfo.every(el => el !== "")) {
        //     res.status(200).json({message: 'Match sudah berakhir!'})
        // } else {
            if(whoPlay(player) == 'Player 1') {
                for(let i = 0; i < matchInfo.length; i+=2) {
                    if(matchInfo[i] == '') {
                        matchInfo[i] = pilihan
                        break;
                    }
                }
                return matchInfo
            } else if(whoPlay(player) == 'Player 2') {
                for(let i = 0; i < matchInfo.length; i+=2) {
                    if(matchInfo[i] == '') {
                        matchInfo[i] = pilihan
                        break;
                    }
                }
                return matchInfo
            }
        

            Room_game.update({matchInfo: matchInfo},
            {where: {id: req.params.id}})
            .then((match)=>{
                res.status(200).json(match);
            })
            .catch(err => {
                res.status(400).json({
                    message: "Gagal memasukan hasil pilihan pemain!"
                })
            })
        

    },
    result: async (req, res) => {
        const room = await Room_game.findOne({where: {id: req.params.id}});
        const matchInfo = room.matchInfo;

        function getWinner(matchset) {
            matchstring = matchset.join('')
            switch(matchstring) {
                case 'RR':
                case 'PP':
                case 'SS':
                    return 'Draw'
                case 'RS':
                case 'SP':
                case 'PR':
                    return 'Player 1 Win'
                case 'SR':
                case 'PS':
                case 'RP':
                    return 'Player 2 Win'
                default:
                    return 'MatchBElum selesai';
            }
        }
        let winner = '';
        switch (req.body.round) {
            case 1:
                winner = getWinner(matchInfo.slice(0,2))
                break;
            case 2:
                winner = getWinner(matchInfo.slice(2,4))
                break;
            case 3:
                winner = getWinner(matchInfo.slice(4,6))
                break;
            default:
                break;
        }
        console.log(winner)

        if(winner != '')
            res.json({message: winner})
        else
            res.json({message: 'error'})
        }
       
}