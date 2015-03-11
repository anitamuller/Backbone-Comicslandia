var app = app || {}

app.GameModel = Backbone.Model.extend({

        defaults: {
            id: 0,
            name: '',
            genre: '',
            description: ''
         }

    });

