const {user_game, Biodata} = require('../models')

module.exports = {
    home: (req, res) => {
        res.render('landingPage', {
            title: "Halaman Home",
            css: "landingPage.css"
        })
    },
    register: (req, res) => {
        res.render('register', {
            title: 'Halaman Register',
            css: 'register.css',
            msg: req.flash('msg'),
        })
    },
    loginAdmin: (req, res) => {
        res.render('loginAdmin', {
            title: 'Halman Login Admin',
            css: 'login.css',
            msg: req.flash('msg'),
        })
    },
    loginUser: (req, res) => {
        res.render('loginUser', {
            title: 'Halman Login USer',
            css: 'login.css',
            msg: req.flash('msg'),
        })
    },
    dashboard: async (req, res) => {
        try {
            const users = await user_game.findAll({
                include: Biodata,
                where: {
                    isAdmin: false
                }
                
            });
            res.render('dashboard', {
             title: 'Halman Dashboard',
             css: 'dashboard.css',
             users,
             Biodata
         })    
        } catch (err) {
            res.status(500).json(err,{
                mssage: "tidak bisa menampilkan data dashbord"
            });
        }
           
    }
    
}
