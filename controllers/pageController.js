const {user_game, user_biodata} = require('../models')

module.exports = {
    home: (req, res) => {
        res.render('landingPage', {
            title: "Halaman Home",
            css: "landingPage"
        })
    },
    register: (req, res) => {
        res.render('register', {
            title: 'Halaman Register',
            css: 'register',
            msg: req.flash('msg'),
        })
    },
    loginAdmin: (req, res) => {
        res.render('loginAdmin', {
            title: 'Halman Login Admin',
            css: 'login',
            msg: req.flash('msg'),
        })
    },
    loginUser: (req, res) => {
        res.render('loginUser', {
            title: 'Halman Login USer',
            css: 'login',
            msg: req.flash('msg'),
        })
    },
    dashboard: (req, res) => {
            user_game.findAll({include: user_biodata})
                .then((datas) => {
                    res.render('dashboard', {
                        title: 'Halman Dashboard',
                        css: 'dashboard',
                        datas,
                        user_biodata
                    })
                }).catch(err=> {
                    res.status(500).json(err)
                })
        
    }
    
}
