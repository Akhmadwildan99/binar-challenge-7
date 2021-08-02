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
    }
}
