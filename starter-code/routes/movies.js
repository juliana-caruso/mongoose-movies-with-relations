const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/celebrity');

router.get('/', (req, res, next) => {
    Movie.find().populate('cast').then(movies => {
        res.render('movies/index.hbs', { movies });
    })
        .catch(err => {
            next(err);
        });
});

router.get('/new', (req, res, next) => {
    Celebrity.find().then(celebrities => {
        res.render('movies/new.hbs', { celebrities });
    })
        .catch(err => {
            next(err);
        });
});

router.post('/new', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    console.log(req.body.title);
    Movie.create({ title, genre, plot, cast })
        .then(() => {
            res.redirect('/movies');
        })
        .catch(err => {
            next(err);
        })
});

router.get('/:id/edit', (req, res, next) => {
    Movie.findById(req.params.id)
        .then(movie => {
            res.render('movies/edit', { movie });
        })
        .catch(err => {
            next(err);
        });
});


module.exports = router;