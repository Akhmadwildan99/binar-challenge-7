const {user_game, user_biodata} = require('../models');

module.exports = {
    register: async (req, res) => {
        const { username, password, email, firstname, lastname, age, phone} = req.body;
        try {
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
                    }).then((data)=>{
                        res.redirect('/')
                    }).catch((err)=>{
                        res.status(400).send(err);
                    })

                    res.redirect('/')
                }).catch((err)=>{
                    res.status(400).send(err);
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
                    }).catch((err)=>{
                        req.flash('msg', 'Masukan username lain!')
                        res.redirect('/register')
                    })
                    res.redirect('/')
                }).catch((err)=>{
                    req.flash('msg', 'Masukan username lain!t')
                    res.redirect('/register')
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}