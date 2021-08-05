const {user_game, Biodata} = require('../models');

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
                    Biodata.create({
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
                    req.flash('msg', 'Data Admin berhasil ditambahkan!')
                    res.redirect('/loginAdmin')
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
                    Biodata.create({
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
                    req.flash('msg', 'Data user berhasil ditambahkan!')
                    res.redirect('/loginUser')
                }).catch((error)=>{
                    req.flash('msg', 'periksa kembali username, email, dan no HP!')
                    res.redirect('/register')
                })
            }
        
    },
    
}