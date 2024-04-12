const express = require('express')
const app = express()
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const helmet = require('helmet');
const list_books = require('./books_list.json')
const search_book = require('./search_book.json')

app.use(helmet());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.options('*', function(req, res) {
	res.send(200);
});

// Routes

// Challenge 1
app.get('/GET/hello', (err, res) => {
	res.status(200);
    res.setHeader("Content-Type", "text/plain");
    res.send('Hello, world!');
	res.end();
});

// Challenge 2
app.get('/GET/books', (err, res) => {
	res.status(200);
    res.setHeader("Content-Type", "application/json");
    res.send(list_books)
	res.end();
});

// Challenge 3 by ID
app.post('/GET/books', (req, res) => {
    var books = new Map()
    let param = req.query.id
    
    for (book of search_book.books) {
        books.set(book.id, book)
    }

    let search = books.get(param)
    
	if(search != undefined){
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.send({
            id: search.id,
            title:search.title, 
            author:search.author,
            price:search.price,
            availability: search.availability,
            num_reviews:search.num_reviews,
            stars:search.stars,
            description: search.description
        }) 
	    res.end();
    }else{
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.send({error: 'Not fount'})
        res.end()
    }
});


// Challenge 4 http:localhost/GET/books?price=861.04
app.post('/GET/books', (req, res) => {

    var books = new Map()
    let param = req.query.price
    let check = Number.isNaN(parseFloat(param))
    
    for (book of search_book.books) {
        books.set(book.price, book)
    }

    let search = books.get(parseFloat(param))
    
    if(check){
        res.status(400);
        res.setHeader("Content-Type", "application/json");
        res.send({error: 'Only numbers'})
        res.end()
    }else if(search != undefined){
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.send({
            title:search.title, 
            author:search.author,
            price:search.price
        }) 
	    res.end();
    }else{
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.send({error: 'Not fount'})
        res.end()
    }
});

// Challenge 5 Create
app.post('/POST/books', (req, res) => {
    let title = req.query.title
    let price = req.query.price
    let author = req.query.author
    let stars = req.query.stars

	if(title != undefined && price != undefined && author != undefined && stars != undefined){
        res.status(201);
	    res.send({
            id: '80042a1a-4db3-4698-9a6d-3e3f0e120f6a',
            title: title,
            price: price,
            author: author,
            stars: stars
        });
	    res.end();
    }else{
        res.status(400);
	    res.send({
            error: 'Implement all members: title, price, author and starts'
        });
	    res.end();
    }
});


server.listen(3000, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Node Endpoints working :)');
});

module.exports = server;