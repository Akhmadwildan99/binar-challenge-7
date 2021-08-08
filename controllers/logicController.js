const passport = require('../lib/passport');
const {user_game, Biodata} = require('../models');
const bcrypt = require('bcrypt');

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
    loginAdmin: passport.authenticate('local',{ 
        successRedirect: '/dashboard',
        failureRedirect: '/loginAdmin',
        failureFlash: true 
    }),
    delete: (req, res) => {
        const user = user_game.findOne({
            where: {id: req.params.id}
        });
        if(!user){
            res.status(404);
            res.send('<h1>404</h1>');
        } else {
            user_game.destroy({
                where: {id: req.params.id}
            }).then(()=>{
                Biodata.destroy({
                    where:{userId: req.params.id}
                }).then(() =>{
                    req.flash('msg', 'Data user berhasil dihapus!');
                    res.redirect('/dashboard');
                }).catch(err=>{
                    res.status(422).json("Can't delete biodata data user") 
                })
                req.flash('msg', 'Data user berhasil dihapus!');
                res.redirect('/dashboard');
            }).catch(err=>{
                res.status(422).json("Can't delete data user")
            });
        }
    },
    updateData: (req, res) => {
        const { username, password, email} = req.body;
        const hashPassword =  bcrypt.hashSync(password, 10);

        user_game.update({
            username: username,
            password: hashPassword,
            email: email,
            isAdmin: false
        },
        {where:{id:req.params.id}})
        .then(()=>{
            req.flash('msg', 'Data user berhasil diedit!')
            res.redirect('/dashboard')
        }).catch((error)=>{
            req.flash('msg', 'periksa kembali username, email, dan no HP!')
            res.redirect('/update/data/:id')
        })
    }
    
}