let express = require('express');
let app = express();

const path = require('path');

var Mustache = require('mustache')
var i18n = require('mustache-i18n')(Mustache)
app.set('views', `${__dirname}/views`);
app.set('view engine', 'mustache');
app.engine('mustache', require('mustache-express')());

app.use(require('body-parser').urlencoded({extended : true}));

const fs = require('fs');

app.use('/:lang(fr|en)', (req, res, next) => {
    const file = fs.readFileSync(`./localization/${req.params.lang}.json`)
    const obj = JSON.parse(file.toString());
    i18n.use(obj)
    next();
})

app.use('/:lang(fr|en)', require('./routes/mainRoutes'));

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, function() {
    console.log("Server started");
});