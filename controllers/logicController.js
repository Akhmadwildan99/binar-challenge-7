const {user_game, user_biodata} = require('../models');

module.exports = {
    register: async (req, res) => {
        const { username, password, email, firstname, lastname, age, phone} = req.body;
        try {
            const user = await user_game.findAll();
            const userUnique = await user_game.findOne({
                where: {username : username}
            });
            if(user.length === 0) {
                if(userUnique > 0) {
                    res.render('register', {
                        title: 'Halaman Register',
                        css: 'register',
                        errors: 'Username has been exist' 
                    });
                } else {
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
                        })

                        res.redirect('/')
                    })
                }
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
                    })
                    res.redirect('/')
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}