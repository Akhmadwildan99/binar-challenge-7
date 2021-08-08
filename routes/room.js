const router = require('express').Router();
const {Room} = require('../models');
const {v4: uuidv4} = require('uuid');


router.post('/generate', async(req, res) => {
    const room = await Room.create({
        id: uuidv4(),
        playerOneId: req.body.playerOneId,
        code: Date.now()
    });

    res.status(200).json({
        message: `sukses mengenerate room dengan id: ${room.id}`
    })
});

router.post('/join/:id', async(req, res) => {
    const room = await Room.findOne({where: {playerOneId: req.params.id}})
    if( room == null) 
        res.status(400).json({message: 'Gagal menemukan room!'})


    const joinRoom = await Room.update({
        playerTwoId: req.params.id
    },{where: {
        id: req.body.id
    }})

    if(joinRoom == 0)
        res.status(400).json({message: 'Gagal join ke dalam room'});
    res.status(200).json({
        message: 'Berhasil join ke room'
    })
})

router.post('/fight', async(req, res) => {
    const matchRoom = await Room.findOne({where: {id: req.body.id}});
    const player = await wichPlayer(req.body.userId, req.body.roomId);
    const matchInfo = matchRoom.matchInfo;

    if(matchInfo.every((el)=> el != ''))
        res.status(200).json({message: 'Match sudah berakhir!'})
    else {
        if(player == 'Player 1') {
            for(let i = 0; i < matchInfo.length; i+=2) {
                if(matchInfo[i] == '') {
                    matchInfo[i] = req.body.hand
                    break;
                }
            }
        } else if(player == 'Player 2') {
            for(let i = 0; i < matchInfo.length; i+=2) {
                if(matchInfo[i] == '') {
                    matchInfo[i] = req.body.hand
                    break;
                }
            }
        }
    }

    const match = await Room.update({matchInfo:matchInfo}, {where: {id: req.body.roomId}, returning: true});
    res.status(200).json(match);
})

router.post('/result', async(req, res)=> {
    matchRoom = await Room.findOne({where: {id: req.body.id}});
    matchInfo = matchRoom.matchInfo;
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
})

async function wichPlayer(id, roomId) {
    const matchRoom = await matchRoom.findOne({where: {id: roomId}});
    if(matchRoom == null || matchRoom == 0) {
        return 'Not found!';
    }
    if(id == matchRoom.playerOneId) {
        return 'Player 1';
    } else if(id == matchRoom.playerTwoId) {
        return 'Player 2';
    } else {
        return 'Not found!'
    }
}

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

module.exports = router