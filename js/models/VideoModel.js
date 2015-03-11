var app = app || {}

app.VideoModel = Backbone.Model.extend({

        defaults: {
            id: 0,
            name: '',
            genre: '',
            url: '',
            description: ''
        }

    });

