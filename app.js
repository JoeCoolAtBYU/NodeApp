const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// const sql = require('mssql');
const {mongoClient} = require('mongodb');
const bodyParser = require('body-parser');

const title = 'Library';

const app = express();

const port = process.env.PORT || 3000;

// this is for sqlServer database config with Azure
// const config = {
//     user: 'library',
//     password: 'password123!',
//     server: 'pslibraryjb.database.windows.net',
//     database: 'PSLibrary',
//
//     options: {
//         encrypt: true // use this if you're on Windows Azure
//     }
// };

const nav = [
    {link: '/books', title: 'Book'},
    {link: '/authors', title: 'Author'}
];

const bookRouter = require('./src/routes/bookRoutes')(nav, title);
const adminRouter = require('./src/routes/adminRoutes')(nav, title);
const authRouter = require('./src/routes/authRoutes')(nav, title);

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.render(
        'index', {
            nav: [{link: '/books', title: 'Books'},
                {link: '/authors', title: 'Authors'}],
            title
        });
});

app.listen(port, () => {
    debug(`Listening on port ${chalk.green(port)}`);
});
