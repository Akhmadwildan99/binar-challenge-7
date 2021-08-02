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
    login: (req, res) => {
        res.render('login', {
            title: 'Halman Login',
            css: 'login'
        })
    }
}
