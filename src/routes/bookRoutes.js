const express = require('express');

const bookRouter = express.Router();

const books = [
    {
        title: 'War and Peace',
        genre: 'Historical fiction',
        author: 'Lev Nekolayevich Tolstoy',
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H. G. Wells',
        read: false
    },
    {
        title: 'Eclipse',
        genre: 'Young Adult Fiction',
        author: 'I don\'t know',
        read: false
    }
];

bookRouter.route('/').get((req, res) => {
    res.render(
        'books', {
            nav: [{link: '/books', title: 'Books'},
                {link: '/authors', title: 'Authors'}],
            title: 'Library',
            books
        }
    );
});

bookRouter.route('/single').get((req, res) => {
    res.send('hello single book');
});

module.exports = bookRouter;