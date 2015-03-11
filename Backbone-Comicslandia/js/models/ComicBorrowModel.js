var app = app || {}

app.ComicBorrowModel = Backbone.Model.extend({

        defaults: {
            id: '',
            idComic: '',
            idUser: '',
            init_borrow: '',
            deadline_borrow: '',
         }

    });