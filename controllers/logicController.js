const {user_game, user_biodata} = require('../models');

module.exports = {
    register: async (req, res) => {
        const { username, password, email, firstname, lastname, age, phone} = req.body;
            const user = await user_game.findAll();
            if(user.length === 0) {
                user_game.register({
                    username: username,
                    password: password,
                    email: email,
                    isAdmin: true
                }).then((user_game)=>{
                    user_biodata.create({
                        firstname: firstname,
                        lastname: lastname,
                        age: age, 
                        phone: phone,
                        userId: user_game.get('id')
                    }).then(()=>{
                        res.redirect('/')
                    }).catch((error)=>{
                        console.log(error)
                    })
                    res.redirect('/')
                }).catch((error)=>{
                    req.flash('msg', 'periksa kembali username, email, dan no HP!')
                    res.redirect('/register')
                })
            } else {
                user_game.register({
                    username: username,
                    password: password,
                    email: email,
                    isAdmin: false
                }).then((user_game)=>{
                    user_biodata.create({
                        firstname: firstname,
                        lastname: lastname,
                        age: age, 
                        phone: phone,
                        userId: user_game.get('id')
                    }).then((data)=>{
                        res.redirect('/')
                    }).catch((error)=>{
                        console.log(error);
                    })
                    res.redirect('/')
                }).catch((error)=>{
                    req.flash('msg', 'periksa kembali username, email, dan no HP!')
                    res.redirect('/register')
                })
            }
        
    }
}