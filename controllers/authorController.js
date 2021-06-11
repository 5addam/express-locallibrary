const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async');

// Display list of all Authors
exports.author_list = (req, res) =>{
    
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec(function(err, list_authors){
            if(err) {return next(err); }
            // Successfull, so render
            res.render('author_list', {title: 'Author List', author_list: list_authors});

        })

};

// Display detail page for a specific Author
exports.author_detail = (req, res) =>{

    async.parallel({
        author: function(callback){
            Author.findById(req.params.id)
                .exec(callback)
        },
        author_books: function(callback){
            Book.find({'author': req.params.id}, 'title summary')
                .exec(callback)
        },
    }, function(err, results){
        if(err) { return next(err); }
        if(results.author==null){//Error in API usage
            var err =  new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        //Successful, so render
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.author_books } );
    });
};

// DISPLAY Author create form on GET
exports.author_create_get = (req, res) =>{
    res.send('NOT IMPLEMENTED: Author create GET');
};

// DISPLAY Author creat on POST
exports.author_create_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET
exports.author_delete_get = (req, res) =>{
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete form on POST
exports.author_delete_post = (req, res) =>{
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
