const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
app.use(express.static('public'))
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get('/', function (req, res) {
    res.render('home', { selected: { home: true}}
  })


app.get('/login', function (req, res) {
    res.render('login')
})

app.get('/registration', function (req, res) {
    res.render('registration')
})

app.get('/mensajes', function (req, res)){
		res.render('mensajes', { selected: { mensajes: true}}
	})


app.listen(3000)
